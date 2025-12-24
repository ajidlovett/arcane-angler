import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateText } from '../utils/profanityFilter.js';

const router = express.Router();

// ==========================================
// PROFILE MANAGEMENT
// ==========================================

// Get user's own profile data
router.get('/me', authenticateToken, async (req, res) => {
    try {
        const userId = req.userId;

        const [users] = await db.query(
            `SELECT id, username, profile_username, email, bio, equipped_title, nationality,
             profile_name_changes, achievement_showcase_limit, favorite_fish_limit,
             profile_privacy, allow_comments, profile_views, badges, registration_date,
             owned_avatars, profile_avatar, fish_showcase, achievement_showcase
             FROM users WHERE id = ?`,
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = users[0];

        // Parse JSON fields - handle both MySQL auto-parsed and string formats
        if (user.badges) {
            if (Array.isArray(user.badges)) {
                // Already parsed by MySQL
                user.badges = user.badges;
            } else if (typeof user.badges === 'string') {
                try {
                    user.badges = JSON.parse(user.badges);
                } catch (e) {
                    console.error('Failed to parse badges:', e);
                    user.badges = [];
                }
            }
        } else {
            user.badges = [];
        }

        if (user.owned_avatars) {
            if (Array.isArray(user.owned_avatars)) {
                // Already parsed by MySQL
                user.owned_avatars = user.owned_avatars;
            } else if (typeof user.owned_avatars === 'string') {
                try {
                    user.owned_avatars = JSON.parse(user.owned_avatars);
                } catch (e) {
                    console.error('Failed to parse owned_avatars:', e);
                    user.owned_avatars = ['avatar_001', 'avatar_002'];
                }
            }
        } else {
            user.owned_avatars = ['avatar_001', 'avatar_002'];
        }

        if (user.fish_showcase) {
            if (Array.isArray(user.fish_showcase)) {
                // Already parsed by MySQL - filter out invalid entries
                user.fish_showcase = user.fish_showcase.filter(f =>
                    f && typeof f === 'object' && f.name && f.rarity
                );
            } else if (typeof user.fish_showcase === 'string') {
                try {
                    const parsed = JSON.parse(user.fish_showcase);
                    // Filter out invalid entries
                    user.fish_showcase = Array.isArray(parsed)
                        ? parsed.filter(f => f && typeof f === 'object' && f.name && f.rarity)
                        : [];
                } catch (e) {
                    console.error('Failed to parse fish_showcase:', e);
                    user.fish_showcase = [];
                }
            }
        } else {
            user.fish_showcase = [];
        }

        if (user.achievement_showcase) {
            if (Array.isArray(user.achievement_showcase)) {
                // Already parsed by MySQL
                user.achievement_showcase = user.achievement_showcase;
            } else if (typeof user.achievement_showcase === 'string') {
                try {
                    user.achievement_showcase = JSON.parse(user.achievement_showcase);
                } catch (e) {
                    console.error('Failed to parse achievement_showcase:', e);
                    user.achievement_showcase = [];
                }
            }
        } else {
            user.achievement_showcase = [];
        }

        res.json({ profile: user });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// Get another user's profile (with privacy checks)
router.get('/:userId', authenticateToken, async (req, res) => {
    try {
        const viewerId = req.userId;
        const profileUserId = parseInt(req.params.userId);

        // Get profile user
        const [users] = await db.query(
            `SELECT id, username, profile_username, bio, equipped_title, nationality,
             profile_privacy, allow_comments, profile_views, badges, registration_date,
             profile_avatar, fish_showcase, achievement_showcase
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

            // Log the view (only if table exists)
            try {
                await db.query(
                    'INSERT INTO profile_views_log (profile_user_id, viewer_id) VALUES (?, ?)',
                    [profileUserId, viewerId]
                );
            } catch (logError) {
                console.warn('Profile views log table may not exist:', logError.message);
            }
        }

        // Get player data for stats
        const [playerData] = await db.query(
            'SELECT level, xp, gold, relics, current_biome FROM player_data WHERE user_id = ?',
            [profileUserId]
        );

        // Get player stats
        const [playerStats] = await db.query(
            'SELECT strength, intelligence, luck, stamina FROM player_stats WHERE user_id = ?',
            [profileUserId]
        );

        // Get leaderboard stats
        const [leaderboardStats] = await db.query(
            `SELECT gold_earned, relics_earned, total_fish_caught, fish_sold,
             common_caught, uncommon_caught, fine_caught, rare_caught, epic_caught,
             legendary_fish_count, mythic_fish_count, exotic_caught, arcane_caught,
             treasure_caught
             FROM leaderboard_stats WHERE user_id = ?`,
            [profileUserId]
        );

        // Parse JSON fields - handle both MySQL auto-parsed and string formats
        if (profileUser.badges) {
            if (Array.isArray(profileUser.badges)) {
                // Already parsed by MySQL
                profileUser.badges = profileUser.badges;
            } else if (typeof profileUser.badges === 'string') {
                try {
                    profileUser.badges = JSON.parse(profileUser.badges);
                } catch (e) {
                    console.error('Failed to parse badges:', e);
                    profileUser.badges = [];
                }
            }
        } else {
            profileUser.badges = [];
        }

        if (profileUser.fish_showcase) {
            if (Array.isArray(profileUser.fish_showcase)) {
                // Already parsed by MySQL - filter out invalid entries
                profileUser.fish_showcase = profileUser.fish_showcase.filter(f =>
                    f && typeof f === 'object' && f.name && f.rarity
                );
            } else if (typeof profileUser.fish_showcase === 'string') {
                try {
                    const parsed = JSON.parse(profileUser.fish_showcase);
                    // Filter out invalid entries
                    profileUser.fish_showcase = Array.isArray(parsed)
                        ? parsed.filter(f => f && typeof f === 'object' && f.name && f.rarity)
                        : [];
                } catch (e) {
                    console.error('Failed to parse fish_showcase:', e);
                    profileUser.fish_showcase = [];
                }
            }
        } else {
            profileUser.fish_showcase = [];
        }

        if (profileUser.achievement_showcase) {
            if (Array.isArray(profileUser.achievement_showcase)) {
                // Already parsed by MySQL
                profileUser.achievement_showcase = profileUser.achievement_showcase;
            } else if (typeof profileUser.achievement_showcase === 'string') {
                try {
                    profileUser.achievement_showcase = JSON.parse(profileUser.achievement_showcase);
                } catch (e) {
                    console.error('Failed to parse achievement_showcase:', e);
                    profileUser.achievement_showcase = [];
                }
            }
        } else {
            profileUser.achievement_showcase = [];
        }

        res.json({
            profile: profileUser,
            playerData: playerData[0] || null,
            playerStats: playerStats[0] || null,
            leaderboardStats: leaderboardStats[0] || null
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// Change profile name
router.post('/change-name', authenticateToken, async (req, res) => {
    try {
        const userId = req.userId;
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

        // Also update leaderboard_stats table to reflect the new profile_username
        try {
            await db.query(
                'UPDATE leaderboard_stats SET profile_username = ? WHERE user_id = ?',
                [validation.cleaned, userId]
            );
        } catch (dbError) {
            console.warn('Could not update leaderboard_stats profile_username:', dbError.message);
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
        const userId = req.userId;
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
        const userId = req.userId;
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
        const userId = req.userId;
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
            const rawAchievements = playerData[0].achievements;

            // If it's already an array (from JSON column type)
            if (Array.isArray(rawAchievements)) {
                achievements = rawAchievements;
            } else if (typeof rawAchievements === 'string') {
                // Try to parse as JSON string
                try {
                    const parsed = JSON.parse(rawAchievements);
                    achievements = Array.isArray(parsed) ? parsed : [];
                } catch (e) {
                    // If not JSON, try comma-separated or single value
                    const achString = rawAchievements.toString().trim();
                    if (achString.includes(',')) {
                        achievements = achString.split(',').map(s => s.trim()).filter(s => s);
                    } else if (achString) {
                        achievements = [achString];
                    }
                }
            }
        }

        // Debug log to help troubleshoot
        console.log('Equip title debug:', {
            userId,
            achievementId,
            rawAchievements: playerData[0].achievements,
            parsedAchievements: achievements,
            isIncluded: achievements.includes(achievementId)
        });

        if (achievementId !== null && !achievements.includes(achievementId)) {
            return res.status(400).json({
                error: 'Achievement not unlocked',
                debug: {
                    availableAchievements: achievements,
                    requestedAchievement: achievementId
                }
            });
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
        const userId = req.userId;
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
// AVATAR MANAGEMENT
// ==========================================

// Get owned avatars
router.get('/avatars/owned', authenticateToken, async (req, res) => {
    try {
        const userId = req.userId;

        const [users] = await db.query(
            'SELECT owned_avatars, profile_avatar FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // MySQL JSON columns are auto-parsed by mysql2, so handle both parsed and string formats
        let ownedAvatars = ['avatar_001', 'avatar_002'];
        if (users[0].owned_avatars) {
            if (Array.isArray(users[0].owned_avatars)) {
                ownedAvatars = users[0].owned_avatars;
            } else if (typeof users[0].owned_avatars === 'string') {
                try {
                    ownedAvatars = JSON.parse(users[0].owned_avatars);
                } catch (e) {
                    console.error('Failed to parse owned_avatars:', e);
                }
            }
        }

        const currentAvatar = users[0].profile_avatar || 'avatar_001';

        res.json({
            ownedAvatars,
            currentAvatar
        });
    } catch (error) {
        console.error('Error fetching avatars:', error);
        res.status(500).json({ error: 'Failed to fetch avatars' });
    }
});

// Select avatar (must be owned)
router.post('/avatars/select', authenticateToken, async (req, res) => {
    try {
        const userId = req.userId;
        const { avatarId } = req.body;

        if (!avatarId || typeof avatarId !== 'string') {
            return res.status(400).json({ error: 'Invalid avatar ID' });
        }

        // Get owned avatars
        const [users] = await db.query(
            'SELECT owned_avatars FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // MySQL JSON columns are auto-parsed by mysql2
        let ownedAvatars = ['avatar_001', 'avatar_002'];
        if (users[0].owned_avatars) {
            if (Array.isArray(users[0].owned_avatars)) {
                ownedAvatars = users[0].owned_avatars;
            } else if (typeof users[0].owned_avatars === 'string') {
                try {
                    ownedAvatars = JSON.parse(users[0].owned_avatars);
                } catch (e) {
                    console.error('Failed to parse owned_avatars:', e);
                }
            }
        }

        // Verify user owns this avatar
        if (!ownedAvatars.includes(avatarId)) {
            return res.status(400).json({ error: 'Avatar not owned' });
        }

        // Update selected avatar
        await db.query(
            'UPDATE users SET profile_avatar = ? WHERE id = ?',
            [avatarId, userId]
        );

        res.json({ success: true, selectedAvatar: avatarId });
    } catch (error) {
        console.error('Error selecting avatar:', error);
        res.status(500).json({ error: 'Failed to select avatar' });
    }
});

// Unlock avatar (e.g., through achievements or purchases)
router.post('/avatars/unlock', authenticateToken, async (req, res) => {
    try {
        const userId = req.userId;
        const { avatarId, cost } = req.body;

        if (!avatarId || typeof avatarId !== 'string') {
            return res.status(400).json({ error: 'Invalid avatar ID' });
        }

        // Get owned avatars
        const [users] = await db.query(
            'SELECT owned_avatars FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // MySQL JSON columns are auto-parsed by mysql2
        let ownedAvatars = ['avatar_001', 'avatar_002'];
        if (users[0].owned_avatars) {
            if (Array.isArray(users[0].owned_avatars)) {
                ownedAvatars = users[0].owned_avatars;
            } else if (typeof users[0].owned_avatars === 'string') {
                try {
                    ownedAvatars = JSON.parse(users[0].owned_avatars);
                } catch (e) {
                    console.error('Failed to parse owned_avatars:', e);
                    ownedAvatars = ['avatar_001', 'avatar_002'];
                }
            }
        }

        // Check if already owned
        if (ownedAvatars.includes(avatarId)) {
            return res.status(400).json({ error: 'Avatar already owned' });
        }

        // If there's a cost, deduct relics
        if (cost && cost > 0) {
            const [playerData] = await db.query(
                'SELECT relics FROM player_data WHERE user_id = ?',
                [userId]
            );

            if (playerData.length === 0 || playerData[0].relics < cost) {
                return res.status(400).json({ error: 'Not enough relics' });
            }

            await db.query(
                'UPDATE player_data SET relics = relics - ? WHERE user_id = ?',
                [cost, userId]
            );
        }

        // Add avatar to owned list
        ownedAvatars.push(avatarId);
        await db.query(
            'UPDATE users SET owned_avatars = ? WHERE id = ?',
            [JSON.stringify(ownedAvatars), userId]
        );

        res.json({
            success: true,
            unlockedAvatar: avatarId,
            ownedAvatars
        });
    } catch (error) {
        console.error('Error unlocking avatar:', error);
        res.status(500).json({ error: 'Failed to unlock avatar' });
    }
});

// ==========================================
// ACHIEVEMENT SHOWCASE
// ==========================================

// Get showcased achievements
router.get('/:userId/showcase/achievements', authenticateToken, async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);

        const [users] = await db.query(
            'SELECT achievement_showcase FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Parse JSON field - handle both MySQL auto-parsed and string formats
        let showcase = [];
        if (users[0].achievement_showcase) {
            if (Array.isArray(users[0].achievement_showcase)) {
                showcase = users[0].achievement_showcase;
            } else if (typeof users[0].achievement_showcase === 'string') {
                try {
                    showcase = JSON.parse(users[0].achievement_showcase);
                } catch (e) {
                    console.error('Failed to parse achievement_showcase:', e);
                    showcase = [];
                }
            }
        }

        res.json({ showcase });
    } catch (error) {
        console.error('Error fetching achievement showcase:', error);
        res.status(500).json({ error: 'Failed to fetch achievement showcase' });
    }
});

// Update achievement showcase
router.post('/showcase/achievements', authenticateToken, async (req, res) => {
    try {
        const userId = req.userId;
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

        if (playerData.length === 0) {
            return res.status(404).json({ error: 'Player data not found' });
        }

        // Parse JSON field - handle both MySQL auto-parsed and string formats
        let unlockedAchievements = [];
        if (playerData[0].achievements) {
            if (Array.isArray(playerData[0].achievements)) {
                unlockedAchievements = playerData[0].achievements;
            } else if (typeof playerData[0].achievements === 'string') {
                try {
                    unlockedAchievements = JSON.parse(playerData[0].achievements);
                } catch (e) {
                    console.error('Failed to parse achievements:', e);
                    unlockedAchievements = [];
                }
            }
        }

        for (const achId of achievementIds) {
            if (!unlockedAchievements.includes(achId)) {
                return res.status(400).json({ error: `Achievement ${achId} not unlocked` });
            }
        }

        // Update achievement showcase
        await db.query(
            'UPDATE users SET achievement_showcase = ? WHERE id = ?',
            [JSON.stringify(achievementIds), userId]
        );

        res.json({ success: true, showcase: achievementIds });
    } catch (error) {
        console.error('Error updating achievement showcase:', error);
        res.status(500).json({ error: 'Failed to update achievement showcase' });
    }
});

// ==========================================
// FISH SHOWCASE
// ==========================================

// Get showcased fish
router.get('/:userId/showcase/fish', authenticateToken, async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);

        const [users] = await db.query(
            'SELECT fish_showcase FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Parse JSON field - handle both MySQL auto-parsed and string formats
        let showcase = [];
        if (users[0].fish_showcase) {
            if (Array.isArray(users[0].fish_showcase)) {
                // Filter out invalid entries
                showcase = users[0].fish_showcase.filter(f =>
                    f && typeof f === 'object' && f.name && f.rarity
                );
            } else if (typeof users[0].fish_showcase === 'string') {
                try {
                    const parsed = JSON.parse(users[0].fish_showcase);
                    // Filter out invalid entries
                    showcase = Array.isArray(parsed)
                        ? parsed.filter(f => f && typeof f === 'object' && f.name && f.rarity)
                        : [];
                } catch (e) {
                    console.error('Failed to parse fish_showcase:', e);
                    showcase = [];
                }
            }
        }

        res.json({ showcase });
    } catch (error) {
        console.error('Error fetching fish showcase:', error);
        res.status(500).json({ error: 'Failed to fetch fish showcase' });
    }
});

// Update fish showcase
router.post('/showcase/fish', authenticateToken, async (req, res) => {
    try {
        const userId = req.userId;
        const { fishList } = req.body; // Array of { name, rarity } objects

        if (!Array.isArray(fishList)) {
            return res.status(400).json({ error: 'Fish list must be an array' });
        }

        // Get user's fish showcase limit
        const [users] = await db.query(
            'SELECT favorite_fish_limit FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const limit = users[0].favorite_fish_limit;

        if (fishList.length > limit) {
            return res.status(400).json({ error: `Cannot showcase more than ${limit} fish` });
        }

        // Verify user has caught/locked all these fish
        for (const fish of fishList) {
            if (!fish.name || !fish.rarity) {
                return res.status(400).json({ error: 'Each fish must have name and rarity' });
            }

            const [lockedFish] = await db.query(
                'SELECT * FROM locked_fish WHERE user_id = ? AND fish_name = ?',
                [userId, fish.name]
            );

            if (lockedFish.length === 0) {
                return res.status(400).json({ error: `Fish "${fish.name}" has not been caught yet` });
            }
        }

        // Update fish showcase
        await db.query(
            'UPDATE users SET fish_showcase = ? WHERE id = ?',
            [JSON.stringify(fishList), userId]
        );

        res.json({ success: true, showcase: fishList });
    } catch (error) {
        console.error('Error updating fish showcase:', error);
        res.status(500).json({ error: 'Failed to update fish showcase' });
    }
});

export default router;
