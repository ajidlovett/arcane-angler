const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Get complete player data
router.get('/data', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;

        // Get player data
        const [playerData] = await db.query(
            'SELECT * FROM player_data WHERE user_id = ?',
            [userId]
        );

        // Get player stats
        const [playerStats] = await db.query(
            'SELECT strength, intelligence, luck, stamina FROM player_stats WHERE user_id = ?',
            [userId]
        );

        // Get inventory
        const [inventory] = await db.query(
            'SELECT fish_name, rarity, count FROM player_inventory WHERE user_id = ? AND count > 0',
            [userId]
        );

        // Get locked fish
        const [lockedFish] = await db.query(
            'SELECT fish_name FROM locked_fish WHERE user_id = ?',
            [userId]
        );

        // Get owned rods
        const [ownedRods] = await db.query(
            'SELECT rod_name FROM owned_rods WHERE user_id = ?',
            [userId]
        );

        // Get bait inventory
        const [baitInventory] = await db.query(
            'SELECT bait_name, quantity FROM bait_inventory WHERE user_id = ?',
            [userId]
        );

        // Format the response to match the game's expected structure
        const formattedInventory = inventory.map(item => ({
            name: item.fish_name,
            rarity: item.rarity,
            count: item.count
        }));

        const formattedBaitInventory = {};
        baitInventory.forEach(item => {
            formattedBaitInventory[item.bait_name] = item.quantity;
        });

        const formattedOwnedRods = ownedRods.map(r => r.rod_name);
        const formattedLockedFish = lockedFish.map(f => f.fish_name);

        // Parse achievements JSON if it exists
        let achievements = [];
        try {
            achievements = playerData[0].achievements ? JSON.parse(playerData[0].achievements) : [];
        } catch (e) {
            achievements = [];
        }

        res.json({
            level: playerData[0].level,
            xp: playerData[0].xp,
            xpToNext: playerData[0].xp_to_next,
            gold: playerData[0].gold || 0,
            relics: playerData[0].relics || 0,
            currentBiome: playerData[0].current_biome || 1,
            equippedRod: playerData[0].equipped_rod,
            equippedBait: playerData[0].equipped_bait,
            stats: playerStats[0] || { strength: 0, intelligence: 0, luck: 0, stamina: 0 },
            inventory: formattedInventory,
            lockedFish: formattedLockedFish,
            ownedRods: formattedOwnedRods,
            baitInventory: formattedBaitInventory,
            // Achievement tracking fields
            achievements: achievements,
            totalFishCaught: playerData[0].total_fish_caught || 0,
            totalFishSold: playerData[0].total_fish_sold || 0,
            totalGoldEarned: playerData[0].total_gold_earned || 0,
            mythicsCaught: playerData[0].mythics_caught || 0,
            legendariesCaught: playerData[0].legendaries_caught || 0,
            statsUpgraded: playerData[0].stats_upgraded || 0
        });
    } catch (error) {
        console.error('Get player data error:', error);
        res.status(500).json({ error: 'Failed to retrieve player data' });
    }
});

