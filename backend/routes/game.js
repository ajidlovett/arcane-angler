/**
 * Game Action Routes - Server-Authoritative Endpoints
 *
 * All game actions are processed server-side to prevent client manipulation.
 * The client sends action requests, the server validates, calculates outcomes,
 * updates the database, and returns results.
 */

import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';
import { BIOMES } from '../data/biomes.js';
import { RODS, BAITS } from '../data/equipment.js';
import {
  getTotalStats,
  calculateRarity,
  calculateFishCount,
  calculateTitanBonus,
  generateTreasureChest,
  calculateLevelUp,
  calculateStatUpgradeCost,
  selectRandomFish
} from '../utils/gameLogic.js';

const router = express.Router();

/**
 * POST /api/game/cast
 * Perform a fishing cast (server calculates catch)
 *
 * Process:
 * 1. Load player stats, equipment, current biome
 * 2. Calculate total stats (base + equipment bonuses)
 * 3. Run RNG to determine rarity (based on luck)
 * 4. Select random fish from biome
 * 5. Calculate fish count (based on strength)
 * 6. Update inventory, XP, gold, relics
 * 7. Check for level up
 * 8. Return result to client
 */
router.post('/cast', authenticateToken, async (req, res) => {
  const connection = await db.getConnection();

  try {
    const userId = req.user.userId;
    await connection.beginTransaction();

    // Load player data
    const [playerData] = await connection.query(
      `SELECT pd.*, ps.strength, ps.intelligence, ps.luck, ps.stamina
       FROM player_data pd
       JOIN player_stats ps ON pd.user_id = ps.user_id
       WHERE pd.user_id = ?`,
      [userId]
    );

    if (!playerData || playerData.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Player data not found' });
    }

    const player = playerData[0];
    const baseStats = {
      strength: player.strength,
      intelligence: player.intelligence,
      luck: player.luck,
      stamina: player.stamina
    };

    // Note: Casting does not consume stamina - it has a 4-second cooldown handled client-side

    // Get total stats with equipment bonuses
    const totalStats = getTotalStats(
      baseStats,
      player.equipped_rod,
      player.equipped_bait
    );

    // Get current biome data
    const currentBiome = player.current_biome || 1;
    const biomeData = BIOMES[currentBiome];

    if (!biomeData) {
      await connection.rollback();
      return res.status(400).json({ error: 'Invalid biome' });
    }

    // Calculate rarity based on luck
    const rarity = calculateRarity(totalStats.luck);

    let result = {
      rarity,
      fish: null,
      count: 0,
      xpGained: 0,
      goldGained: 0,
      relicsGained: 0,
      titanBonus: 1,
      treasureChest: null
    };

    // Handle Treasure Chest (special case)
    if (rarity === 'Treasure Chest') {
      const rewards = generateTreasureChest(currentBiome, totalStats.luck, biomeData);
      result.treasureChest = rewards;
      result.goldGained = rewards.gold;
      result.relicsGained = rewards.relics;
      result.xpGained = 100; // Fixed XP for treasure chests

      // Update player stats
      await connection.query(
        `UPDATE player_data
         SET gold = gold + ?,
             relics = relics + ?,
             xp = xp + ?,
             treasure_chests_found = treasure_chests_found + 1,
             total_gold_earned = total_gold_earned + ?,
             total_relics_earned = total_relics_earned + ?
         WHERE user_id = ?`,
        [rewards.gold, rewards.relics, 100, rewards.gold, rewards.relics, userId]
      );

      // Note: Stamina is not consumed for casting (4-second cooldown instead)
    } else {
      // Normal fish catch
      const fish = selectRandomFish(biomeData, rarity);

      if (!fish) {
        await connection.rollback();
        return res.status(500).json({ error: 'Failed to select fish' });
      }

      // Calculate count based on strength
      const count = calculateFishCount(rarity, totalStats.strength);

      // Calculate titan bonus for Mythic fish
      let titanBonus = 1;
      if (rarity === 'Mythic') {
        titanBonus = calculateTitanBonus(totalStats.strength);
      }

      // Calculate XP and gold
      const xpGained = fish.xp * count;
      const goldGained = Math.floor(fish.gold * count * titanBonus);

      result.fish = {
        name: fish.name,
        desc: fish.desc || fish.description || ''
      };
      result.count = count;
      result.xpGained = xpGained;
      result.goldGained = goldGained;
      result.titanBonus = titanBonus;

      // Add to inventory (or update if exists)
      await connection.query(
        `INSERT INTO player_inventory (user_id, fish_name, rarity, count, base_gold, titan_bonus)
         VALUES (?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           count = count + VALUES(count),
           base_gold = VALUES(base_gold),
           titan_bonus = VALUES(titan_bonus)`,
        [userId, fish.name, rarity, count, fish.gold, titanBonus]
      );

      // Add to locked_fish (discovered fish) - ignore duplicates
      await connection.query(
        'INSERT IGNORE INTO locked_fish (user_id, fish_name) VALUES (?, ?)',
        [userId, fish.name]
      );

      // Update player data
      await connection.query(
        `UPDATE player_data
         SET gold = gold + ?,
             xp = xp + ?,
             total_fish_caught = total_fish_caught + ?,
             total_gold_earned = total_gold_earned + ?
         WHERE user_id = ?`,
        [goldGained, xpGained, count, goldGained, userId]
      );

      // Update rarity-specific counters
      if (rarity === 'Mythic') {
        await connection.query(
          'UPDATE player_data SET mythics_caught = mythics_caught + ? WHERE user_id = ?',
          [count, userId]
        );
      } else if (rarity === 'Legendary') {
        await connection.query(
          'UPDATE player_data SET legendaries_caught = legendaries_caught + ? WHERE user_id = ?',
          [count, userId]
        );
      } else if (rarity === 'Exotic') {
        await connection.query(
          'UPDATE player_data SET exotics_caught = exotics_caught + ? WHERE user_id = ?',
          [count, userId]
        );
      } else if (rarity === 'Arcane') {
        await connection.query(
          'UPDATE player_data SET arcanes_caught = arcanes_caught + ? WHERE user_id = ?',
          [count, userId]
        );
      }

      // Note: Stamina is not consumed for casting (4-second cooldown instead)
    }

    // Check for level up
    const [updatedData] = await connection.query(
      'SELECT level, xp FROM player_data WHERE user_id = ?',
      [userId]
    );

    const levelUpResult = calculateLevelUp(
      updatedData[0].level,
      updatedData[0].xp,
      0 // Already added XP above
    );

    if (levelUpResult.leveledUp) {
      await connection.query(
        'UPDATE player_data SET level = ?, xp = ? WHERE user_id = ?',
        [levelUpResult.newLevel, levelUpResult.newXP, userId]
      );
      result.leveledUp = true;
      result.newLevel = levelUpResult.newLevel;
    } else {
      result.leveledUp = false;
      result.newLevel = updatedData[0].level;
    }

    // Get updated balances
    const [finalData] = await connection.query(
      `SELECT pd.level, pd.xp, pd.gold, pd.relics, ps.stamina
       FROM player_data pd
       JOIN player_stats ps ON pd.user_id = ps.user_id
       WHERE pd.user_id = ?`,
      [userId]
    );

    result.newGold = finalData[0].gold;
    result.newRelics = finalData[0].relics;
    result.newXP = finalData[0].xp;
    result.newStamina = finalData[0].stamina;

    await connection.commit();
    res.json({ success: true, result });
  } catch (error) {
    await connection.rollback();
    console.error('Cast fishing error:', error);
    res.status(500).json({ error: 'Failed to process fishing cast' });
  } finally {
    connection.release();
  }
});

