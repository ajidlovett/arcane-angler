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
  calculateGoldMultiplier,
  calculateCriticalCatch,
  generateTreasureChest,
  calculateLevelUp,
  calculateXPForNextLevel,
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

      // Apply Critical Catch to XP with level scaling
      const baseXP = 100; // Fixed XP for treasure chests
      const critMultiplier = calculateCriticalCatch(totalStats.stamina);

      // Add level-based XP bonus
      const levelBonus = player.level * (1 + Math.random()); // Random between level*1 and level*2
      const xpGained = Math.floor((baseXP + levelBonus) * critMultiplier);

      result.treasureChest = rewards;
      result.goldGained = rewards.gold;
      result.relicsGained = rewards.relics;
      result.xpGained = xpGained;
      result.critMultiplier = critMultiplier;

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
        [rewards.gold, rewards.relics, xpGained, rewards.gold, rewards.relics, userId]
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

      // Calculate titan bonus for Boss fish (Legendary, Mythic, Exotic, Arcane)
      let titanBonus = 1;
      const bossFish = ['Legendary', 'Mythic', 'Exotic', 'Arcane'];
      if (bossFish.includes(rarity)) {
        titanBonus = calculateTitanBonus(totalStats.strength);
      }

      // Calculate XP with Critical Catch multiplier and level scaling
      const baseXP = fish.xp * count;
      const critMultiplier = calculateCriticalCatch(totalStats.stamina);

      // Add level-based XP bonus: level * random(1-2) per fish
      // Level 2: +2-4 XP, Level 3: +3-6 XP, Level 4: +4-8 XP, etc.
      const levelBonus = player.level * (1 + Math.random()); // Random between level*1 and level*2
      const xpWithLevelBonus = Math.floor((baseXP + levelBonus) * critMultiplier);
      const xpGained = xpWithLevelBonus;

      result.fish = {
        name: fish.name,
        desc: fish.desc || fish.description || ''
      };
      result.count = count;
      result.xpGained = xpGained;
      result.goldGained = 0; // No gold from catching fish
      result.titanBonus = titanBonus;
      result.critMultiplier = critMultiplier;

      // Add to inventory (or update if exists)
      await connection.query(
        `INSERT INTO player_inventory (user_id, fish_name, rarity, count, total_caught, base_gold, titan_bonus)
         VALUES (?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           count = count + VALUES(count),
           total_caught = total_caught + VALUES(total_caught),
           base_gold = VALUES(base_gold),
           titan_bonus = VALUES(titan_bonus)`,
        [userId, fish.name, rarity, count, count, fish.gold, titanBonus]
      );

      // Add to locked_fish (discovered fish) - ignore duplicates
      await connection.query(
        'INSERT IGNORE INTO locked_fish (user_id, fish_name) VALUES (?, ?)',
        [userId, fish.name]
      );

      // Update player data (NO GOLD - only XP and fish count!)
      await connection.query(
        `UPDATE player_data
         SET xp = xp + ?,
             total_fish_caught = total_fish_caught + ?
         WHERE user_id = ?`,
        [xpGained, count, userId]
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

    // Consume bait (if equipped and not the free starter bait)
    if (player.equipped_bait && player.equipped_bait !== 'Stale Bread Crust') {
      // Check bait inventory
      const [baitInventory] = await connection.query(
        'SELECT quantity FROM bait_inventory WHERE user_id = ? AND bait_name = ?',
        [userId, player.equipped_bait]
      );

      if (baitInventory && baitInventory.length > 0) {
        const currentQuantity = baitInventory[0].quantity;

        if (currentQuantity > 1) {
          // Decrease bait by 1
          await connection.query(
            'UPDATE bait_inventory SET quantity = quantity - 1 WHERE user_id = ? AND bait_name = ?',
            [userId, player.equipped_bait]
          );
        } else {
          // Last bait - remove from inventory and unequip (switch to free bait)
          await connection.query(
            'DELETE FROM bait_inventory WHERE user_id = ? AND bait_name = ?',
            [userId, player.equipped_bait]
          );
          await connection.query(
            'UPDATE player_data SET equipped_bait = ? WHERE user_id = ?',
            ['Stale Bread Crust', userId]
          );
        }
      }
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
      // Calculate XP needed for next level
      const xpToNext = calculateXPForNextLevel(levelUpResult.newLevel);

      // Update level, XP, xp_to_next, and grant relics (3 per level)
      await connection.query(
        `UPDATE player_data
         SET level = ?, xp = ?, xp_to_next = ?, relics = relics + ?, total_relics_earned = total_relics_earned + ?
         WHERE user_id = ?`,
        [levelUpResult.newLevel, levelUpResult.newXP, xpToNext, levelUpResult.relicsGained, levelUpResult.relicsGained, userId]
      );
      result.leveledUp = true;
      result.newLevel = levelUpResult.newLevel;
      result.levelsGained = levelUpResult.levelsGained;
      result.relicsFromLevelUp = levelUpResult.relicsGained;
    } else {
      // No level up, but ensure xp_to_next is correct for current level
      const xpToNext = calculateXPForNextLevel(updatedData[0].level);
      await connection.query(
        `UPDATE player_data SET xp_to_next = ? WHERE user_id = ?`,
        [xpToNext, userId]
      );
      result.leveledUp = false;
      result.newLevel = updatedData[0].level;
      result.levelsGained = 0;
      result.relicsFromLevelUp = 0;
    }

    // Get updated balances and equipped bait
    const [finalData] = await connection.query(
      `SELECT pd.level, pd.xp, pd.gold, pd.relics, pd.equipped_bait, ps.stamina
       FROM player_data pd
       JOIN player_stats ps ON pd.user_id = ps.user_id
       WHERE pd.user_id = ?`,
      [userId]
    );

    result.newGold = finalData[0].gold;
    result.newRelics = finalData[0].relics;
    result.newXP = finalData[0].xp;
    result.newStamina = finalData[0].stamina;
    result.equippedBait = finalData[0].equipped_bait;

    // Get updated bait quantity if bait is equipped
    if (finalData[0].equipped_bait && finalData[0].equipped_bait !== 'Stale Bread Crust') {
      const [baitQty] = await connection.query(
        'SELECT quantity FROM bait_inventory WHERE user_id = ? AND bait_name = ?',
        [userId, finalData[0].equipped_bait]
      );
      result.baitQuantity = baitQty && baitQty.length > 0 ? baitQty[0].quantity : 0;
    } else {
      result.baitQuantity = 999999; // Free bait is infinite
    }

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

    // Load player stats and equipment for Intelligence bonus
    const [playerData] = await connection.query(
      `SELECT pd.equipped_rod, pd.equipped_bait, ps.intelligence
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

    // Calculate total Intelligence (base + equipment)
    const totalStats = getTotalStats(
      { intelligence: player.intelligence },
      player.equipped_rod,
      player.equipped_bait
    );

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

    // Calculate gold value with Intelligence multiplier
    const goldMultiplier = calculateGoldMultiplier(totalStats.intelligence);
    const goldEarned = Math.floor(baseGold * titanBonus * quantity * goldMultiplier);

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
    const [updatedPlayer] = await connection.query(
      'SELECT gold FROM player_data WHERE user_id = ?',
      [userId]
    );

    await connection.commit();
    res.json({
      success: true,
      goldEarned,
      newGold: updatedPlayer[0].gold,
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
    // Map stat names to their column names
    const statColumnMap = {
      'strength': 'str_upgraded',
      'intelligence': 'int_upgraded',
      'luck': 'luck_upgraded',
      'stamina': 'stamina_upgraded'
    };
    const statUpgradedColumn = statColumnMap[stat];
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

/**
 * POST /api/game/sell-all
 * Sell all unlocked fish from inventory
 *
 * Body: none
 */
router.post('/sell-all', authenticateToken, async (req, res) => {
  const connection = await db.getConnection();

  try {
    const userId = req.user.userId;
    await connection.beginTransaction();

    // Get player stats for Intelligence bonus
    const [playerData] = await connection.query(
      `SELECT pd.equipped_rod, pd.equipped_bait, ps.intelligence
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

    // Calculate total Intelligence (base + equipment)
    const totalStats = getTotalStats(
      { intelligence: player.intelligence },
      player.equipped_rod,
      player.equipped_bait
    );

    // Get all unlocked fish
    const [unlockedFish] = await connection.query(
      'SELECT fish_name, rarity, count, base_gold, titan_bonus FROM player_inventory WHERE user_id = ? AND (is_locked IS NULL OR is_locked = FALSE) AND count > 0',
      [userId]
    );

    if (!unlockedFish || unlockedFish.length === 0) {
      await connection.rollback();
      return res.json({ success: true, goldEarned: 0, fishSold: 0, newGold: 0 });
    }

    // Calculate total gold with Intelligence multiplier
    const goldMultiplier = calculateGoldMultiplier(totalStats.intelligence);
    let totalGold = 0;
    let totalFishCount = 0;

    for (const fish of unlockedFish) {
      const baseGold = fish.base_gold || 0;
      const titanBonus = fish.titan_bonus || 1;
      const count = fish.count || 0;
      const goldEarned = Math.floor(baseGold * titanBonus * count * goldMultiplier);
      totalGold += goldEarned;
      totalFishCount += count;
    }

    // Delete all unlocked fish from inventory
    await connection.query(
      'DELETE FROM player_inventory WHERE user_id = ? AND (is_locked IS NULL OR is_locked = FALSE)',
      [userId]
    );

    // Update player gold
    await connection.query(
      `UPDATE player_data
       SET gold = gold + ?,
           total_fish_sold = total_fish_sold + ?
       WHERE user_id = ?`,
      [totalGold, totalFishCount, userId]
    );

    // Get updated gold balance
    const [updatedPlayer] = await connection.query(
      'SELECT gold FROM player_data WHERE user_id = ?',
      [userId]
    );

    await connection.commit();
    res.json({
      success: true,
      goldEarned: totalGold,
      fishSold: totalFishCount,
      newGold: updatedPlayer[0].gold
    });
  } catch (error) {
    await connection.rollback();
    console.error('Sell all error:', error);
    res.status(500).json({ error: 'Failed to sell all fish' });
  } finally {
    connection.release();
  }
});

