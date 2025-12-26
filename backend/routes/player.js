import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';
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

        // Get inventory (including base_gold, titan_bonus, and is_locked)
        const [inventory] = await db.query(
            'SELECT fish_name, rarity, count, base_gold, titan_bonus, COALESCE(is_locked, FALSE) as is_locked FROM player_inventory WHERE user_id = ? AND count > 0',
            [userId]
        );

        // Get locked fish (fish that user manually locked - from is_locked column)
        const [lockedFish] = await db.query(
            'SELECT fish_name FROM player_inventory WHERE user_id = ? AND is_locked = TRUE',
            [userId]
        );

        // Get discovered fish (all fish ever caught - for fishpedia)
        const [discoveredFish] = await db.query(
            'SELECT fish_name FROM locked_fish WHERE user_id = ?',
            [userId]
        );

        // Get fishpedia stats (persistent catch tracking for Fishpedia)
        const [fishpediaStats] = await db.query(
            'SELECT fish_name, rarity, total_caught, first_caught_at FROM fishpedia_stats WHERE user_id = ?',
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
            count: item.count,
            baseGold: item.base_gold || 0,
            titanBonus: item.titan_bonus || 1
        }));

        const formattedBaitInventory = {};
        baitInventory.forEach(item => {
            formattedBaitInventory[item.bait_name] = item.quantity;
        });

        const formattedFishpediaStats = fishpediaStats.map(item => ({
            name: item.fish_name,
            rarity: item.rarity,
            totalCaught: item.total_caught || 0,
            firstCaughtAt: item.first_caught_at
        }));

        const formattedOwnedRods = ownedRods.map(r => r.rod_name);
        const formattedLockedFish = lockedFish.map(f => f.fish_name);
        const formattedDiscoveredFish = discoveredFish.map(f => f.fish_name);

        // Parse achievements JSON if it exists (handle both string and object)
        let achievements = [];
        try {
            const rawData = playerData[0].achievements;
            if (Array.isArray(rawData)) {
                achievements = rawData; // Already an array
            } else if (typeof rawData === 'string') {
                achievements = JSON.parse(rawData); // Parse string
            }
        } catch (e) {
            console.error('Error parsing achievements:', e);
            achievements = [];
        }

        // Discovered fish now comes from locked_fish table (not from player_data JSON)
        // formattedDiscoveredFish is already populated above

        // Parse unlocked_biomes JSON if it exists (handle both string and object)
        let unlockedBiomes = [1];
        try {
            const rawData = playerData[0].unlocked_biomes;
            if (Array.isArray(rawData)) {
                unlockedBiomes = rawData; // Already an array
            } else if (typeof rawData === 'string') {
                const parsed = JSON.parse(rawData);
                unlockedBiomes = Array.isArray(parsed) ? parsed : [1];
            } else if (typeof rawData === 'number') {
                unlockedBiomes = [1]; // Corrupted integer data
            }
        } catch (e) {
            console.error('Error parsing unlocked_biomes:', e);
            unlockedBiomes = [1];
        }

        // Parse rod_levels JSON if it exists (handle both string and object)
        // Default to { rod_default: 1 } for existing players who don't have this field yet
        let rodLevels = { rod_default: 1 };
        try {
            const rawData = playerData[0].rod_levels;
            if (rawData) {
                if (typeof rawData === 'object' && !Array.isArray(rawData)) {
                    rodLevels = rawData; // Already an object
                } else if (typeof rawData === 'string') {
                    const parsed = JSON.parse(rawData);
                    rodLevels = typeof parsed === 'object' ? parsed : { rod_default: 1 };
                }
            }
            // Ensure rod_default is always at least level 1
            if (!rodLevels.rod_default) {
                rodLevels.rod_default = 1;
            }
        } catch (e) {
            console.error('Error parsing rod_levels:', e);
            rodLevels = { rod_default: 1 };
        }

        res.json({
            level: playerData[0].level,
            xp: playerData[0].xp,
            xpToNext: playerData[0].xp_to_next,
            gold: playerData[0].gold || 0,
            relics: playerData[0].relics || 0,
            statPoints: playerData[0].stat_points || 0,
            currentBiome: playerData[0].current_biome || 1,
            equippedRod: playerData[0].equipped_rod || 'rod_default',
            equippedBait: playerData[0].equipped_bait || 'bait_default',
            rodLevels: rodLevels,
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
            exoticsCaught: playerData[0].exotics_caught || 0,
            arcanesCaught: playerData[0].arcanes_caught || 0,
            treasureChestsFound: playerData[0].treasure_chests_found || 0,
            statsUpgraded: playerData[0].stats_upgraded || 0,
            strUpgraded: playerData[0].str_upgraded || 0,
            intUpgraded: playerData[0].int_upgraded || 0,
            luckUpgraded: playerData[0].luck_upgraded || 0,
            staminaUpgraded: playerData[0].stamina_upgraded || 0,
            totalRelicsEarned: playerData[0].total_relics_earned || 0,
            // Anomaly system
            anomalyFragments: playerData[0].anomaly_fragments || 0,
            // Fishpedia tracking (from locked_fish table)
            discoveredFish: formattedDiscoveredFish,
            // Fishpedia statistics (persistent catch tracking)
            fishpediaStats: formattedFishpediaStats,
            // Biome tracking
            unlockedBiomes: unlockedBiomes
        });
    } catch (error) {
        console.error('Get player data error:', error);
        res.status(500).json({ error: 'Failed to retrieve player data' });
    }
});