/**
 * POST /api/game/sell
 * Sell fish from inventory
 *
 * Body: { fishName, rarity, quantity }
 */
router.post('/sell', authenticateToken, async (req, res) => {
  const connection = await db.getConnection();

  try {
    const userId = req.user.userId;
    const { fishName, rarity, quantity } = req.body;

    // Validate input
    if (!fishName || !rarity || !quantity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (typeof quantity !== 'number' || quantity <= 0 || !Number.isInteger(quantity)) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }

    await connection.beginTransaction();

    // Check if player owns the fish
    const [inventory] = await connection.query(
      'SELECT count, base_gold, titan_bonus FROM player_inventory WHERE user_id = ? AND fish_name = ? AND rarity = ?',
      [userId, fishName, rarity]
    );

    if (!inventory || inventory.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Fish not found in inventory' });
    }

    const ownedCount = inventory[0].count;
    const baseGold = inventory[0].base_gold;
    const titanBonus = inventory[0].titan_bonus || 1;

    if (ownedCount < quantity) {
      await connection.rollback();
      return res.status(400).json({ error: 'Not enough fish to sell' });
    }

    // Calculate gold value
    const goldEarned = Math.floor(baseGold * titanBonus * quantity);

    // Update inventory (remove sold fish)
    const newCount = ownedCount - quantity;
    if (newCount === 0) {
      // Remove from inventory if sold all
      await connection.query(
        'DELETE FROM player_inventory WHERE user_id = ? AND fish_name = ? AND rarity = ?',
        [userId, fishName, rarity]
      );
    } else {
      // Decrease count
      await connection.query(
        'UPDATE player_inventory SET count = ? WHERE user_id = ? AND fish_name = ? AND rarity = ?',
        [newCount, userId, fishName, rarity]
      );
    }

    // Add gold to player
    await connection.query(
      `UPDATE player_data
       SET gold = gold + ?,
           total_fish_sold = total_fish_sold + ?
       WHERE user_id = ?`,
      [goldEarned, quantity, userId]
    );

    // Get updated gold balance
    const [playerData] = await connection.query(
      'SELECT gold FROM player_data WHERE user_id = ?',
      [userId]
    );

    await connection.commit();
    res.json({
      success: true,
      goldEarned,
      newGold: playerData[0].gold,
      remainingCount: newCount
    });
  } catch (error) {
    await connection.rollback();
    console.error('Sell fish error:', error);
    res.status(500).json({ error: 'Failed to sell fish' });
  } finally {
    connection.release();
  }
});