/**
 * POST /api/game/sell-by-rarity
 * Sell all unlocked fish of a specific rarity
 *
 * Body: { rarity }
 */
router.post('/sell-by-rarity', authenticateToken, async (req, res) => {
  const connection = await db.getConnection();

  try {
    const userId = req.user.userId;
    const { rarity } = req.body;

    if (!rarity) {
      return res.status(400).json({ error: 'Rarity is required' });
    }

    await connection.beginTransaction();

    // Get player stats for Intelligence bonus
    const [playerData] = await connection.query(
      `SELECT pd.equipped_rod, pd.equipped_bait, ps.intelligence
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

    // Calculate total Intelligence (base + equipment)
    const totalStats = getTotalStats(
      { intelligence: player.intelligence },
      player.equipped_rod,
      player.equipped_bait
    );

    // Get all unlocked fish of this rarity
    const [fishToSell] = await connection.query(
      'SELECT fish_name, count, base_gold, titan_bonus FROM player_inventory WHERE user_id = ? AND rarity = ? AND (is_locked IS NULL OR is_locked = FALSE) AND count > 0',
      [userId, rarity]
    );

    if (!fishToSell || fishToSell.length === 0) {
      await connection.rollback();
      return res.json({ success: true, goldEarned: 0, fishSold: 0, newGold: 0 });
    }

    // Calculate total gold with Intelligence multiplier
    const goldMultiplier = calculateGoldMultiplier(totalStats.intelligence);
    let totalGold = 0;
    let totalFishCount = 0;

    for (const fish of fishToSell) {
      const baseGold = fish.base_gold || 0;
      const titanBonus = fish.titan_bonus || 1;
      const count = fish.count || 0;
      const goldEarned = Math.floor(baseGold * titanBonus * count * goldMultiplier);
      totalGold += goldEarned;
      totalFishCount += count;
    }

    // Delete all unlocked fish of this rarity from inventory
    await connection.query(
      'DELETE FROM player_inventory WHERE user_id = ? AND rarity = ? AND (is_locked IS NULL OR is_locked = FALSE)',
      [userId, rarity]
    );

    // Update player gold
    await connection.query(
      `UPDATE player_data
       SET gold = gold + ?,
           total_fish_sold = total_fish_sold + ?
       WHERE user_id = ?`,
      [totalGold, totalFishCount, userId]
    );

    // Get updated gold balance
    const [updatedPlayer] = await connection.query(
      'SELECT gold FROM player_data WHERE user_id = ?',
      [userId]
    );

    await connection.commit();
    res.json({
      success: true,
      goldEarned: totalGold,
      fishSold: totalFishCount,
      newGold: updatedPlayer[0].gold
    });
  } catch (error) {
    await connection.rollback();
    console.error('Sell by rarity error:', error);
    res.status(500).json({ error: 'Failed to sell fish by rarity' });
  } finally {
    connection.release();
  }
});

/**
 * POST /api/game/lock-fish
 * Lock a fish to prevent accidental selling
 *
 * Body: { fishName }
 */
router.post('/lock-fish', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { fishName } = req.body;

    if (!fishName) {
      return res.status(400).json({ error: 'Fish name is required' });
    }

    // Check if fish exists in inventory
    const [inventory] = await db.query(
      'SELECT id FROM player_inventory WHERE user_id = ? AND fish_name = ?',
      [userId, fishName]
    );

    if (!inventory || inventory.length === 0) {
      return res.status(404).json({ error: 'Fish not found in inventory' });
    }

    // Lock the fish
    await db.query(
      'UPDATE player_inventory SET is_locked = TRUE WHERE user_id = ? AND fish_name = ?',
      [userId, fishName]
    );

    res.json({ success: true, fishName, locked: true });
  } catch (error) {
    console.error('Lock fish error:', error);
    res.status(500).json({ error: 'Failed to lock fish' });
  }
});

/**
 * POST /api/game/unlock-fish
 * Unlock a fish to allow selling
 *
 * Body: { fishName }
 */
router.post('/unlock-fish', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { fishName } = req.body;

    if (!fishName) {
      return res.status(400).json({ error: 'Fish name is required' });
    }

    // Check if fish exists in inventory
    const [inventory] = await db.query(
      'SELECT id FROM player_inventory WHERE user_id = ? AND fish_name = ?',
      [userId, fishName]
    );

    if (!inventory || inventory.length === 0) {
      return res.status(404).json({ error: 'Fish not found in inventory' });
    }

    // Unlock the fish
    await db.query(
      'UPDATE player_inventory SET is_locked = FALSE WHERE user_id = ? AND fish_name = ?',
      [userId, fishName]
    );

    res.json({ success: true, fishName, locked: false });
  } catch (error) {
    console.error('Unlock fish error:', error);
    res.status(500).json({ error: 'Failed to unlock fish' });
  }
});

/**
 * POST /api/game/sync-achievements
 * Sync achievements from client to server
 *
 * Body: { achievements } - array of achievement IDs
 */
router.post('/sync-achievements', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { achievements } = req.body;

    if (!Array.isArray(achievements)) {
      return res.status(400).json({ error: 'Achievements must be an array' });
    }

    // Update achievements in database
    const achievementsJson = JSON.stringify(achievements);
    await db.query(
      'UPDATE player_data SET achievements = ? WHERE user_id = ?',
      [achievementsJson, userId]
    );

    res.json({ success: true, count: achievements.length });
  } catch (error) {
    console.error('Sync achievements error:', error);
    res.status(500).json({ error: 'Failed to sync achievements' });
  }
});

export default router;