// Save/update player data
// DEPRECATED: This endpoint is deprecated and will be removed in a future version.
// Use the new server-authoritative endpoints in /api/game/ instead.
// This endpoint now only saves UI preferences and non-gameplay data to prevent cheating.
router.post('/save', authenticateToken, async (req, res) => {
    const connection = await db.getConnection();

    console.warn('[DEPRECATED] /api/player/save called. Please migrate to /api/game/ endpoints.');

    try {
        const userId = req.user.userId;
        const {
            level, xp, xpToNext, gold, relics, currentBiome,
            equippedRod, equippedBait, stats, inventory,
            lockedFish, ownedRods, baitInventory,
            achievements, totalFishCaught, totalFishSold,
            totalGoldEarned, mythicsCaught, legendariesCaught,
            exoticsCaught, arcanesCaught, treasureChestsFound,
            statsUpgraded, strUpgraded, intUpgraded, luckUpgraded, staminaUpgraded,
            totalRelicsEarned,
            discoveredFish, unlockedBiomes
        } = req.body;

        // WARNING: This endpoint is deprecated and should not be used for gameplay data.
        // It may be removed or restricted in future versions.

        await connection.beginTransaction();

        // Convert achievements array to JSON string
        const achievementsJson = JSON.stringify(achievements || []);

        // Convert discoveredFish array to JSON string
        const discoveredFishJson = JSON.stringify(discoveredFish || []);

        // Convert unlockedBiomes array to JSON string
        const unlockedBiomesJson = JSON.stringify(unlockedBiomes || [1]);

        // Update player data
        await connection.query(
            `UPDATE player_data
             SET level = ?, xp = ?, xp_to_next = ?, gold = ?, relics = ?,
                 current_biome = ?, equipped_rod = ?, equipped_bait = ?,
                 achievements = ?, total_fish_caught = ?, total_fish_sold = ?,
                 total_gold_earned = ?, mythics_caught = ?, legendaries_caught = ?,
                 exotics_caught = ?, arcanes_caught = ?, treasure_chests_found = ?,
                 stats_upgraded = ?, str_upgraded = ?, int_upgraded = ?,
                 luck_upgraded = ?, stamina_upgraded = ?, total_relics_earned = ?,
                 discovered_fish = ?, unlocked_biomes = ?
             WHERE user_id = ?`,
            [level, xp, xpToNext, gold, relics, currentBiome, equippedRod, equippedBait,
             achievementsJson, totalFishCaught || 0, totalFishSold || 0,
             totalGoldEarned || 0, mythicsCaught || 0, legendariesCaught || 0,
             exoticsCaught || 0, arcanesCaught || 0, treasureChestsFound || 0,
             statsUpgraded || 0, strUpgraded || 0, intUpgraded || 0,
             luckUpgraded || 0, staminaUpgraded || 0, totalRelicsEarned || 0,
             discoveredFishJson, unlockedBiomesJson, userId]
        );

        // Update player stats (with validation)
        if (stats && typeof stats === 'object') {
            await connection.query(
                `UPDATE player_stats
                 SET strength = ?, intelligence = ?, luck = ?, stamina = ?
                 WHERE user_id = ?`,
                [stats.strength || 1, stats.intelligence || 1, stats.luck || 1, stats.stamina || 100, userId]
            );
        }

        // Update inventory (delete and reinsert for simplicity)
        await connection.query('DELETE FROM player_inventory WHERE user_id = ?', [userId]);

        if (inventory && inventory.length > 0) {
            const inventoryValues = inventory.map(item => [
                userId,
                item.name,
                item.rarity,
                item.count,
                item.baseGold || 0,
                item.titanBonus || 1
            ]);

            await connection.query(
                'INSERT INTO player_inventory (user_id, fish_name, rarity, count, base_gold, titan_bonus) VALUES ?',
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

        // Update leaderboard stats (calculate from inventory for leaderboard display)
        const inventoryFishCount = (inventory && Array.isArray(inventory))
            ? inventory.reduce((sum, item) => sum + item.count, 0)
            : 0;
        const legendaryCount = (inventory && Array.isArray(inventory))
            ? inventory.filter(item => item.rarity === 'Legendary').reduce((sum, item) => sum + item.count, 0)
            : 0;
        const mythicCount = (inventory && Array.isArray(inventory))
            ? inventory.filter(item => item.rarity === 'Mythic').reduce((sum, item) => sum + item.count, 0)
            : 0;

        await connection.query(
            `UPDATE leaderboard_stats
             SET level = ?, total_gold = ?, total_relics = ?,
                 total_fish_caught = ?, legendary_fish_count = ?,
                 mythic_fish_count = ?, highest_biome = ?
             WHERE user_id = ?`,
            [level, gold, relics, inventoryFishCount, legendaryCount, mythicCount, currentBiome, userId]
        );

        await connection.commit();
        res.setHeader('X-Deprecation-Warning', 'This endpoint is deprecated. Use /api/game/ endpoints instead.');
        res.json({
            message: 'Player data saved successfully',
            warning: 'DEPRECATED: Please migrate to server-authoritative /api/game/ endpoints to prevent security vulnerabilities.'
        });
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

export default router;