/**
 * POST /api/game/buy-rod
 * Purchase a fishing rod
 *
 * Body: { rodName }
 */
router.post('/buy-rod', authenticateToken, async (req, res) => {
  const connection = await db.getConnection();

  try {
    const userId = req.user.userId;
    const { rodName } = req.body;

    // Validate input
    if (!rodName) {
      return res.status(400).json({ error: 'Rod name is required' });
    }

    // Check if rod exists
    const rod = RODS[rodName];
    if (!rod) {
      return res.status(404).json({ error: 'Rod not found' });
    }

    await connection.beginTransaction();

    // Check if player already owns it
    const [owned] = await connection.query(
      'SELECT rod_name FROM owned_rods WHERE user_id = ? AND rod_name = ?',
      [userId, rodName]
    );

    if (owned && owned.length > 0) {
      await connection.rollback();
      return res.status(400).json({ error: 'You already own this rod' });
    }

    // Check if player has enough gold
    const [playerData] = await connection.query(
      'SELECT gold FROM player_data WHERE user_id = ?',
      [userId]
    );

    if (!playerData || playerData.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Player data not found' });
    }

    const currentGold = playerData[0].gold;
    if (currentGold < rod.price) {
      await connection.rollback();
      return res.status(400).json({ error: 'Not enough gold' });
    }

    // Deduct gold
    await connection.query(
      'UPDATE player_data SET gold = gold - ? WHERE user_id = ?',
      [rod.price, userId]
    );

    // Add rod to owned_rods
    await connection.query(
      'INSERT INTO owned_rods (user_id, rod_name) VALUES (?, ?)',
      [userId, rodName]
    );

    // Get updated gold balance
    const [updated] = await connection.query(
      'SELECT gold FROM player_data WHERE user_id = ?',
      [userId]
    );

    await connection.commit();
    res.json({
      success: true,
      rodName,
      newGold: updated[0].gold
    });
  } catch (error) {
    await connection.rollback();
    console.error('Buy rod error:', error);
    res.status(500).json({ error: 'Failed to purchase rod' });
  } finally {
    connection.release();
  }
});

/**
 * POST /api/game/buy-bait
 * Purchase bait
 *
 * Body: { baitName, quantity }
 */
