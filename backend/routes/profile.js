const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');
const { validateText } = require('../server/utils/profanityFilter');
const router = express.Router();

// ==========================================
// PROFILE MANAGEMENT
// ==========================================

// Get user's own profile data
router.get('/me', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;

        const [users] = await db.query(
            `SELECT id, username, profile_username, email, bio, equipped_title, nationality,
             profile_name_changes, achievement_showcase_limit, favorite_fish_limit,
             profile_privacy, allow_comments, profile_views, badges, registration_date
             FROM users WHERE id = ?`,
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = users[0];

        // Parse JSON fields
        user.badges = user.badges ? JSON.parse(user.badges) : [];

        res.json({ profile: user });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// Get another user's profile (with privacy checks)
router.get('/:userId', authenticateToken, async (req, res) => {
    try {
        const viewerId = req.user.userId;
        const profileUserId = parseInt(req.params.userId);

        // Get profile user
        const [users] = await db.query(
            `SELECT id, username, profile_username, bio, equipped_title,
             profile_privacy, allow_comments, profile_views, badges, registration_date
             FROM users WHERE id = ?`,
            [profileUserId]
        );

        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const profileUser = users[0];

        // Check privacy settings
        if (profileUser.profile_privacy === 'private' && viewerId !== profileUserId) {
            return res.status(403).json({ error: 'This profile is private' });
        }

        if (profileUser.profile_privacy === 'friends') {
            // Check if viewer is friends with profile owner
            const [friendship] = await db.query(
                `SELECT * FROM friends
                 WHERE ((user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?))
                 AND status = 'accepted'`,
                [viewerId, profileUserId, profileUserId, viewerId]
            );

            if (friendship.length === 0 && viewerId !== profileUserId) {
                return res.status(403).json({ error: 'This profile is friends-only' });
            }
        }

        // Increment view count (only if not viewing own profile)
        if (viewerId !== profileUserId) {
            await db.query(
                'UPDATE users SET profile_views = profile_views + 1 WHERE id = ?',
                [profileUserId]
            );

            // Log the view
            await db.query(
                'INSERT INTO profile_views_log (profile_user_id, viewer_id) VALUES (?, ?)',
                [profileUserId, viewerId]
            );
        }

        // Get player data for stats
        const [playerData] = await db.query(
            'SELECT * FROM player_data WHERE user_id = ?',
            [profileUserId]
        );

        // Get player stats
        const [playerStats] = await db.query(
            'SELECT strength, intelligence, luck, stamina FROM player_stats WHERE user_id = ?',
            [profileUserId]
        );

        // Parse JSON fields
        profileUser.badges = profileUser.badges ? JSON.parse(profileUser.badges) : [];

        res.json({
            profile: profileUser,
            playerData: playerData[0] || null,
            playerStats: playerStats[0] || null
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// Change profile name
router.post('/change-name', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { newProfileName } = req.body;

        if (!newProfileName || newProfileName.trim().length === 0) {
            return res.status(400).json({ error: 'Profile name cannot be empty' });
        }

        // Validate text
        const validation = validateText(newProfileName, 50);
        if (!validation.valid) {
            return res.status(400).json({ error: validation.error });
        }

        // Get user's current data - check if column exists first
        let changeCount = 0;
        try {
            const [users] = await db.query(
                'SELECT profile_name_changes FROM users WHERE id = ?',
                [userId]
            );
            changeCount = users.length > 0 ? (users[0].profile_name_changes || 0) : 0;
        } catch (dbError) {
            console.warn('profile_name_changes column may not exist, defaulting to 0:', dbError.message);
            changeCount = 0;
        }

        const cost = changeCount === 0 ? 0 : 50; // First change free, then 50 relics

        // Check if user has enough relics
        if (cost > 0) {
            const [playerData] = await db.query(
                'SELECT relics FROM player_data WHERE user_id = ?',
                [userId]
            );

            if (playerData.length === 0 || playerData[0].relics < cost) {
                return res.status(400).json({ error: 'Not enough relics' });
            }

            // Deduct relics
            await db.query(
                'UPDATE player_data SET relics = relics - ? WHERE user_id = ?',
                [cost, userId]
            );
        }

        // Update profile name and increment counter if column exists
        try {
            await db.query(
                'UPDATE users SET profile_username = ?, profile_name_changes = profile_name_changes + 1 WHERE id = ?',
                [validation.cleaned, userId]
            );
        } catch (dbError) {
            // If profile_name_changes column doesn't exist, just update the name
            console.warn('Could not update profile_name_changes, updating name only:', dbError.message);
            await db.query(
                'UPDATE users SET profile_username = ? WHERE id = ?',
                [validation.cleaned, userId]
            );
        }

        res.json({
            success: true,
            newProfileName: validation.cleaned,
            relicsSpent: cost
        });
    } catch (error) {
        console.error('Error changing profile name:', error);
        console.error('Error details:', error.message, error.stack);
        res.status(500).json({ error: `Failed to change profile name: ${error.message}` });
    }
});

// Update bio
router.post('/update-bio', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { bio } = req.body;

        if (!bio) {
            return res.status(400).json({ error: 'Bio is required' });
        }

        // Validate text
        const validation = validateText(bio, 500);
        if (!validation.valid) {
            return res.status(400).json({ error: validation.error });
        }

        await db.query(
            'UPDATE users SET bio = ? WHERE id = ?',
            [validation.cleaned, userId]
        );

        res.json({ success: true, bio: validation.cleaned });
    } catch (error) {
        console.error('Error updating bio:', error);
        res.status(500).json({ error: 'Failed to update bio' });
    }
});

// Update nationality
router.post('/update-nationality', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { nationality } = req.body;

        // Validate nationality code (should be 2-letter ISO code or null)
        if (nationality && (typeof nationality !== 'string' || nationality.length !== 2)) {
            return res.status(400).json({ error: 'Invalid nationality code. Must be 2-letter ISO code.' });
        }

        await db.query(
            'UPDATE users SET nationality = ? WHERE id = ?',
            [nationality ? nationality.toUpperCase() : null, userId]
        );

        res.json({ success: true, nationality: nationality ? nationality.toUpperCase() : null });
    } catch (error) {
        console.error('Error updating nationality:', error);
        res.status(500).json({ error: 'Failed to update nationality' });
    }
});

// Equip achievement title
router.post('/equip-title', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { achievementId } = req.body;

        // Verify user has this achievement
        const [playerData] = await db.query(
            'SELECT achievements FROM player_data WHERE user_id = ?',
            [userId]
        );

        if (playerData.length === 0) {
            return res.status(404).json({ error: 'Player data not found' });
        }

        // Handle achievements as either string or JSON array
        let achievements = [];
        if (playerData[0].achievements) {
            try {
                // Try to parse as JSON first
                achievements = JSON.parse(playerData[0].achievements);
            } catch (e) {
                // If it's not JSON, it might be a comma-separated string or single value
                const achString = playerData[0].achievements.toString();
                if (achString.includes(',')) {
                    achievements = achString.split(',').map(s => s.trim());
                } else if (achString.trim()) {
                    achievements = [achString.trim()];
                }
            }
        }

        if (achievementId !== null && !achievements.includes(achievementId)) {
            return res.status(400).json({ error: 'Achievement not unlocked' });
        }

        // Update equipped title - handle if column doesn't exist
        try {
            await db.query(
                'UPDATE users SET equipped_title = ? WHERE id = ?',
                [achievementId, userId]
            );
        } catch (dbError) {
            console.error('Could not update equipped_title column:', dbError.message);
            return res.status(500).json({
                error: 'Database column "equipped_title" does not exist. Please run the migration SQL first.'
            });
        }

        res.json({ success: true, equippedTitle: achievementId });
    } catch (error) {
        console.error('Error equipping title:', error);
        console.error('Error details:', error.message, error.stack);
        res.status(500).json({ error: `Failed to equip title: ${error.message}` });
    }
});

