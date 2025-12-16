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
import { trackQuestProgress } from '../utils/questTracking.js';

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

    // Load active boosters
    const [activeBoosters] = await connection.query(
      `SELECT * FROM player_boosters
       WHERE user_id = ? AND expires_at > NOW()`,
      [userId]
    );

    // Calculate booster bonuses
    let xpBonus = 1.0; // Multiplier (1.0 = no bonus)
    let statBonus = 1.0; // Multiplier for strength/luck
    for (const booster of activeBoosters) {
      if (booster.effect_type === 'xp_bonus') {
        xpBonus += booster.bonus_percentage / 100;
      } else if (booster.effect_type === 'stat_bonus') {
        statBonus += booster.bonus_percentage / 100;
      }
    }

    // Apply stat bonus to base stats
    const baseStats = {
      strength: Math.floor(player.strength * statBonus),
      intelligence: player.intelligence, // Intelligence not affected by stat boosters
      luck: Math.floor(player.luck * statBonus),
      stamina: player.stamina // Stamina not affected by stat boosters
    };

    // Note: Casting does not consume stamina - it has a 4-second cooldown handled client-side

    // Get total stats with equipment bonuses (already includes booster bonuses from baseStats)
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
      const xpGained = Math.floor((baseXP + levelBonus) * critMultiplier * xpBonus);

      result.treasureChest = rewards;
      result.goldGained = rewards.gold;
      result.relicsGained = rewards.relics;
      result.xpGained = xpGained;
      result.critMultiplier = critMultiplier;
      result.xpBonus = xpBonus;

      // Update player stats
      await connection.query(
        `UPDATE player_data
         SET gold = gold + ?,
             relics = relics + ?,
             xp = xp + ?,
             treasure_chests_found = treasure_chests_found + 1,
             total_gold_earned = total_gold_earned + ?,
             total_relics_earned = total_relics_earned + ?,
             total_casts = total_casts + 1
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
      const levelBonus = player.level * (1 + Math.random()) * count; // Random between level*1 and level*2 per fish
      const xpWithLevelBonus = Math.floor((baseXP + levelBonus) * critMultiplier * xpBonus);
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
      result.xpBonus = xpBonus;

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

      // Update fishpedia_stats (persistent catch tracking for Fishpedia)
      console.log('[DEBUG] Updating fishpedia_stats:', {
        userId,
        fishName: fish.name,
        rarity,
        count,
        action: 'INSERT or UPDATE'
      });

      const [fishpediaResult] = await connection.query(
        `INSERT INTO fishpedia_stats (user_id, fish_name, rarity, total_caught, first_caught_at, last_caught_at)
         VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
         ON DUPLICATE KEY UPDATE
           total_caught = total_caught + ?,
           last_caught_at = CURRENT_TIMESTAMP`,
        [userId, fish.name, rarity, count, count]
      );

      console.log('[DEBUG] Fishpedia update result:', {
        affectedRows: fishpediaResult.affectedRows,
        insertId: fishpediaResult.insertId,
        warningCount: fishpediaResult.warningCount
      });

      // Update player data (NO GOLD - only XP and fish count!)
      await connection.query(
        `UPDATE player_data
         SET xp = xp + ?,
             total_fish_caught = total_fish_caught + ?,
             total_casts = total_casts + 1
         WHERE user_id = ?`,
        [xpGained, count, userId]
      );

      // Update rarity-specific counters
      if (rarity === 'Common') {
        await connection.query(
          'UPDATE player_data SET commons_caught = commons_caught + ? WHERE user_id = ?',
          [count, userId]
        );
      } else if (rarity === 'Uncommon') {
        await connection.query(
          'UPDATE player_data SET uncommons_caught = uncommons_caught + ? WHERE user_id = ?',
          [count, userId]
        );
      } else if (rarity === 'Fine') {
        await connection.query(
          'UPDATE player_data SET fines_caught = fines_caught + ? WHERE user_id = ?',
          [count, userId]
        );
      } else if (rarity === 'Rare') {
        await connection.query(
          'UPDATE player_data SET rares_caught = rares_caught + ? WHERE user_id = ?',
          [count, userId]
        );
      } else if (rarity === 'Epic') {
        await connection.query(
          'UPDATE player_data SET epics_caught = epics_caught + ? WHERE user_id = ?',
          [count, userId]
        );
      } else if (rarity === 'Legendary') {
        await connection.query(
          'UPDATE player_data SET legendaries_caught = legendaries_caught + ? WHERE user_id = ?',
          [count, userId]
        );
      } else if (rarity === 'Mythic') {
        await connection.query(
          'UPDATE player_data SET mythics_caught = mythics_caught + ? WHERE user_id = ?',
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

      // Record global rare catch for global notifications
      if (['Mythic', 'Exotic', 'Arcane'].includes(rarity)) {
        // Get profile username for the notification
        const [userData] = await connection.query(
          'SELECT profile_username FROM users WHERE id = ?',
          [userId]
        );

        if (userData && userData.length > 0) {
          await connection.query(
            'INSERT INTO global_catches (user_id, profile_username, fish_name, rarity) VALUES (?, ?, ?, ?)',
            [userId, userData[0].profile_username, fish.name, rarity]
          );
        }
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

      // Grant stat points instead of relics (3 stat points per level)
      const statPointsGained = levelUpResult.levelsGained * 3;

      // Update level, XP, xp_to_next, and grant stat points
      await connection.query(
        `UPDATE player_data
         SET level = ?, xp = ?, xp_to_next = ?, stat_points = stat_points + ?
         WHERE user_id = ?`,
        [levelUpResult.newLevel, levelUpResult.newXP, xpToNext, statPointsGained, userId]
      );
      result.leveledUp = true;
      result.newLevel = levelUpResult.newLevel;
      result.levelsGained = levelUpResult.levelsGained;
      result.statPointsGained = statPointsGained;
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
      result.statPointsGained = 0;
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

    // Track quest progress (async, non-blocking)
    if (result.rarity !== 'Treasure Chest') {
      trackQuestProgress(userId, 'fish_caught', {
        rarity: result.rarity,
        biome: currentBiome,
        bait: player.equipped_bait
      }).catch(err => console.error('Quest tracking error:', err));

      trackQuestProgress(userId, 'cast_performed', {}).catch(err => console.error('Quest tracking error:', err));

      if (result.count > 1) {
        trackQuestProgress(userId, 'multi_catch', {}).catch(err => console.error('Quest tracking error:', err));
      }

      if (player.equipped_bait && player.equipped_bait !== 'Stale Bread Crust') {
        trackQuestProgress(userId, 'bait_used', { bait: player.equipped_bait }).catch(err => console.error('Quest tracking error:', err));
      }
    } else {
      trackQuestProgress(userId, 'chest_caught', {}).catch(err => console.error('Quest tracking error:', err));
    }

    if (result.xpGained > 0) {
      trackQuestProgress(userId, 'xp_gained', { amount: result.xpGained }).catch(err => console.error('Quest tracking error:', err));
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
           total_fish_sold = total_fish_sold + ?,
           total_gold_earned = total_gold_earned + ?
       WHERE user_id = ?`,
      [goldEarned, quantity, goldEarned, userId]
    );

    // Get updated gold balance
    const [updatedPlayer] = await connection.query(
      'SELECT gold FROM player_data WHERE user_id = ?',
      [userId]
    );

    // Track quest progress
    trackQuestProgress(userId, 'fish_sold', {
      rarity: rarity,
      amount: quantity
    }).catch(err => console.error('Quest tracking error:', err));

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

    // Stat upgrade now costs 1 stat point (simplified economy)
    const cost = 1;

    // Atomic update: deduct stat point and increment stat in one query
    // This prevents race conditions and ensures player has enough points
    const [updateResult] = await connection.query(
      `UPDATE player_data pd
       JOIN player_stats ps ON pd.user_id = ps.user_id
       SET pd.stat_points = pd.stat_points - ?,
           pd.stats_upgraded = pd.stats_upgraded + 1,
           ps.${stat} = ps.${stat} + 1
       WHERE pd.user_id = ?
         AND pd.stat_points >= ?`,
      [cost, userId, cost]
    );

    if (updateResult.affectedRows === 0) {
      await connection.rollback();
      return res.status(400).json({ error: 'Not enough stat points' });
    }

    // Update stat-specific counter
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
      `SELECT stat_points FROM player_data WHERE user_id = ?`,
      [userId]
    );

    const [newStats] = await connection.query(
      `SELECT ${stat} FROM player_stats WHERE user_id = ?`,
      [userId]
    );

    // Track quest progress
    trackQuestProgress(userId, 'stat_upgraded', {}).catch(err => console.error('Quest tracking error:', err));

    await connection.commit();
    res.json({
      success: true,
      stat,
      newValue: newStats[0][stat],
      costPaid: cost,
      nextCost: 1, // Always costs 1 stat point
      newStatPoints: updated[0].stat_points
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
 * POST /api/game/buy-booster
 * Purchase a temporary booster with relics
 *
 * Body: { boosterType } // "knowledge_scroll" | "ancient_tome" | "giants_potion" | "titans_elixir"
 */
router.post('/buy-booster', authenticateToken, async (req, res) => {
  const connection = await db.getConnection();

  try {
    const userId = req.user.userId;
    const { boosterType } = req.body;

    // Booster definitions
    const boosters = {
      'knowledge_scroll': { cost: 10, duration: 30, effect: 'xp_bonus', bonus: 20 },
      'ancient_tome': { cost: 20, duration: 60, effect: 'xp_bonus', bonus: 20 },
      'giants_potion': { cost: 10, duration: 30, effect: 'stat_bonus', bonus: 20 },
      'titans_elixir': { cost: 20, duration: 60, effect: 'stat_bonus', bonus: 20 }
    };

    if (!boosters[boosterType]) {
      return res.status(400).json({ error: 'Invalid booster type' });
    }

    const booster = boosters[boosterType];

    await connection.beginTransaction();

    // Check if player has enough relics
    const [playerData] = await connection.query(
      'SELECT relics FROM player_data WHERE user_id = ?',
      [userId]
    );

    if (!playerData || playerData.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Player data not found' });
    }

    if (playerData[0].relics < booster.cost) {
      await connection.rollback();
      return res.status(400).json({ error: 'Not enough relics' });
    }

    // Deduct relics
    await connection.query(
      'UPDATE player_data SET relics = relics - ? WHERE user_id = ?',
      [booster.cost, userId]
    );

    // Calculate expiration time (in UTC)
    const expiresAt = new Date(Date.now() + booster.duration * 60 * 1000);

    // Add booster
    await connection.query(
      `INSERT INTO player_boosters (user_id, booster_type, effect_type, bonus_percentage, expires_at)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, boosterType, booster.effect, booster.bonus, expiresAt]
    );

    // Get updated relics
    const [updated] = await connection.query(
      'SELECT relics FROM player_data WHERE user_id = ?',
      [userId]
    );

    await connection.commit();
    res.json({
      success: true,
      boosterType,
      duration: booster.duration,
      expiresAt: expiresAt.toISOString(),
      newRelics: updated[0].relics
    });
  } catch (error) {
    await connection.rollback();
    console.error('Buy booster error:', error);
    res.status(500).json({ error: 'Failed to purchase booster' });
  } finally {
    connection.release();
  }
});

/**
 * GET /api/game/active-boosters
 * Get all active boosters for the player
 */
router.get('/active-boosters', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get active boosters (not expired)
    const [boosters] = await db.query(
      `SELECT * FROM player_boosters
       WHERE user_id = ?
         AND expires_at > NOW()
       ORDER BY expires_at ASC`,
      [userId]
    );

    res.json({ boosters });
  } catch (error) {
    console.error('Get active boosters error:', error);
    res.status(500).json({ error: 'Failed to get active boosters' });
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

    // Track quest progress
    trackQuestProgress(userId, 'biome_visited', { biome: biomeId }).catch(err => console.error('Quest tracking error:', err));

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

    // Calculate gold multiplier
    const goldMultiplier = calculateGoldMultiplier(totalStats.intelligence);

    // Use SQL aggregation to calculate totals in a single query (prevents timeout)
    const [aggregateResult] = await connection.query(
      `SELECT
         SUM(count) as total_fish_count,
         SUM(FLOOR(base_gold * IFNULL(titan_bonus, 1) * count * ?)) as total_gold
       FROM player_inventory
       WHERE user_id = ?
         AND (is_locked IS NULL OR is_locked = FALSE)
         AND count > 0`,
      [goldMultiplier, userId]
    );

    const totalFishCount = Number(aggregateResult[0]?.total_fish_count) || 0;
    const totalGold = Number(aggregateResult[0]?.total_gold) || 0;

    if (totalFishCount === 0) {
      await connection.rollback();
      return res.json({ success: true, goldEarned: 0, fishSold: 0, newGold: 0 });
    }

    // Get rarity groups for quest tracking (aggregated in SQL)
    const [rarityGroups] = await connection.query(
      `SELECT rarity, SUM(count) as total_count
       FROM player_inventory
       WHERE user_id = ?
         AND (is_locked IS NULL OR is_locked = FALSE)
         AND count > 0
       GROUP BY rarity`,
      [userId]
    );

    // Delete all unlocked fish from inventory
    await connection.query(
      'DELETE FROM player_inventory WHERE user_id = ? AND (is_locked IS NULL OR is_locked = FALSE)',
      [userId]
    );

    // Update player gold
    await connection.query(
      `UPDATE player_data
       SET gold = gold + ?,
           total_fish_sold = total_fish_sold + ?,
           total_gold_earned = total_gold_earned + ?
       WHERE user_id = ?`,
      [totalGold, totalFishCount, totalGold, userId]
    );

    // Get updated gold balance
    const [updatedPlayer] = await connection.query(
      'SELECT gold FROM player_data WHERE user_id = ?',
      [userId]
    );

    // Track quest progress for each rarity sold
    for (const row of rarityGroups) {
      await trackQuestProgress(userId, 'fish_sold', {
        rarity: row.rarity,
        amount: Number(row.total_count) || 0
      }).catch(err => console.error('Quest tracking error:', err));
    }

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

    // Calculate gold multiplier
    const goldMultiplier = calculateGoldMultiplier(totalStats.intelligence);

    // Use SQL aggregation to calculate totals in a single query (prevents timeout)
    const [aggregateResult] = await connection.query(
      `SELECT
         SUM(count) as total_fish_count,
         SUM(FLOOR(base_gold * IFNULL(titan_bonus, 1) * count * ?)) as total_gold
       FROM player_inventory
       WHERE user_id = ?
         AND rarity = ?
         AND (is_locked IS NULL OR is_locked = FALSE)
         AND count > 0`,
      [goldMultiplier, userId, rarity]
    );

    const totalFishCount = Number(aggregateResult[0]?.total_fish_count) || 0;
    const totalGold = Number(aggregateResult[0]?.total_gold) || 0;

    if (totalFishCount === 0) {
      await connection.rollback();
      return res.json({ success: true, goldEarned: 0, fishSold: 0, newGold: 0 });
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
           total_fish_sold = total_fish_sold + ?,
           total_gold_earned = total_gold_earned + ?
       WHERE user_id = ?`,
      [totalGold, totalFishCount, totalGold, userId]
    );

    // Get updated gold balance
    const [updatedPlayer] = await connection.query(
      'SELECT gold FROM player_data WHERE user_id = ?',
      [userId]
    );

    // Track quest progress for fish sold by rarity
    trackQuestProgress(userId, 'fish_sold', {
      rarity: rarity,
      amount: totalFishCount
    }).catch(err => console.error('Quest tracking error:', err));

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

// Get recent global rare catches (for global notifications)
router.get('/global-catches', async (req, res) => {
  try {
    // Get the most recent 10 global catches (Mythic, Exotic, Arcane)
    // Only return catches from the last 5 minutes to keep it fresh
    const [catches] = await db.query(
      `SELECT profile_username, fish_name, rarity, caught_at
       FROM global_catches
       WHERE caught_at >= DATE_SUB(NOW(), INTERVAL 5 MINUTE)
       ORDER BY caught_at DESC
       LIMIT 1`,
      []
    );

    res.json({ catches });
  } catch (error) {
    console.error('Get global catches error:', error);
    res.status(500).json({ error: 'Failed to fetch global catches' });
  }
});

export default router;