router.post('/buy-bait', authenticateToken, async (req, res) => {
  const connection = await db.getConnection();

  try {
    const userId = req.user.userId;
    const { baitName, quantity } = req.body;

    // Validate input
    if (!baitName || !quantity) {
      return res.status(400).json({ error: 'Bait name and quantity are required' });
    }

    if (typeof quantity !== 'number' || quantity <= 0 || !Number.isInteger(quantity)) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }

    // Check if bait exists
    const bait = BAITS[baitName];
    if (!bait) {
      return res.status(404).json({ error: 'Bait not found' });
    }

    const totalCost = bait.price * quantity;

    await connection.beginTransaction();

    // Check if player has enough gold
    const [playerData] = await connection.query(
      'SELECT gold FROM player_data WHERE user_id = ?',
      [userId]
    );

    if (!playerData || playerData.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Player data not found' });
    }

    const currentGold = playerData[0].gold;
    if (currentGold < totalCost) {
      await connection.rollback();
      return res.status(400).json({ error: 'Not enough gold' });
    }

    // Deduct gold
    await connection.query(
      'UPDATE player_data SET gold = gold - ? WHERE user_id = ?',
      [totalCost, userId]
    );

    // Add bait to inventory (or update if exists)
    await connection.query(
      `INSERT INTO bait_inventory (user_id, bait_name, quantity)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`,
      [userId, baitName, quantity]
    );

    // Get updated balances
    const [updated] = await connection.query(
      'SELECT gold FROM player_data WHERE user_id = ?',
      [userId]
    );

    const [baitInventory] = await connection.query(
      'SELECT quantity FROM bait_inventory WHERE user_id = ? AND bait_name = ?',
      [userId, baitName]
    );

    await connection.commit();
    res.json({
      success: true,
      baitName,
      quantity,
      totalCost,
      newGold: updated[0].gold,
      newBaitQuantity: baitInventory[0].quantity
    });
  } catch (error) {
    await connection.rollback();
    console.error('Buy bait error:', error);
    res.status(500).json({ error: 'Failed to purchase bait' });
  } finally {
    connection.release();
  }
});

/**
 * GET /api/game/stat-costs
 * Get upgrade costs for all stats based on current values
 *
 * Returns: { strength: { current: 5, cost: 7 }, ... }
 */
router.get('/stat-costs', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get current stat values
    const [playerStats] = await db.query(
      'SELECT strength, intelligence, luck, stamina FROM player_stats WHERE user_id = ?',
      [userId]
    );

    if (!playerStats || playerStats.length === 0) {
      return res.status(404).json({ error: 'Player stats not found' });
    }

    const stats = playerStats[0];
    const costs = {
      strength: {
        current: stats.strength,
        cost: calculateStatUpgradeCost(stats.strength)
      },
      intelligence: {
        current: stats.intelligence,
        cost: calculateStatUpgradeCost(stats.intelligence)
      },
      luck: {
        current: stats.luck,
        cost: calculateStatUpgradeCost(stats.luck)
      },
      stamina: {
        current: stats.stamina,
        cost: calculateStatUpgradeCost(stats.stamina)
      }
    };

    res.json({ success: true, costs });
  } catch (error) {
    console.error('Get stat costs error:', error);
    res.status(500).json({ error: 'Failed to get stat costs' });
  }
});

/**
 * POST /api/game/upgrade-stat
 * Upgrade a player stat
 *
 * Body: { stat } // "strength" | "intelligence" | "luck" | "stamina"
 */