// Update privacy settings
router.post('/privacy', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { privacy, allowComments } = req.body;

        const validPrivacy = ['public', 'friends', 'private'];
        if (privacy && !validPrivacy.includes(privacy)) {
            return res.status(400).json({ error: 'Invalid privacy setting' });
        }

        const updates = [];
        const values = [];

        if (privacy) {
            updates.push('profile_privacy = ?');
            values.push(privacy);
        }

        if (allowComments !== undefined) {
            updates.push('allow_comments = ?');
            values.push(allowComments ? 1 : 0);
        }

        if (updates.length === 0) {
            return res.status(400).json({ error: 'No updates provided' });
        }

        values.push(userId);

        await db.query(
            `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
            values
        );

        res.json({ success: true });
    } catch (error) {
        console.error('Error updating privacy:', error);
        res.status(500).json({ error: 'Failed to update privacy settings' });
    }
});

// ==========================================
// ACHIEVEMENT SHOWCASE
// ==========================================

// Get showcased achievements
router.get('/:userId/showcase', authenticateToken, async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);

        const [showcase] = await db.query(
            'SELECT achievement_id, display_order FROM achievement_showcase WHERE user_id = ? ORDER BY display_order',
            [userId]
        );

        res.json({ showcase });
    } catch (error) {
        console.error('Error fetching showcase:', error);
        res.status(500).json({ error: 'Failed to fetch showcase' });
    }
});

// Update achievement showcase
router.post('/showcase', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { achievementIds } = req.body; // Array of achievement IDs in order

        if (!Array.isArray(achievementIds)) {
            return res.status(400).json({ error: 'Achievement IDs must be an array' });
        }

        // Get user's showcase limit
        const [users] = await db.query(
            'SELECT achievement_showcase_limit FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const limit = users[0].achievement_showcase_limit;

        if (achievementIds.length > limit) {
            return res.status(400).json({ error: `Cannot showcase more than ${limit} achievements` });
        }

        // Verify user has all these achievements
        const [playerData] = await db.query(
            'SELECT achievements FROM player_data WHERE user_id = ?',
            [userId]
        );

        const unlockedAchievements = playerData[0].achievements ? JSON.parse(playerData[0].achievements) : [];

        for (const achId of achievementIds) {
            if (!unlockedAchievements.includes(achId)) {
                return res.status(400).json({ error: `Achievement ${achId} not unlocked` });
            }
        }

        // Delete old showcase
        await db.query('DELETE FROM achievement_showcase WHERE user_id = ?', [userId]);

        // Insert new showcase
        if (achievementIds.length > 0) {
            const values = achievementIds.map((achId, index) => [userId, achId, index + 1]);
            await db.query(
                'INSERT INTO achievement_showcase (user_id, achievement_id, display_order) VALUES ?',
                [values]
            );
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Error updating showcase:', error);
        res.status(500).json({ error: 'Failed to update showcase' });
    }
});

// ==========================================
// FAVORITE FISH
// ==========================================

// Get favorite fish
router.get('/:userId/favorite-fish', authenticateToken, async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);

        const [favoriteFish] = await db.query(
            'SELECT fish_name, fish_rarity, display_order FROM favorite_fish WHERE user_id = ? ORDER BY display_order',
            [userId]
        );

        res.json({ favoriteFish });
    } catch (error) {
        console.error('Error fetching favorite fish:', error);
        res.status(500).json({ error: 'Failed to fetch favorite fish' });
    }
});

// Update favorite fish
router.post('/favorite-fish', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { fishList } = req.body; // Array of { name, rarity } in order

        if (!Array.isArray(fishList)) {
            return res.status(400).json({ error: 'Fish list must be an array' });
        }

        // Get user's favorite fish limit
        const [users] = await db.query(
            'SELECT favorite_fish_limit FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const limit = users[0].favorite_fish_limit;

        if (fishList.length > limit) {
            return res.status(400).json({ error: `Cannot favorite more than ${limit} fish` });
        }

        // Delete old favorites
        await db.query('DELETE FROM favorite_fish WHERE user_id = ?', [userId]);

        // Insert new favorites
        if (fishList.length > 0) {
            const values = fishList.map((fish, index) => [userId, fish.name, fish.rarity, index + 1]);
            await db.query(
                'INSERT INTO favorite_fish (user_id, fish_name, fish_rarity, display_order) VALUES ?',
                [values]
            );
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Error updating favorite fish:', error);
        res.status(500).json({ error: 'Failed to update favorite fish' });
    }
});

module.exports = router;
