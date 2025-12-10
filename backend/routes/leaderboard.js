import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * Generic leaderboard query function
 * @param {string} orderBy - Column to order by
 * @param {string} nationality - Optional nationality filter (2-letter ISO code)
 * @param {number} limit - Number of results to return
 * @param {number} userId - Optional authenticated user ID
 */
async function getLeaderboard(orderBy, nationality = null, limit = 100, userId = null) {
    const validColumns = [
        'level',
        'total_gold',
        'total_relics',
        'total_fish_caught',
        'total_casts',
        'fish_sold',
        'gold_earned',
        'relics_earned',
        'common_caught',
        'uncommon_caught',
        'fine_caught',
        'rare_caught',
        'epic_caught',
        'treasure_caught',
        'legendary_fish_count',
        'mythic_fish_count',
        'exotic_caught',
        'arcane_caught',
        'total_stats_upgraded',
        'strength',
        'intelligence',
        'luck',
        'stamina'
    ];

    if (!validColumns.includes(orderBy)) {
        throw new Error('Invalid order column');
    }

    let query = `
        SELECT
            user_id,
            profile_username,
            nationality,
            level,
            total_gold,
            total_relics,
            total_fish_caught,
            total_casts,
            fish_sold,
            gold_earned,
            relics_earned,
            common_caught,
            uncommon_caught,
            fine_caught,
            rare_caught,
            epic_caught,
            treasure_caught,
            legendary_fish_count,
            mythic_fish_count,
            exotic_caught,
            arcane_caught,
            total_stats_upgraded,
            strength,
            intelligence,
            luck,
            stamina
        FROM leaderboard_stats
    `;

    const params = [];

    if (nationality) {
        query += ' WHERE nationality = ?';
        params.push(nationality.toUpperCase());
    }

    query += ` ORDER BY ${orderBy} DESC LIMIT ?`;
    params.push(limit);

    const [leaderboard] = await db.query(query, params);

    // If userId is provided and user is not in top 100, fetch their rank
    let userRank = null;
    if (userId) {
        let rankQuery = `
            SELECT COUNT(*) + 1 as rank
            FROM leaderboard_stats
        `;

        const rankParams = [];

        if (nationality) {
            rankQuery += ' WHERE nationality = ? AND ';
            rankParams.push(nationality.toUpperCase());
        } else {
            rankQuery += ' WHERE ';
        }

        rankQuery += `${orderBy} > (
            SELECT ${orderBy}
            FROM leaderboard_stats
            WHERE user_id = ?
        )`;
        rankParams.push(userId);

        const [rankResult] = await db.query(rankQuery, rankParams);

        // Get user's stats
        const [userStats] = await db.query(
            'SELECT * FROM leaderboard_stats WHERE user_id = ?',
            [userId]
        );

        if (userStats.length > 0) {
            userRank = {
                rank: rankResult[0].rank,
                stats: userStats[0]
            };
        }
    }

    return {
        leaderboard,
        userRank
    };
}

