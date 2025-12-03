const express = require('express');
const db = require('../db');
const router = express.Router();

// Get top players by level
router.get('/top-level', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 100;
        
        const [leaderboard] = await db.query(
            `SELECT username, level, total_gold, total_relics, total_fish_caught
             FROM leaderboard_stats
             ORDER BY level DESC, total_gold DESC
             LIMIT ?`,
            [limit]
        );

        res.json(leaderboard);
    } catch (error) {
        console.error('Leaderboard error:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});

// Get top players by gold
router.get('/top-gold', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 100;
        
        const [leaderboard] = await db.query(
            `SELECT username, level, total_gold, total_relics
             FROM leaderboard_stats
             ORDER BY total_gold DESC
             LIMIT ?`,
            [limit]
        );

        res.json(leaderboard);
    } catch (error) {
        console.error('Leaderboard error:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});

// Get top players by relics
router.get('/top-relics', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 100;
        
        const [leaderboard] = await db.query(
            `SELECT username, level, total_relics, total_gold
             FROM leaderboard_stats
             ORDER BY total_relics DESC
             LIMIT ?`,
            [limit]
        );

        res.json(leaderboard);
    } catch (error) {
        console.error('Leaderboard error:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});

// Get top players by fish caught
router.get('/top-fish', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 100;
        
        const [leaderboard] = await db.query(
            `SELECT username, level, total_fish_caught, legendary_fish_count, mythic_fish_count
             FROM leaderboard_stats
             ORDER BY total_fish_caught DESC
             LIMIT ?`,
            [limit]
        );

        res.json(leaderboard);
    } catch (error) {
        console.error('Leaderboard error:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});

// Get top players by legendary fish
router.get('/top-legendary', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 100;
        
        const [leaderboard] = await db.query(
            `SELECT username, level, legendary_fish_count, mythic_fish_count, total_fish_caught
             FROM leaderboard_stats
             ORDER BY legendary_fish_count DESC, mythic_fish_count DESC
             LIMIT ?`,
            [limit]
        );

        res.json(leaderboard);
    } catch (error) {
        console.error('Leaderboard error:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});

// Get player rank
router.get('/rank/:username', async (req, res) => {
    try {
        const { username } = req.params;
        
        // Get player stats
        const [playerStats] = await db.query(
            'SELECT * FROM leaderboard_stats WHERE username = ?',
            [username]
        );

        if (playerStats.length === 0) {
            return res.status(404).json({ error: 'Player not found' });
        }

        const player = playerStats[0];

        // Get level rank
        const [levelRank] = await db.query(
            `SELECT COUNT(*) + 1 as rank 
             FROM leaderboard_stats 
             WHERE level > ? OR (level = ? AND total_gold > ?)`,
            [player.level, player.level, player.total_gold]
        );

        // Get gold rank
        const [goldRank] = await db.query(
            'SELECT COUNT(*) + 1 as rank FROM leaderboard_stats WHERE total_gold > ?',
            [player.total_gold]
        );

        // Get relics rank
        const [relicsRank] = await db.query(
            'SELECT COUNT(*) + 1 as rank FROM leaderboard_stats WHERE total_relics > ?',
            [player.total_relics]
        );

        // Get fish rank
        const [fishRank] = await db.query(
            'SELECT COUNT(*) + 1 as rank FROM leaderboard_stats WHERE total_fish_caught > ?',
            [player.total_fish_caught]
        );

        res.json({
            player: player,
            ranks: {
                level: levelRank[0].rank,
                gold: goldRank[0].rank,
                relics: relicsRank[0].rank,
                fish: fishRank[0].rank
            }
        });
    } catch (error) {
        console.error('Rank lookup error:', error);
        res.status(500).json({ error: 'Failed to fetch player rank' });
    }
});

// Get global statistics
router.get('/stats', async (req, res) => {
    try {
        const [stats] = await db.query(`
            SELECT 
                COUNT(DISTINCT user_id) as total_players,
                MAX(level) as highest_level,
                MAX(total_gold) as most_gold,
                MAX(total_relics) as most_relics,
                SUM(total_fish_caught) as total_fish_caught,
                SUM(legendary_fish_count) as total_legendary_caught,
                SUM(mythic_fish_count) as total_mythic_caught
            FROM leaderboard_stats
        `);

        res.json(stats[0]);
    } catch (error) {
        console.error('Stats error:', error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
});

module.exports = router;