router.post('/upgrade-stat', authenticateToken, async (req, res) => {
  const connection = await db.getConnection();

  try {
    const userId = req.user.userId;
    const { stat } = req.body;

    // Validate input
    const validStats = ['strength', 'intelligence', 'luck', 'stamina'];
    if (!stat || !validStats.includes(stat)) {
      return res.status(400).json({ error: 'Invalid stat name' });
    }

    await connection.beginTransaction();

    // Get current stat value
    const [playerStats] = await connection.query(
      `SELECT ${stat} FROM player_stats WHERE user_id = ?`,
      [userId]
    );

    if (!playerStats || playerStats.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Player stats not found' });
    }

    const currentValue = playerStats[0][stat];
    const cost = calculateStatUpgradeCost(currentValue);

    // Check if player has enough relics
    const [playerData] = await connection.query(
      'SELECT relics FROM player_data WHERE user_id = ?',
      [userId]
    );

    if (!playerData || playerData.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Player data not found' });
    }

    const currentRelics = playerData[0].relics;
    if (currentRelics < cost) {
      await connection.rollback();
      return res.status(400).json({ error: 'Not enough relics' });
    }

    // Deduct relics
    await connection.query(
      'UPDATE player_data SET relics = relics - ?, stats_upgraded = stats_upgraded + 1 WHERE user_id = ?',
      [cost, userId]
    );

    // Increment stat
    await connection.query(
      `UPDATE player_stats SET ${stat} = ${stat} + 1 WHERE user_id = ?`,
      [userId]
    );

    // Update stat-specific counter
    const statUpgradedColumn = `${stat.substring(0, stat === 'stamina' ? 4 : 3)}_upgraded`;
    await connection.query(
      `UPDATE player_data SET ${statUpgradedColumn} = ${statUpgradedColumn} + 1 WHERE user_id = ?`,
      [userId]
    );

    // Get updated values
    const [updated] = await connection.query(
      `SELECT relics FROM player_data WHERE user_id = ?`,
      [userId]
    );

    const [newStats] = await connection.query(
      `SELECT ${stat} FROM player_stats WHERE user_id = ?`,
      [userId]
    );

    // Calculate next upgrade cost
    const nextCost = calculateStatUpgradeCost(newStats[0][stat]);

    await connection.commit();
    res.json({
      success: true,
      stat,
      newValue: newStats[0][stat],
      costPaid: cost,
      nextCost,
      newRelics: updated[0].relics
    });
  } catch (error) {
    await connection.rollback();
    console.error('Upgrade stat error:', error);
    res.status(500).json({ error: 'Failed to upgrade stat' });
  } finally {
    connection.release();
  }
});

/**
 * POST /api/game/unlock-biome
 * Unlock a new biome
 *
 * Body: { biomeId }
 */
router.post('/unlock-biome', authenticateToken, async (req, res) => {
  const connection = await db.getConnection();

  try {
    const userId = req.user.userId;
    const { biomeId } = req.body;

    // Validate input
    if (!biomeId || typeof biomeId !== 'number') {
      return res.status(400).json({ error: 'Invalid biome ID' });
    }

    // Check if biome exists
    const biomeData = BIOMES[biomeId];
    if (!biomeData) {
      return res.status(404).json({ error: 'Biome not found' });
    }

    await connection.beginTransaction();

    // Get player data
    const [playerData] = await connection.query(
      'SELECT level, gold, unlocked_biomes FROM player_data WHERE user_id = ?',
      [userId]
    );

    if (!playerData || playerData.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Player data not found' });
    }

    const player = playerData[0];

    // Parse unlocked biomes
    let unlockedBiomes = [];
    try {
      const rawData = player.unlocked_biomes;
      if (Array.isArray(rawData)) {
        unlockedBiomes = rawData;
      } else if (typeof rawData === 'string') {
        unlockedBiomes = JSON.parse(rawData);
      }
    } catch (e) {
      unlockedBiomes = [1];
    }

    // Check if already unlocked
    if (unlockedBiomes.includes(biomeId)) {
      await connection.rollback();
      return res.status(400).json({ error: 'Biome already unlocked' });
    }

    // Check level requirement
    if (player.level < biomeData.unlockLevel) {
      await connection.rollback();
      return res.status(400).json({
        error: `Level ${biomeData.unlockLevel} required`
      });
    }

    // Check gold requirement
    if (player.gold < biomeData.unlockGold) {
      await connection.rollback();
      return res.status(400).json({
        error: `${biomeData.unlockGold} gold required`
      });
    }

    // Deduct gold
    await connection.query(
      'UPDATE player_data SET gold = gold - ? WHERE user_id = ?',
      [biomeData.unlockGold, userId]
    );

    // Add to unlocked biomes
    unlockedBiomes.push(biomeId);
    const updatedBiomesJson = JSON.stringify(unlockedBiomes);

    await connection.query(
      'UPDATE player_data SET unlocked_biomes = ? WHERE user_id = ?',
      [updatedBiomesJson, userId]
    );

    // Get updated gold
    const [updated] = await connection.query(
      'SELECT gold FROM player_data WHERE user_id = ?',
      [userId]
    );

    await connection.commit();
    res.json({
      success: true,
      biomeId,
      biomeName: biomeData.name,
      newGold: updated[0].gold,
      unlockedBiomes
    });
  } catch (error) {
    await connection.rollback();
    console.error('Unlock biome error:', error);
    res.status(500).json({ error: 'Failed to unlock biome' });
  } finally {
    connection.release();
  }
});