// Get leaderboard by category with optional nationality filter
router.get('/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const nationality = req.query.nationality || null;
        const limit = parseInt(req.query.limit) || 100;

        // Map friendly category names to database columns
        const categoryMap = {
            'level': 'level',
            'fish-caught': 'total_fish_caught',
            'casts': 'total_casts',
            'fish-sold': 'fish_sold',
            'gold-owned': 'total_gold',
            'gold-earned': 'gold_earned',
            'relics-owned': 'total_relics',
            'relics-earned': 'relics_earned',
            'common': 'common_caught',
            'uncommon': 'uncommon_caught',
            'fine': 'fine_caught',
            'rare': 'rare_caught',
            'epic': 'epic_caught',
            'treasure': 'treasure_caught',
            'legendary': 'legendary_fish_count',
            'mythic': 'mythic_fish_count',
            'exotic': 'exotic_caught',
            'arcane': 'arcane_caught',
            'stats-upgraded': 'total_stats_upgraded',
            'strength': 'strength',
            'intelligence': 'intelligence',
            'luck': 'luck',
            'stamina': 'stamina'
        };

        const orderBy = categoryMap[category];
        if (!orderBy) {
            return res.status(400).json({ error: 'Invalid category' });
        }

        // Check if user is authenticated
        let userId = null;
        const authHeader = req.headers['authorization'];
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            try {
                const jwt = await import('jsonwebtoken');
                const decoded = jwt.default.verify(token, process.env.JWT_SECRET);
                userId = decoded.userId;
            } catch (error) {
                // Token invalid or expired, continue without userId
            }
        }

        const result = await getLeaderboard(orderBy, nationality, limit, userId);

        res.json(result);
    } catch (error) {
        console.error('Leaderboard error:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});

// Get player's ranks across all categories
router.get('/my-ranks', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const nationality = req.query.nationality || null;

        const categories = [
            { key: 'level', column: 'level' },
            { key: 'total_fish_caught', column: 'total_fish_caught' },
            { key: 'total_casts', column: 'total_casts' },
            { key: 'fish_sold', column: 'fish_sold' },
            { key: 'total_gold', column: 'total_gold' },
            { key: 'gold_earned', column: 'gold_earned' },
            { key: 'total_relics', column: 'total_relics' },
            { key: 'relics_earned', column: 'relics_earned' },
            { key: 'treasure_caught', column: 'treasure_caught' },
            { key: 'total_stats_upgraded', column: 'total_stats_upgraded' },
            { key: 'strength', column: 'strength' },
            { key: 'intelligence', column: 'intelligence' },
            { key: 'luck', column: 'luck' },
            { key: 'stamina', column: 'stamina' }
        ];

        const ranks = {};

        for (const category of categories) {
            let query = `
                SELECT COUNT(*) + 1 as rank
                FROM leaderboard_stats
                WHERE ${nationality ? 'nationality = ? AND' : ''} ${category.column} > (
                    SELECT ${category.column}
                    FROM leaderboard_stats
                    WHERE user_id = ?
                )
            `;

            const params = nationality ? [nationality.toUpperCase(), userId] : [userId];
            const [result] = await db.query(query, params);
            ranks[category.key] = result[0].rank;
        }

        // Get user's stats
        const [userStats] = await db.query(
            'SELECT * FROM leaderboard_stats WHERE user_id = ?',
            [userId]
        );

        res.json({
            ranks,
            stats: userStats[0] || null
        });
    } catch (error) {
        console.error('Ranks lookup error:', error);
        res.status(500).json({ error: 'Failed to fetch player ranks' });
    }
});

// Get global statistics
router.get('/stats', async (req, res) => {
    try {
        const nationality = req.query.nationality || null;

        let query = `
            SELECT
                COUNT(DISTINCT user_id) as total_players,
                MAX(level) as highest_level,
                MAX(total_gold) as most_gold,
                MAX(total_relics) as most_relics,
                SUM(total_fish_caught) as total_fish_caught,
                SUM(legendary_fish_count) as total_legendary_caught,
                SUM(mythic_fish_count) as total_mythic_caught,
                SUM(exotic_caught) as total_exotic_caught,
                SUM(arcane_caught) as total_arcane_caught
            FROM leaderboard_stats
        `;

        const params = [];
        if (nationality) {
            query += ' WHERE nationality = ?';
            params.push(nationality.toUpperCase());
        }

        const [stats] = await db.query(query, params);

        res.json(stats[0]);
    } catch (error) {
        console.error('Stats error:', error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
});

// Legacy endpoints for backward compatibility
router.get('/top-level', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 100;
        const result = await getLeaderboard('level', null, limit);
        res.json(result.leaderboard);
    } catch (error) {
        console.error('Leaderboard error:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});

router.get('/top-gold', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 100;
        const result = await getLeaderboard('total_gold', null, limit);
        res.json(result.leaderboard);
    } catch (error) {
        console.error('Leaderboard error:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});

router.get('/top-relics', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 100;
        const result = await getLeaderboard('total_relics', null, limit);
        res.json(result.leaderboard);
    } catch (error) {
        console.error('Leaderboard error:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});

router.get('/top-fish', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 100;
        const result = await getLeaderboard('total_fish_caught', null, limit);
        res.json(result.leaderboard);
    } catch (error) {
        console.error('Leaderboard error:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});

router.get('/top-legendary', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 100;
        const result = await getLeaderboard('legendary_fish_count', null, limit);
        res.json(result.leaderboard);
    } catch (error) {
        console.error('Leaderboard error:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});

export default router;