// Save/update player data
router.post('/save', authenticateToken, async (req, res) => {
    const connection = await db.getConnection();
    
    try {
        const userId = req.user.userId;
        const {
            level, xp, xpToNext, gold, relics, currentBiome,
            equippedRod, equippedBait, stats, inventory,
            lockedFish, ownedRods, baitInventory,
            achievements, totalFishCaught, totalFishSold,
            totalGoldEarned, mythicsCaught, legendariesCaught, statsUpgraded
        } = req.body;

        await connection.beginTransaction();

        // Convert achievements array to JSON string
        const achievementsJson = JSON.stringify(achievements || []);

        // Update player data
        await connection.query(
            `UPDATE player_data
             SET level = ?, xp = ?, xp_to_next = ?, gold = ?, relics = ?,
                 current_biome = ?, equipped_rod = ?, equipped_bait = ?,
                 achievements = ?, total_fish_caught = ?, total_fish_sold = ?,
                 total_gold_earned = ?, mythics_caught = ?, legendaries_caught = ?,
                 stats_upgraded = ?
             WHERE user_id = ?`,
            [level, xp, xpToNext, gold, relics, currentBiome, equippedRod, equippedBait,
             achievementsJson, totalFishCaught || 0, totalFishSold || 0,
             totalGoldEarned || 0, mythicsCaught || 0, legendariesCaught || 0,
             statsUpgraded || 0, userId]
        );

        // Update player stats
        await connection.query(
            `UPDATE player_stats 
             SET strength = ?, intelligence = ?, luck = ?, stamina = ?
             WHERE user_id = ?`,
            [stats.strength, stats.intelligence, stats.luck, stats.stamina, userId]
        );

        // Update inventory (delete and reinsert for simplicity)
        await connection.query('DELETE FROM player_inventory WHERE user_id = ?', [userId]);
        
        if (inventory && inventory.length > 0) {
            const inventoryValues = inventory.map(item => [
                userId,
                item.name,
                item.rarity,
                item.count
            ]);
            
            await connection.query(
                'INSERT INTO player_inventory (user_id, fish_name, rarity, count) VALUES ?',
                [inventoryValues]
            );
        }

        // Update locked fish
        if (lockedFish && lockedFish.length > 0) {
            for (const fishName of lockedFish) {
                await connection.query(
                    'INSERT IGNORE INTO locked_fish (user_id, fish_name) VALUES (?, ?)',
                    [userId, fishName]
                );
            }
        }

        // Update owned rods
        if (ownedRods && ownedRods.length > 0) {
            for (const rodName of ownedRods) {
                await connection.query(
                    'INSERT IGNORE INTO owned_rods (user_id, rod_name) VALUES (?, ?)',
                    [userId, rodName]
                );
            }
        }

        // Update bait inventory
        await connection.query('DELETE FROM bait_inventory WHERE user_id = ?', [userId]);
        
        if (baitInventory && Object.keys(baitInventory).length > 0) {
            const baitValues = Object.entries(baitInventory).map(([baitName, quantity]) => [
                userId,
                baitName,
                quantity
            ]);
            
            await connection.query(
                'INSERT INTO bait_inventory (user_id, bait_name, quantity) VALUES ?',
                [baitValues]
            );
        }

        // Update leaderboard stats
        const totalFishCaught = inventory.reduce((sum, item) => sum + item.count, 0);
        const legendaryCount = inventory.filter(item => item.rarity === 'Legendary').reduce((sum, item) => sum + item.count, 0);
        const mythicCount = inventory.filter(item => item.rarity === 'Mythic').reduce((sum, item) => sum + item.count, 0);

        await connection.query(
            `UPDATE leaderboard_stats 
             SET level = ?, total_gold = ?, total_relics = ?, 
                 total_fish_caught = ?, legendary_fish_count = ?, 
                 mythic_fish_count = ?, highest_biome = ?
             WHERE user_id = ?`,
            [level, gold, relics, totalFishCaught, legendaryCount, mythicCount, currentBiome, userId]
        );

        await connection.commit();
        res.json({ message: 'Player data saved successfully' });
    } catch (error) {
        await connection.rollback();
        console.error('Save player data error:', error);
        res.status(500).json({ error: 'Failed to save player data' });
    } finally {
        connection.release();
    }
});

// Quick save (for frequent updates like fishing)
router.post('/quick-save', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { level, xp, gold, relics } = req.body;

        await db.query(
            'UPDATE player_data SET level = ?, xp = ?, gold = ?, relics = ? WHERE user_id = ?',
            [level, xp, gold, relics, userId]
        );

        res.json({ message: 'Quick save successful' });
    } catch (error) {
        console.error('Quick save error:', error);
        res.status(500).json({ error: 'Quick save failed' });
    }
});

module.exports = router;