/**
 * POST /api/game/equip-rod
 * Equip a fishing rod
 *
 * Body: { rodName }
 */
router.post('/equip-rod', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { rodName } = req.body;

    if (!rodName) {
      return res.status(400).json({ error: 'Rod name is required' });
    }

    // Verify rod exists
    if (!RODS[rodName]) {
      return res.status(404).json({ error: 'Rod not found' });
    }

    // Verify player owns the rod
    const [owned] = await db.query(
      'SELECT rod_name FROM owned_rods WHERE user_id = ? AND rod_name = ?',
      [userId, rodName]
    );

    if (!owned || owned.length === 0) {
      return res.status(400).json({ error: 'You do not own this rod' });
    }

    // Equip the rod
    await db.query(
      'UPDATE player_data SET equipped_rod = ? WHERE user_id = ?',
      [rodName, userId]
    );

    res.json({ success: true, equippedRod: rodName });
  } catch (error) {
    console.error('Equip rod error:', error);
    res.status(500).json({ error: 'Failed to equip rod' });
  }
});

/**
 * POST /api/game/equip-bait
 * Equip bait for fishing
 *
 * Body: { baitName }
 */
router.post('/equip-bait', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { baitName } = req.body;

    // Allow null to unequip bait
    if (baitName === null) {
      await db.query(
        'UPDATE player_data SET equipped_bait = NULL WHERE user_id = ?',
        [userId]
      );
      return res.json({ success: true, equippedBait: null });
    }

    // Verify bait exists
    if (!BAITS[baitName]) {
      return res.status(404).json({ error: 'Bait not found' });
    }

    // Verify player has the bait
    const [inventory] = await db.query(
      'SELECT quantity FROM bait_inventory WHERE user_id = ? AND bait_name = ?',
      [userId, baitName]
    );

    if (!inventory || inventory.length === 0 || inventory[0].quantity < 1) {
      return res.status(400).json({ error: 'You do not have this bait' });
    }

    // Equip the bait
    await db.query(
      'UPDATE player_data SET equipped_bait = ? WHERE user_id = ?',
      [baitName, userId]
    );

    res.json({ success: true, equippedBait: baitName });
  } catch (error) {
    console.error('Equip bait error:', error);
    res.status(500).json({ error: 'Failed to equip bait' });
  }
});

/**
 * POST /api/game/change-biome
 * Change to a different biome
 *
 * Body: { biomeId }
 */
router.post('/change-biome', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { biomeId } = req.body;

    if (!biomeId || typeof biomeId !== 'number') {
      return res.status(400).json({ error: 'Invalid biome ID' });
    }

    // Verify biome exists
    if (!BIOMES[biomeId]) {
      return res.status(404).json({ error: 'Biome not found' });
    }

    // Get player's unlocked biomes
    const [playerData] = await db.query(
      'SELECT unlocked_biomes FROM player_data WHERE user_id = ?',
      [userId]
    );

    if (!playerData || playerData.length === 0) {
      return res.status(404).json({ error: 'Player data not found' });
    }

    // Parse unlocked biomes
    let unlockedBiomes = [];
    try {
      const rawData = playerData[0].unlocked_biomes;
      if (Array.isArray(rawData)) {
        unlockedBiomes = rawData;
      } else if (typeof rawData === 'string') {
        unlockedBiomes = JSON.parse(rawData);
      }
    } catch (e) {
      unlockedBiomes = [1];
    }

    // Verify player has unlocked the biome
    if (!unlockedBiomes.includes(biomeId)) {
      return res.status(400).json({ error: 'Biome not unlocked' });
    }

    // Change biome
    await db.query(
      'UPDATE player_data SET current_biome = ? WHERE user_id = ?',
      [biomeId, userId]
    );

    res.json({ success: true, currentBiome: biomeId });
  } catch (error) {
    console.error('Change biome error:', error);
    res.status(500).json({ error: 'Failed to change biome' });
  }
});

export default router;
