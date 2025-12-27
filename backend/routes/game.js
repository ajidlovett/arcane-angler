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
import { RODS, BAITS, getRodById, getBaitById, calculateRodUpgradeCost } from '../data/equipment.js';
import {
  getTotalStats,
  calculateRarity,
  calculateFishCount,
  calculateTitanBonus,
  calculateGoldMultiplier,
  calculateIntelligenceDuration,
  generateTreasureChest,
  calculateLevelUp,
  calculateXPForNextLevel,
  calculateStatUpgradeCost,
  selectRandomFish
} from '../utils/gameLogic.js';
import { trackQuestProgress } from '../utils/questTracking.js';
import { getBiomeWeather, getAllBiomeWeather, getWeatherXpBonus, applyWeatherToWeights } from '../utils/weatherService.js';
import { checkForCheating, applyPunishment } from '../utils/antiCheat.js';
import sseService from '../services/sseService.js';
import chatSSEService from '../services/chatSSEService.js';
import autoCastSessionService from '../services/autoCastSessionService.js';
import { getXpMultiplier } from '../utils/xpBoosterUtil.js';

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

    // Check if there's an active autocast session
    const existingSession = autoCastSessionService.activeSessions.get(userId);
    if (existingSession) {
      const timeSinceLastActivity = Date.now() - existingSession.lastActivityTime;
      if (timeSinceLastActivity < 30000) { // 30 seconds threshold
        connection.release();
        return res.status(400).json({
          error: 'An autocast session is already active. Please stop the other session first.'
        });
      }
    }

    await connection.beginTransaction();

    // Load player data (including anti-cheat tracking fields)
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

    // Anti-cheat check - detect autoclickers and multi-session abuse
    const cheatCheck = await checkForCheating(userId, player, connection);

    // If flagged for cheating, we'll override the result later
    const isPunished = cheatCheck.isViolation;

    // Load active boosters
    const [activeBoosters] = await connection.query(
      `SELECT * FROM player_boosters
       WHERE user_id = ? AND expires_at > NOW()`,
      [userId]
    );

    // Calculate booster bonuses
    let xpBonusFromBoosters = 0; // Additive bonus (0 = no bonus, will be added to 1 in formula)
    let strengthBonus = 1.0; // Multiplier for strength
    let luckBonus = 1.0; // Multiplier for luck
    let hasKnowledgeScroll = false;
    let hasAncientTome = false;
    for (const booster of activeBoosters) {
      if (booster.effect_type === 'xp_bonus') {
        xpBonusFromBoosters += booster.bonus_percentage / 100;
        // Track specific relic XP boosters
        if (booster.booster_type === 'knowledge_scroll') {
          hasKnowledgeScroll = true;
        } else if (booster.booster_type === 'ancient_tome') {
          hasAncientTome = true;
        }
      } else if (booster.effect_type === 'stat_bonus' || booster.effect_type === 'strength_bonus') {
        strengthBonus += booster.bonus_percentage / 100;
      } else if (booster.effect_type === 'luck_bonus') {
        luckBonus += booster.bonus_percentage / 100;
      }
    }

    // Apply stat bonuses to base stats
    const baseStats = {
      strength: Math.floor(player.strength * strengthBonus),
      intelligence: player.intelligence, // Intelligence not affected by stat boosters
      luck: Math.floor(player.luck * luckBonus),
      stamina: player.stamina // Stamina not affected by stat boosters
    };

    // Note: Casting does not consume stamina - it has a 6-second cooldown handled client-side

    // Parse rod_levels JSON
    let rodLevels = {};
    try {
      rodLevels = player.rod_levels ? (typeof player.rod_levels === 'string' ? JSON.parse(player.rod_levels) : player.rod_levels) : {};
    } catch (e) {
      console.error('Error parsing rod_levels:', e);
      rodLevels = {};
    }

    // Get current biome data
    const currentBiome = player.current_biome || 1;

    // Get total stats with equipment bonuses (already includes booster bonuses from baseStats)
    const totalStats = getTotalStats(
      baseStats,
      player.equipped_rod,
      player.equipped_bait,
      rodLevels,
      currentBiome
    );

    // Calculate final XP bonus: rod XP bonus only (for display in "Bonus XP" line)
    // Rod xpBonus is a percentage (e.g., 5 for 5%), convert to multiplier
    // Knowledge Scroll/Ancient Tome bonuses are applied separately in XP calculation
    const xpBonus = totalStats.xpBonus / 100;
    const biomeData = BIOMES[currentBiome];

    if (!biomeData) {
      await connection.rollback();
      return res.status(400).json({ error: 'Invalid biome' });
    }

    // Get weather-modified weights for current biome
    const baseWeights = {
      'Common': 60046,
      'Uncommon': 23000,
      'Fine': 10000,
      'Rare': 4000,
      'Relic': 2000,
      'Epic': 750,
      'Treasure Chest': 150,
      'Legendary': 40,
      'Mythic': 10,
      'Exotic': 3,
      'Arcane': 1
    };
    const weatherModifiedWeights = applyWeatherToWeights(baseWeights, currentBiome);

    // Get current weather and XP bonus
    const currentWeather = getBiomeWeather(currentBiome);
    const weatherXpBonus = getWeatherXpBonus(currentBiome) / 100; // Convert percentage to multiplier

    // Get XP booster multipliers (personal + global stack additively)
    const xpBoosterData = await getXpMultiplier(userId);
    const { totalMultiplier: xpBoosterMultiplier, personal: personalBoost, global: globalBoost, globalActivatorName, globalActivatorId } = xpBoosterData;

    // Calculate rarity based on luck, equipped bait, rod weights, and weather
    const rarity = calculateRarity(
      totalStats.luck,
      false, // isAutoCast
      player.equipped_bait,
      totalStats.relicWeight || 0,
      totalStats.treasureWeight || 0,
      weatherModifiedWeights
    );

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

    // ANTI-CHEAT: If player is flagged, override result with punishment
    if (isPunished) {
      const punishedResult = applyPunishment(biomeData, cheatCheck.activeFlag);

      // Override result with punishment
      result.rarity = punishedResult.rarity;
      result.fish = punishedResult.fish;
      result.count = punishedResult.count;
      result.xpGained = 0; // NO XP
      result.goldGained = 0;
      result.relicsGained = 0;
      result.titanBonus = 1;
      result.isPunished = true;
      result.punishmentReason = punishedResult.punishmentReason;
      result.punishmentExpiresAt = punishedResult.punishmentExpiresAt;

      // Still add fish to inventory and update stats (but with 0 XP)
      const fish = punishedResult.fish;

      // Add to inventory
      await connection.query(
        `INSERT INTO player_inventory (user_id, fish_name, rarity, count, base_gold, titan_bonus)
         VALUES (?, ?, ?, ?, ?, 1)
         ON DUPLICATE KEY UPDATE
           count = count + VALUES(count)`,
        [userId, fish.name, 'Common', 1, 10]
      );

      // Add to locked_fish
      await connection.query(
        'INSERT IGNORE INTO locked_fish (user_id, fish_name) VALUES (?, ?)',
        [userId, fish.name]
      );

      // Update player data (NO XP, but increment cast counter)
      await connection.query(
        `UPDATE player_data
         SET total_fish_caught = total_fish_caught + 1,
             total_casts = total_casts + 1,
             commons_caught = commons_caught + 1
         WHERE user_id = ?`,
        [userId]
      );

      // Skip normal reward logic - jump to level check
    } else if (rarity === 'Relic') {
      // Normal Relic drop (special case - gives 3-10 relics + XP, no fish)
      const relicsDropped = Math.floor(Math.random() * 8) + 3; // 3-10 relics

      // Calculate XP with level scaling
      const baseXP = 50; // Fixed base XP for relic drops

      // Add level-based XP bonus: (Level - 1) * random(10-20)
      const minBonus = (player.level - 1) * 10;
      const maxBonus = (player.level - 1) * 20;
      const levelBonus = minBonus + Math.random() * (maxBonus - minBonus);
      // Apply weather XP bonus (additive with other bonuses)
      // xpBonus = rod bonus, weatherXpBonus = weather bonus, xpBonusFromBoosters = Knowledge Scroll/Ancient Tome
      const totalXpMultiplier = xpBonus + weatherXpBonus + xpBonusFromBoosters;
      // Apply XP booster multiplier (from fragment shop personal/global boosters)
      const xpGained = Math.floor((baseXP + levelBonus) * (1 + totalXpMultiplier) * xpBoosterMultiplier);

      result.relicsGained = relicsDropped;
      result.xpGained = xpGained;
      result.xpBonus = xpBonus;
      result.weatherXpBonus = weatherXpBonus;
      result.personalBoost = personalBoost;
      result.globalBoost = globalBoost;
      result.globalActivatorName = globalActivatorName;
      result.globalActivatorId = globalActivatorId;
      result.hasKnowledgeScroll = hasKnowledgeScroll;
      result.hasAncientTome = hasAncientTome;

      // Update player stats
      await connection.query(
        `UPDATE player_data
         SET relics = relics + ?,
             xp = xp + ?,
             total_relics_earned = total_relics_earned + ?,
             total_casts = total_casts + 1
         WHERE user_id = ?`,
        [relicsDropped, xpGained, relicsDropped, userId]
      );

      // Note: Stamina is not consumed for casting (6-second cooldown instead)
    } else if (rarity === 'Treasure Chest') {
      const rewards = generateTreasureChest(currentBiome, totalStats.luck, biomeData);

      // Calculate XP with level scaling
      const baseXP = 100; // Fixed XP for treasure chests

      // Add level-based XP bonus: (Level - 1) * random(10-20)
      const minBonus = (player.level - 1) * 10;
      const maxBonus = (player.level - 1) * 20;
      const levelBonus = minBonus + Math.random() * (maxBonus - minBonus);
      // Apply weather XP bonus (additive with other bonuses)
      // xpBonus = rod bonus, weatherXpBonus = weather bonus, xpBonusFromBoosters = Knowledge Scroll/Ancient Tome
      const totalXpMultiplier = xpBonus + weatherXpBonus + xpBonusFromBoosters;
      // Apply XP booster multiplier (from fragment shop personal/global boosters)
      const xpGained = Math.floor((baseXP + levelBonus) * (1 + totalXpMultiplier) * xpBoosterMultiplier);

      result.treasureChest = rewards;
      result.goldGained = rewards.gold;
      result.relicsGained = rewards.relics;
      result.xpGained = xpGained;
      result.xpBonus = xpBonus;
      result.weatherXpBonus = weatherXpBonus;
      result.personalBoost = personalBoost;
      result.globalBoost = globalBoost;
      result.globalActivatorName = globalActivatorName;
      result.globalActivatorId = globalActivatorId;
      result.hasKnowledgeScroll = hasKnowledgeScroll;
      result.hasAncientTome = hasAncientTome;

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

      // Note: Stamina is not consumed for casting (6-second cooldown instead)
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

      // Calculate XP with level scaling
      const baseXP = fish.xp * count;

      // Add level-based XP bonus: (Level - 1) * random(10-20)
      // Level 2: +10-20 XP, Level 3: +20-40 XP, Level 4: +30-60 XP, etc.
      const minBonus = (player.level - 1) * 10;
      const maxBonus = (player.level - 1) * 20;
      const levelBonus = minBonus + Math.random() * (maxBonus - minBonus);
      // Apply weather XP bonus (additive with other bonuses)
      // xpBonus = rod bonus, weatherXpBonus = weather bonus, xpBonusFromBoosters = Knowledge Scroll/Ancient Tome
      const totalXpMultiplier = xpBonus + weatherXpBonus + xpBonusFromBoosters;
      // Apply XP booster multiplier (from fragment shop personal/global boosters)
      const xpGained = Math.floor((baseXP + levelBonus) * (1 + totalXpMultiplier) * xpBoosterMultiplier);

      // Calculate Gold Breeze bonus (50-150 gold per cast)
      let goldBreezeBonus = 0;
      if (currentWeather.weather === 'gold_breeze') {
        goldBreezeBonus = Math.floor(Math.random() * 101) + 50; // 50-150 gold
      }

      result.fish = {
        name: fish.name,
        desc: fish.desc || fish.description || ''
      };
      result.count = count;
      result.xpGained = xpGained;
      result.goldGained = goldBreezeBonus;
      result.titanBonus = titanBonus;
      result.xpBonus = xpBonus;
      result.weatherXpBonus = weatherXpBonus;
      result.personalBoost = personalBoost;
      result.globalBoost = globalBoost;
      result.globalActivatorName = globalActivatorName;
      result.globalActivatorId = globalActivatorId;
      result.hasKnowledgeScroll = hasKnowledgeScroll;
      result.hasAncientTome = hasAncientTome;

      // Add to inventory (or update if exists)
      await connection.query(
        `INSERT INTO player_inventory (user_id, fish_name, rarity, count, base_gold, titan_bonus)
         VALUES (?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           count = count + VALUES(count),
           base_gold = VALUES(base_gold)`,
        [userId, fish.name, rarity, count, fish.gold, titanBonus]
      );

      // Add to locked_fish (discovered fish) - ignore duplicates
      await connection.query(
        'INSERT IGNORE INTO locked_fish (user_id, fish_name) VALUES (?, ?)',
        [userId, fish.name]
      );

      // Update fishpedia_stats (persistent catch tracking for Fishpedia)
      await connection.query(
        `INSERT INTO fishpedia_stats (user_id, fish_name, rarity, total_caught, first_caught_at, last_caught_at)
         VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
         ON DUPLICATE KEY UPDATE
           total_caught = total_caught + ?,
           last_caught_at = CURRENT_TIMESTAMP`,
        [userId, fish.name, rarity, count, count]
      );

      // Update player data (XP, fish count, and gold if Gold Breeze)
      if (goldBreezeBonus > 0) {
        await connection.query(
          `UPDATE player_data
           SET xp = xp + ?,
               gold = gold + ?,
               total_fish_caught = total_fish_caught + ?,
               total_gold_earned = total_gold_earned + ?,
               total_casts = total_casts + 1
           WHERE user_id = ?`,
          [xpGained, goldBreezeBonus, count, goldBreezeBonus, userId]
        );
      } else {
        await connection.query(
          `UPDATE player_data
           SET xp = xp + ?,
               total_fish_caught = total_fish_caught + ?,
               total_casts = total_casts + 1
           WHERE user_id = ?`,
          [xpGained, count, userId]
        );
      }

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

          // Broadcast via SSE to all connected clients
          sseService.broadcastGlobalCatch({
            user_id: userId,
            profile_username: userData[0].profile_username,
            fish_name: fish.name,
            rarity: rarity,
            caught_at: new Date().toISOString()
          });

          // Also add to chat notification channel
          const notificationMessage = `🎣 ${userData[0].profile_username} caught a ${rarity} ${fish.name}!`;
          const [chatResult] = await connection.query(
            `INSERT INTO chat_messages (user_id, profile_username, equipped_title, channel, message_text)
             VALUES (NULL, 'Global Catch', NULL, 'notification', ?)`,
            [notificationMessage]
          );

          // Get the inserted message and broadcast via chat SSE
          const [insertedMessage] = await connection.query(
            'SELECT * FROM chat_messages WHERE id = ?',
            [chatResult.insertId]
          );

          if (insertedMessage && insertedMessage.length > 0) {
            chatSSEService.broadcastMessage('notification', {
              id: insertedMessage[0].id,
              user_id: insertedMessage[0].user_id,
              profile_username: insertedMessage[0].profile_username,
              equipped_title: insertedMessage[0].equipped_title,
              channel: insertedMessage[0].channel,
              message_text: insertedMessage[0].message_text,
              created_at: insertedMessage[0].created_at,
              type: 'global_catch',
              rarity: rarity
            });
          }
        }
      }

      // Note: Stamina is not consumed for casting (6-second cooldown instead)
    }

    // Consume bait (if equipped and not the free starter bait)
    if (player.equipped_bait && player.equipped_bait !== 'bait_default') {
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
            ['bait_default', userId]
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

      // Grant stat points instead of relics (2 stat points per level)
      const statPointsGained = levelUpResult.levelsGained * 2;

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
    if (finalData[0].equipped_bait && finalData[0].equipped_bait !== 'bait_default') {
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
        bait: player.equipped_bait,
        count: result.count || 1
      }).catch(err => console.error('Quest tracking error:', err));

      trackQuestProgress(userId, 'cast_performed', {}).catch(err => console.error('Quest tracking error:', err));

      if (result.count > 1) {
        trackQuestProgress(userId, 'multi_catch', {}).catch(err => console.error('Quest tracking error:', err));
      }

      if (player.equipped_bait && player.equipped_bait !== 'bait_default') {
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
 * POST /api/game/auto-cast/start
 * Start an autocast session (prevent multi-instance abuse)
 */
router.post('/auto-cast/start', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const result = autoCastSessionService.startSession(userId);

    if (!result.success) {
      return res.status(409).json({ error: result.error });
    }

    res.json({ success: true, sessionId: result.sessionId });
  } catch (error) {
    console.error('Auto-cast start error:', error);
    res.status(500).json({ error: 'Failed to start autocast session' });
  }
});

/**
 * POST /api/game/auto-cast/stop
 * Stop an autocast session
 */
router.post('/auto-cast/stop', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID required' });
    }

    const result = autoCastSessionService.endSession(userId, sessionId);

    res.json({ success: result });
  } catch (error) {
    console.error('Auto-cast stop error:', error);
    res.status(500).json({ error: 'Failed to stop autocast session' });
  }
});

/**
 * POST /api/game/auto-cast
 * Automated fishing cast (stamina capacity-based)
 *
 * Stamina (STA) - "The Sleep Battery"
 * - Stamina is BATCH CAPACITY, not consumed per cast
 * - Frontend manages local stamina counter (current/max)
 * - Fixed 12-second cooldown (handled client-side)
 * - Yields 1 fish with 50% STR benefit
 * - Caps at Epic rarity (no Legendary/Chest/Arcane)
 */
router.post('/auto-cast', authenticateToken, async (req, res) => {
  const connection = await db.getConnection();

  try {
    const userId = req.user.userId;
    const { sessionId } = req.body;

    // Validate autocast session (prevent multi-instance abuse)
    if (!sessionId) {
      connection.release();
      return res.status(400).json({ error: 'Session ID required' });
    }

    if (!autoCastSessionService.validateSession(userId, sessionId)) {
      connection.release();
      return res.status(403).json({ error: 'Invalid or expired autocast session. Please restart autocast.' });
    }

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

    // Skip anti-cheat for auto-cast - it's a legitimate game feature with built-in timing (12s cooldown)
    // Auto-cast is designed to be consistent, so it would trigger false positives
    const isPunished = false;

    // Note: Stamina is NOT consumed - it represents batch capacity for auto-cast
    // The frontend manages the local stamina counter for UX

    // Load active boosters
    const [activeBoosters] = await connection.query(
      `SELECT * FROM player_boosters
       WHERE user_id = ? AND expires_at > NOW()`,
      [userId]
    );

    // Calculate booster bonuses
    let xpBonusFromBoosters = 0; // Additive bonus (0 = no bonus, will be added to 1 in formula)
    let strengthBonus = 1.0; // Multiplier for strength
    let luckBonus = 1.0; // Multiplier for luck
    let hasKnowledgeScroll = false;
    let hasAncientTome = false;
    for (const booster of activeBoosters) {
      if (booster.effect_type === 'xp_bonus') {
        xpBonusFromBoosters += booster.bonus_percentage / 100;
        // Track specific relic XP boosters
        if (booster.booster_type === 'knowledge_scroll') {
          hasKnowledgeScroll = true;
        } else if (booster.booster_type === 'ancient_tome') {
          hasAncientTome = true;
        }
      } else if (booster.effect_type === 'stat_bonus' || booster.effect_type === 'strength_bonus') {
        strengthBonus += booster.bonus_percentage / 100;
      } else if (booster.effect_type === 'luck_bonus') {
        luckBonus += booster.bonus_percentage / 100;
      }
    }

    // Apply stat bonuses to base stats
    const baseStats = {
      strength: Math.floor(player.strength * strengthBonus),
      intelligence: player.intelligence,
      luck: Math.floor(player.luck * luckBonus),
      stamina: player.stamina
    };

    // Parse rod_levels JSON
    let rodLevels = {};
    try {
      rodLevels = player.rod_levels ? (typeof player.rod_levels === 'string' ? JSON.parse(player.rod_levels) : player.rod_levels) : {};
    } catch (e) {
      console.error('Error parsing rod_levels:', e);
      rodLevels = {};
    }

    // Get current biome data
    const currentBiome = player.current_biome || 1;

    // Get total stats with equipment bonuses
    const totalStats = getTotalStats(
      baseStats,
      player.equipped_rod,
      player.equipped_bait,
      rodLevels,
      currentBiome
    );

    // Calculate final XP bonus: rod XP bonus only (for display in "Bonus XP" line)
    // Rod xpBonus is a percentage (e.g., 5 for 5%), convert to multiplier
    // Knowledge Scroll/Ancient Tome bonuses are applied separately in XP calculation
    const xpBonus = totalStats.xpBonus / 100;
    const biomeData = BIOMES[currentBiome];

    if (!biomeData) {
      await connection.rollback();
      return res.status(400).json({ error: 'Invalid biome' });
    }

    // Get weather-modified weights for current biome
    const baseWeights = {
      'Common': 60046,
      'Uncommon': 23000,
      'Fine': 10000,
      'Rare': 4000,
      'Relic': 2000,
      'Epic': 750,
      'Treasure Chest': 150,
      'Legendary': 40,
      'Mythic': 10,
      'Exotic': 3,
      'Arcane': 1
    };
    const weatherModifiedWeights = applyWeatherToWeights(baseWeights, currentBiome);

    // Get current weather and XP bonus
    const currentWeather = getBiomeWeather(currentBiome);
    const weatherXpBonus = getWeatherXpBonus(currentBiome) / 100; // Convert percentage to multiplier

    // Get XP booster multipliers (personal + global stack additively)
    const xpBoosterData = await getXpMultiplier(userId);
    const { totalMultiplier: xpBoosterMultiplier, personal: personalBoost, global: globalBoost, globalActivatorName, globalActivatorId } = xpBoosterData;

    // Calculate rarity with auto-cast flag (caps at Epic) and weather effects
    const rarity = calculateRarity(
      totalStats.luck,
      true, // isAutoCast
      player.equipped_bait,
      totalStats.relicWeight || 0,
      totalStats.treasureWeight || 0,
      weatherModifiedWeights
    );

    // Select random fish
    const fish = selectRandomFish(biomeData, rarity);

    if (!fish) {
      await connection.rollback();
      return res.status(500).json({ error: 'Failed to select fish' });
    }

    // Auto-cast yields fish count with 50% STR benefit
    const count = calculateFishCount(rarity, totalStats.strength, true);

    // Calculate XP (no critical catch for auto-cast)
    const baseXP = fish.xp * count;
    // Add level-based XP bonus: (Level - 1) * random(10-20)
    const minBonus = (player.level - 1) * 10;
    const maxBonus = (player.level - 1) * 20;
    const levelBonus = minBonus + Math.random() * (maxBonus - minBonus);
    // Apply weather XP bonus (additive with other bonuses)
    // xpBonus = rod bonus, weatherXpBonus = weather bonus, xpBonusFromBoosters = Knowledge Scroll/Ancient Tome
    const totalXpMultiplier = xpBonus + weatherXpBonus + xpBonusFromBoosters;
    // Auto-cast gets 50% XP (reduced by 50%), then apply XP booster multiplier
    const xpGained = Math.floor((baseXP + levelBonus) * (1 + totalXpMultiplier) * 0.5 * xpBoosterMultiplier);

    const result = {
      rarity,
      fish: {
        name: fish.name,
        desc: fish.desc || fish.description || ''
      },
      count,
      xpGained,
      goldGained: 0,
      titanBonus: 1,
      xpBonus,
      weatherXpBonus,
      personalBoost,
      globalBoost,
      globalActivatorName,
      globalActivatorId,
      hasKnowledgeScroll,
      hasAncientTome,
      isAutoCast: true
    };

    // Add to inventory
    await connection.query(
      `INSERT INTO player_inventory (user_id, fish_name, rarity, count, base_gold, titan_bonus)
       VALUES (?, ?, ?, ?, ?, 1)
       ON DUPLICATE KEY UPDATE
         count = count + VALUES(count),
         base_gold = VALUES(base_gold)`,
      [userId, fish.name, rarity, count, fish.gold]
    );

    // Add to locked_fish
    await connection.query(
      'INSERT IGNORE INTO locked_fish (user_id, fish_name) VALUES (?, ?)',
      [userId, fish.name]
    );

    // Update fishpedia_stats
    await connection.query(
      `INSERT INTO fishpedia_stats (user_id, fish_name, rarity, total_caught, first_caught_at, last_caught_at)
       VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       ON DUPLICATE KEY UPDATE
         total_caught = total_caught + ?,
         last_caught_at = CURRENT_TIMESTAMP`,
      [userId, fish.name, rarity, count, count]
    );

    // Update player data (stamina is NOT consumed - it's batch capacity, not a resource)
    await connection.query(
      `UPDATE player_data
       SET xp = xp + ?,
           total_fish_caught = total_fish_caught + ?,
           total_casts = total_casts + 1
       WHERE user_id = ?`,
      [xpGained, count, userId]
    );

    // Update rarity-specific counters
    const rarityColumn = {
      'Common': 'commons_caught',
      'Uncommon': 'uncommons_caught',
      'Fine': 'fines_caught',
      'Rare': 'rares_caught',
      'Epic': 'epics_caught'
    };

    if (rarityColumn[rarity]) {
      await connection.query(
        `UPDATE player_data SET ${rarityColumn[rarity]} = ${rarityColumn[rarity]} + ? WHERE user_id = ?`,
        [count, userId]
      );
    }

    // Consume bait (if equipped and not free)
    if (player.equipped_bait && player.equipped_bait !== 'bait_default') {
      const [baitInventory] = await connection.query(
        'SELECT quantity FROM bait_inventory WHERE user_id = ? AND bait_name = ?',
        [userId, player.equipped_bait]
      );

      if (baitInventory && baitInventory.length > 0) {
        const currentQuantity = baitInventory[0].quantity;

        if (currentQuantity > 1) {
          await connection.query(
            'UPDATE bait_inventory SET quantity = quantity - 1 WHERE user_id = ? AND bait_name = ?',
            [userId, player.equipped_bait]
          );
        } else {
          await connection.query(
            'DELETE FROM bait_inventory WHERE user_id = ? AND bait_name = ?',
            [userId, player.equipped_bait]
          );
          await connection.query(
            'UPDATE player_data SET equipped_bait = ? WHERE user_id = ?',
            ['bait_default', userId]
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
      0
    );

    if (levelUpResult.leveledUp) {
      const xpToNext = calculateXPForNextLevel(levelUpResult.newLevel);
      const statPointsGained = levelUpResult.levelsGained * 2;

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

    // Get updated balances
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

    // Get updated bait quantity
    if (finalData[0].equipped_bait && finalData[0].equipped_bait !== 'bait_default') {
      const [baitQty] = await connection.query(
        'SELECT quantity FROM bait_inventory WHERE user_id = ? AND bait_name = ?',
        [userId, finalData[0].equipped_bait]
      );
      result.baitQuantity = baitQty && baitQty.length > 0 ? baitQty[0].quantity : 0;
    } else {
      result.baitQuantity = 999999;
    }

    // Track quest progress (async)
    trackQuestProgress(userId, 'fish_caught', {
      rarity: result.rarity,
      biome: currentBiome,
      bait: player.equipped_bait,
      count: 1
    }).catch(err => console.error('Quest tracking error:', err));

    trackQuestProgress(userId, 'cast_performed', {}).catch(err => console.error('Quest tracking error:', err));

    if (result.xpGained > 0) {
      trackQuestProgress(userId, 'xp_gained', { amount: result.xpGained }).catch(err => console.error('Quest tracking error:', err));
    }

    await connection.commit();
    res.json({ success: true, result });
  } catch (error) {
    await connection.rollback();
    console.error('Auto-cast fishing error:', error);
    res.status(500).json({ error: 'Failed to process auto-cast' });
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
    const { fishName, rarity, quantity, titanBonus } = req.body;

    // Validate input
    if (!fishName || !rarity || !quantity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (typeof quantity !== 'number' || quantity <= 0 || !Number.isInteger(quantity)) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }

    await connection.beginTransaction();

    // Check if player owns the fish (include titan_bonus to target specific entry)
    const titanBonusValue = titanBonus || 1;
    const [inventory] = await connection.query(
      'SELECT count, base_gold, titan_bonus, COALESCE(is_locked, FALSE) as is_locked FROM player_inventory WHERE user_id = ? AND fish_name = ? AND rarity = ? AND titan_bonus = ?',
      [userId, fishName, rarity, titanBonusValue]
    );

    if (!inventory || inventory.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Fish not found in inventory' });
    }

    // Check if fish is locked
    if (inventory[0].is_locked) {
      await connection.rollback();
      return res.status(400).json({ error: 'Cannot sell locked fish' });
    }

    const ownedCount = inventory[0].count;
    const baseGold = inventory[0].base_gold;
    const dbTitanBonus = inventory[0].titan_bonus || 1;

    if (ownedCount < quantity) {
      await connection.rollback();
      return res.status(400).json({ error: 'Not enough fish to sell' });
    }

    // Calculate gold value (base gold × titan bonus × quantity)
    // Note: INT no longer provides gold multiplier
    const goldEarned = Math.floor(baseGold * dbTitanBonus * quantity);

    // Update inventory (remove sold fish)
    const newCount = ownedCount - quantity;
    if (newCount === 0) {
      // Remove from inventory if sold all
      await connection.query(
        'DELETE FROM player_inventory WHERE user_id = ? AND fish_name = ? AND rarity = ? AND titan_bonus = ?',
        [userId, fishName, rarity, titanBonusValue]
      );

      // Remove from fish showcase if it's there
      const [userShowcase] = await connection.query(
        'SELECT fish_showcase FROM users WHERE id = ?',
        [userId]
      );

      if (userShowcase.length > 0 && userShowcase[0].fish_showcase) {
        let showcase = [];

        // Parse fish_showcase (handle both MySQL auto-parsed and string formats)
        if (Array.isArray(userShowcase[0].fish_showcase)) {
          showcase = userShowcase[0].fish_showcase;
        } else if (typeof userShowcase[0].fish_showcase === 'string') {
          try {
            showcase = JSON.parse(userShowcase[0].fish_showcase);
          } catch (e) {
            console.error('Failed to parse fish_showcase:', e);
            showcase = [];
          }
        }

        // Remove the sold fish from showcase
        const updatedShowcase = showcase.filter(
          f => !(f.name === fishName && f.rarity === rarity)
        );

        // Update the showcase if it changed
        if (updatedShowcase.length !== showcase.length) {
          await connection.query(
            'UPDATE users SET fish_showcase = ? WHERE id = ?',
            [JSON.stringify(updatedShowcase), userId]
          );
        }
      }
    } else {
      // Decrease count
      await connection.query(
        'UPDATE player_inventory SET count = ? WHERE user_id = ? AND fish_name = ? AND rarity = ? AND titan_bonus = ?',
        [newCount, userId, fishName, rarity, titanBonusValue]
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
 * Body: { rodName } - Should be rodId now
 */
router.post('/buy-rod', authenticateToken, async (req, res) => {
  const connection = await db.getConnection();

  try {
    const userId = req.user.userId;
    const { rodName } = req.body; // Actually rodId in new system

    // Validate input
    if (!rodName) {
      return res.status(400).json({ error: 'Rod ID is required' });
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

    // Get player data including rod_levels
    const [playerData] = await connection.query(
      'SELECT gold, rod_levels FROM player_data WHERE user_id = ?',
      [userId]
    );

    if (!playerData || playerData.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Player data not found' });
    }

    const currentGold = playerData[0].gold;
    const rodCost = rod.base_cost || 0; // Use base_cost, not price

    if (currentGold < rodCost) {
      await connection.rollback();
      return res.status(400).json({ error: 'Not enough gold' });
    }

    // Parse rod_levels and add new rod at level 1
    let rodLevels = {};
    try {
      rodLevels = playerData[0].rod_levels ? (typeof playerData[0].rod_levels === 'string' ? JSON.parse(playerData[0].rod_levels) : playerData[0].rod_levels) : {};
    } catch (e) {
      console.error('Error parsing rod_levels:', e);
      rodLevels = {};
    }

    // Initialize new rod at level 1
    rodLevels[rodName] = 1;

    // Deduct gold and update rod_levels
    await connection.query(
      'UPDATE player_data SET gold = gold - ?, rod_levels = ? WHERE user_id = ?',
      [rodCost, JSON.stringify(rodLevels), userId]
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
 * POST /api/game/upgrade-rod
 * Upgrade a rod to the next level
 *
 * Body: { rodId }
 */
router.post('/upgrade-rod', authenticateToken, async (req, res) => {
  const connection = await db.getConnection();

  try {
    const userId = req.user.userId;
    const { rodId } = req.body;

    // Validate input
    if (!rodId) {
      return res.status(400).json({ error: 'Rod ID is required' });
    }

    // Check if rod exists
    const rod = RODS[rodId];
    if (!rod) {
      return res.status(404).json({ error: 'Rod not found' });
    }

    // Check if rod can be upgraded (max_level > 0)
    if (rod.max_level === 0) {
      return res.status(400).json({ error: 'This rod cannot be upgraded' });
    }

    await connection.beginTransaction();

    // Check if player owns the rod
    const [owned] = await connection.query(
      'SELECT rod_name FROM owned_rods WHERE user_id = ? AND rod_name = ?',
      [userId, rodId]
    );

    if (!owned || owned.length === 0) {
      await connection.rollback();
      return res.status(400).json({ error: 'You do not own this rod' });
    }

    // Get current rod levels
    const [playerData] = await connection.query(
      'SELECT rod_levels, gold FROM player_data WHERE user_id = ?',
      [userId]
    );

    if (!playerData || playerData.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Player data not found' });
    }

    // Parse rod_levels JSON
    let rodLevels = {};
    try {
      rodLevels = playerData[0].rod_levels ? JSON.parse(JSON.stringify(playerData[0].rod_levels)) : {};
    } catch (e) {
      console.error('Error parsing rod_levels:', e);
      rodLevels = {};
    }

    const currentLevel = rodLevels[rodId] || 1;

    // Check if rod is already at max level
    if (currentLevel >= rod.max_level) {
      await connection.rollback();
      return res.status(400).json({ error: 'Rod is already at max level' });
    }

    // Calculate upgrade cost
    const upgradeCost = Math.floor(rod.base_cost * Math.pow(rod.cost_multiplier, currentLevel));

    // Check if player has enough gold
    const currentGold = playerData[0].gold;
    if (currentGold < upgradeCost) {
      await connection.rollback();
      return res.status(400).json({ error: 'Not enough gold' });
    }

    // Deduct gold and update rod level
    rodLevels[rodId] = currentLevel + 1;

    await connection.query(
      'UPDATE player_data SET gold = gold - ?, rod_levels = ? WHERE user_id = ?',
      [upgradeCost, JSON.stringify(rodLevels), userId]
    );

    // Get updated gold balance
    const [updated] = await connection.query(
      'SELECT gold FROM player_data WHERE user_id = ?',
      [userId]
    );

    await connection.commit();
    res.json({
      success: true,
      rodId,
      newLevel: currentLevel + 1,
      newGold: updated[0].gold,
      upgradeCost
    });
  } catch (error) {
    await connection.rollback();
    console.error('Upgrade rod error:', error);
    res.status(500).json({ error: 'Failed to upgrade rod' });
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
    const { stat, amount } = req.body;

    // Validate input
    const validStats = ['strength', 'intelligence', 'luck', 'stamina'];
    if (!stat || !validStats.includes(stat)) {
      return res.status(400).json({ error: 'Invalid stat name' });
    }

    // Validate amount (default to 1 if not provided, for backward compatibility)
    const upgradeAmount = amount && Number.isInteger(amount) && amount > 0 ? amount : 1;
    if (upgradeAmount > 10000) {
      return res.status(400).json({ error: 'Cannot upgrade more than 10,000 points at once' });
    }

    await connection.beginTransaction();

    // Stat upgrade costs 1 stat point per upgrade
    const cost = upgradeAmount;

    // Atomic update: deduct stat points and increment stat in one query
    // This prevents race conditions and ensures player has enough points
    const [updateResult] = await connection.query(
      `UPDATE player_data pd
       JOIN player_stats ps ON pd.user_id = ps.user_id
       SET pd.stat_points = pd.stat_points - ?,
           pd.stats_upgraded = pd.stats_upgraded + ?,
           ps.${stat} = ps.${stat} + ?
       WHERE pd.user_id = ?
         AND pd.stat_points >= ?`,
      [cost, upgradeAmount, upgradeAmount, userId, cost]
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
      `UPDATE player_data SET ${statUpgradedColumn} = ${statUpgradedColumn} + ? WHERE user_id = ?`,
      [upgradeAmount, userId]
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

    // Track quest progress (track each upgrade individually for quests)
    for (let i = 0; i < upgradeAmount; i++) {
      trackQuestProgress(userId, 'stat_upgraded', {}).catch(err => console.error('Quest tracking error:', err));
    }

    await connection.commit();
    res.json({
      success: true,
      stat,
      newValue: newStats[0][stat],
      costPaid: cost,
      amountUpgraded: upgradeAmount,
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
 * POST /api/game/reset-stats
 * Reset all stats to 0 and refund all spent stat points
 * Cost: 100 relics
 */
router.post('/reset-stats', authenticateToken, async (req, res) => {
  const connection = await db.getConnection();

  try {
    const userId = req.user.userId;
    const RESET_COST = 100;

    await connection.beginTransaction();

    // Get current stats and player data
    const [playerData] = await connection.query(
      'SELECT stat_points, relics FROM player_data WHERE user_id = ?',
      [userId]
    );

    if (!playerData || playerData.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Player data not found' });
    }

    const player = playerData[0];

    // Check if player has enough relics
    if (player.relics < RESET_COST) {
      await connection.rollback();
      return res.status(400).json({ error: `You need ${RESET_COST} relics to reset stats` });
    }

    // Get current stats
    const [currentStats] = await connection.query(
      'SELECT strength, intelligence, luck, stamina FROM player_stats WHERE user_id = ?',
      [userId]
    );

    if (!currentStats || currentStats.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Player stats not found' });
    }

    const stats = currentStats[0];

    // Calculate total spent stat points (each stat starts at 0)
    const spentPoints = stats.strength + stats.intelligence + stats.luck + stats.stamina;

    // Reset all stats to 0
    await connection.query(
      'UPDATE player_stats SET strength = 0, intelligence = 0, luck = 0, stamina = 0 WHERE user_id = ?',
      [userId]
    );

    // Refund stat points and deduct relics
    await connection.query(
      'UPDATE player_data SET stat_points = stat_points + ?, relics = relics - ? WHERE user_id = ?',
      [spentPoints, RESET_COST, userId]
    );

    // Get updated values
    const [updated] = await connection.query(
      'SELECT stat_points, relics FROM player_data WHERE user_id = ?',
      [userId]
    );

    await connection.commit();
    res.json({
      success: true,
      stats: { strength: 0, intelligence: 0, luck: 0, stamina: 0 },
      statPoints: updated[0].stat_points,
      relics: updated[0].relics,
      refundedPoints: spentPoints
    });
  } catch (error) {
    await connection.rollback();
    console.error('Reset stats error:', error);
    res.status(500).json({ error: 'Failed to reset stats' });
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
      'giants_potion': { cost: 25, duration: 30, effect: 'strength_bonus', bonus: 10 },
      'titans_elixir': { cost: 50, duration: 60, effect: 'strength_bonus', bonus: 10 },
      'fortune_charm': { cost: 25, duration: 30, effect: 'luck_bonus', bonus: 10 },
      'fate_elixir': { cost: 50, duration: 60, effect: 'luck_bonus', bonus: 10 }
    };

    if (!boosters[boosterType]) {
      return res.status(400).json({ error: 'Invalid booster type' });
    }

    const booster = boosters[boosterType];

    await connection.beginTransaction();

    // Category-based stacking check: boosters of the same category cannot stack
    // XP Category: knowledge_scroll, ancient_tome (xp_bonus)
    // STR Category: giants_potion, titans_elixir (strength_bonus)
    // LUCK Category: fortune_charm, fate_elixir (luck_bonus)
    const [activeBoosters] = await connection.query(
      `SELECT booster_type, effect_type FROM player_boosters
       WHERE user_id = ? AND expires_at > NOW()`,
      [userId]
    );

    // Check if there's already an active booster in the same category
    for (const activeBooster of activeBoosters) {
      if (activeBooster.effect_type === booster.effect) {
        await connection.rollback();
        const categoryName = booster.effect === 'xp_bonus' ? 'XP Booster' :
                            booster.effect === 'strength_bonus' ? 'Strength Booster' :
                            'Luck Booster';
        return res.status(400).json({ error: `${categoryName} already active` });
      }
    }

    // Get player data and stats for Intelligence bonus calculation
    const [playerData] = await connection.query(
      `SELECT pd.relics, pd.equipped_rod, pd.equipped_bait, pd.rod_levels, pd.current_biome, ps.intelligence
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

    if (player.relics < booster.cost) {
      await connection.rollback();
      return res.status(400).json({ error: 'Not enough relics' });
    }

    // Parse rod_levels JSON
    let rodLevels = {};
    try {
      rodLevels = player.rod_levels ? (typeof player.rod_levels === 'string' ? JSON.parse(player.rod_levels) : player.rod_levels) : {};
    } catch (e) {
      console.error('Error parsing rod_levels:', e);
      rodLevels = {};
    }

    const currentBiome = player.current_biome || 1;

    // Calculate total Intelligence (base + equipment bonuses)
    const totalStats = getTotalStats(
      {
        strength: 0,
        intelligence: player.intelligence,
        luck: 0,
        stamina: 0
      },
      player.equipped_rod,
      player.equipped_bait,
      rodLevels,
      currentBiome
    );

    // Calculate booster duration with Intelligence bonus
    const baseDurationSeconds = booster.duration * 60; // Convert minutes to seconds
    const extendedDurationSeconds = calculateIntelligenceDuration(totalStats.intelligence, baseDurationSeconds);

    // Deduct relics
    await connection.query(
      'UPDATE player_data SET relics = relics - ? WHERE user_id = ?',
      [booster.cost, userId]
    );

    // Calculate expiration time with INT bonus (in UTC)
    const expiresAt = new Date(Date.now() + extendedDurationSeconds * 1000);

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
      baseDuration: booster.duration,
      extendedDuration: Math.floor(extendedDurationSeconds / 60),
      intelligenceBonus: Math.floor((extendedDurationSeconds - baseDurationSeconds) / 60),
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

    // Get active relic-based boosters (not expired)
    const [boosters] = await db.query(
      `SELECT * FROM player_boosters
       WHERE user_id = ?
         AND expires_at > NOW()
       ORDER BY expires_at ASC`,
      [userId]
    );

    // Get Fragment Shop XP boosters (personal and global)
    const xpMultipliers = await getXpMultiplier(userId);

    // Add personal XP booster if active
    if (xpMultipliers.personal > 0) {
      // Get the actual expiration time from player_data
      const [playerData] = await db.query(
        `SELECT active_xp_booster_personal FROM player_data WHERE user_id = ?`,
        [userId]
      );

      if (playerData.length > 0 && playerData[0].active_xp_booster_personal) {
        try {
          // Handle both string and object (MySQL2 might auto-parse JSON columns)
          let personalBooster;
          if (typeof playerData[0].active_xp_booster_personal === 'string') {
            personalBooster = JSON.parse(playerData[0].active_xp_booster_personal);
          } else {
            personalBooster = playerData[0].active_xp_booster_personal;
          }

          boosters.push({
            booster_type: 'xp_booster_personal',
            effect_type: 'xp_bonus',
            bonus_percentage: xpMultipliers.personal * 100,
            expires_at: personalBooster.expires_at,
            source: 'fragment_shop'
          });
        } catch (error) {
          console.error('Error parsing personal booster:', error);
        }
      }
    }

    // Add global XP booster if active
    if (xpMultipliers.global > 0) {
      // Get the actual expiration time from global_xp_booster_queue
      const [globalBooster] = await db.query(
        `SELECT expires_at, activated_by_user_id FROM global_xp_booster_queue
         WHERE status = 'active' AND expires_at > NOW()
         LIMIT 1`
      );

      if (globalBooster.length > 0) {
        boosters.push({
          booster_type: 'xp_booster_global',
          effect_type: 'xp_bonus',
          bonus_percentage: xpMultipliers.global * 100,
          expires_at: globalBooster[0].expires_at,
          source: 'fragment_shop',
          activator_name: xpMultipliers.globalActivatorName,
          activator_id: xpMultipliers.globalActivatorId
        });
      }
    }

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

    // Check if previous biome is unlocked (enforce sequential unlocking)
    // Biome 1 is always unlocked by default, so we only check for biomeId > 1
    if (biomeId > 1 && !unlockedBiomes.includes(biomeId - 1)) {
      await connection.rollback();
      return res.status(400).json({
        error: `You must unlock Biome ${biomeId - 1} first`
      });
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

    // Get player's unlocked biomes and current equipment
    const [playerData] = await db.query(
      'SELECT unlocked_biomes, current_biome, equipped_rod, equipped_bait FROM player_data WHERE user_id = ?',
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

    const currentBiome = playerData[0].current_biome;
    let equippedRod = playerData[0].equipped_rod;
    let equippedBait = playerData[0].equipped_bait;

    // Check if equipped rod is from the current biome and switch to default if so
    if (equippedRod && equippedRod === `rod_biome_${currentBiome}`) {
      equippedRod = 'rod_default';
    }

    // Check if equipped bait is biome-specific and NOT from the new biome we're switching to
    // Biome-specific baits follow the pattern: bait_{biome_id}_{tier}
    const newBiomeBaits = [
      `bait_${biomeId}_low`,
      `bait_${biomeId}_medium`,
      `bait_${biomeId}_high`,
      `bait_${biomeId}_super`
    ];

    // If equipped bait is biome-specific (not default) and NOT from the new biome, reset to default
    if (equippedBait && equippedBait !== 'bait_default' && !newBiomeBaits.includes(equippedBait)) {
      // Check if it's a biome-specific bait (matches pattern bait_X_tier)
      const biomeBaitPattern = /^bait_\d+_(low|medium|high|super)$/;
      if (biomeBaitPattern.test(equippedBait)) {
        equippedBait = 'bait_default';
      }
    }

    // Change biome and update equipment if needed
    await db.query(
      'UPDATE player_data SET current_biome = ?, equipped_rod = ?, equipped_bait = ? WHERE user_id = ?',
      [biomeId, equippedRod, equippedBait, userId]
    );

    // Track quest progress
    trackQuestProgress(userId, 'biome_visited', { biome: biomeId }).catch(err => console.error('Quest tracking error:', err));

      res.json({ success: true, currentBiome: biomeId, equippedRod, equippedBait });
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

    // Use SQL aggregation to calculate totals in a single query (prevents timeout)
    // Note: INT no longer provides gold multiplier, gold = base_gold × titan_bonus × count
    const [aggregateResult] = await connection.query(
      `SELECT
         SUM(count) as total_fish_count,
         SUM(FLOOR(base_gold * IFNULL(titan_bonus, 1) * count)) as total_gold
       FROM player_inventory
       WHERE user_id = ?
         AND (is_locked IS NULL OR is_locked = FALSE)
         AND count > 0`,
      [userId]
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

    // Get list of fish being sold (for showcase cleanup)
    const [fishBeingSold] = await connection.query(
      'SELECT DISTINCT fish_name, rarity FROM player_inventory WHERE user_id = ? AND (is_locked IS NULL OR is_locked = FALSE)',
      [userId]
    );

    // Delete all unlocked fish from inventory
    await connection.query(
      'DELETE FROM player_inventory WHERE user_id = ? AND (is_locked IS NULL OR is_locked = FALSE)',
      [userId]
    );

    // Remove sold fish from showcase
    if (fishBeingSold.length > 0) {
      const [userShowcase] = await connection.query(
        'SELECT fish_showcase FROM users WHERE id = ?',
        [userId]
      );

      if (userShowcase.length > 0 && userShowcase[0].fish_showcase) {
        let showcase = [];

        // Parse fish_showcase (handle both MySQL auto-parsed and string formats)
        if (Array.isArray(userShowcase[0].fish_showcase)) {
          showcase = userShowcase[0].fish_showcase;
        } else if (typeof userShowcase[0].fish_showcase === 'string') {
          try {
            showcase = JSON.parse(userShowcase[0].fish_showcase);
          } catch (e) {
            console.error('Failed to parse fish_showcase:', e);
            showcase = [];
          }
        }

        // Remove all sold fish from showcase
        const soldFishSet = new Set(fishBeingSold.map(f => `${f.fish_name}|${f.rarity}`));
        const updatedShowcase = showcase.filter(
          f => !soldFishSet.has(`${f.name}|${f.rarity}`)
        );

        // Update the showcase if it changed
        if (updatedShowcase.length !== showcase.length) {
          await connection.query(
            'UPDATE users SET fish_showcase = ? WHERE id = ?',
            [JSON.stringify(updatedShowcase), userId]
          );
        }
      }
    }

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

    // Commit transaction BEFORE quest tracking to avoid holding the lock
    await connection.commit();

    // Track quest progress for each rarity sold (in parallel, outside transaction)
    // This significantly improves performance by not blocking the main transaction
    Promise.all(
      rarityGroups.map(row =>
        trackQuestProgress(userId, 'fish_sold', {
          rarity: row.rarity,
          amount: Number(row.total_count) || 0
        }).catch(err => console.error('Quest tracking error:', err))
      )
    ).catch(err => console.error('Quest tracking batch error:', err));

    // Return response immediately without waiting for quest tracking
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

    // Use SQL aggregation to calculate totals in a single query (prevents timeout)
    // Note: INT no longer provides gold multiplier, gold = base_gold × titan_bonus × count
    const [aggregateResult] = await connection.query(
      `SELECT
         SUM(count) as total_fish_count,
         SUM(FLOOR(base_gold * IFNULL(titan_bonus, 1) * count)) as total_gold
       FROM player_inventory
       WHERE user_id = ?
         AND rarity = ?
         AND (is_locked IS NULL OR is_locked = FALSE)
         AND count > 0`,
      [userId, rarity]
    );

    const totalFishCount = Number(aggregateResult[0]?.total_fish_count) || 0;
    const totalGold = Number(aggregateResult[0]?.total_gold) || 0;

    if (totalFishCount === 0) {
      await connection.rollback();
      return res.json({ success: true, goldEarned: 0, fishSold: 0, newGold: 0 });
    }

    // Get list of fish being sold (for showcase cleanup)
    const [fishBeingSold] = await connection.query(
      'SELECT DISTINCT fish_name, rarity FROM player_inventory WHERE user_id = ? AND rarity = ? AND (is_locked IS NULL OR is_locked = FALSE)',
      [userId, rarity]
    );

    // Delete all unlocked fish of this rarity from inventory
    await connection.query(
      'DELETE FROM player_inventory WHERE user_id = ? AND rarity = ? AND (is_locked IS NULL OR is_locked = FALSE)',
      [userId, rarity]
    );

    // Remove sold fish from showcase
    if (fishBeingSold.length > 0) {
      const [userShowcase] = await connection.query(
        'SELECT fish_showcase FROM users WHERE id = ?',
        [userId]
      );

      if (userShowcase.length > 0 && userShowcase[0].fish_showcase) {
        let showcase = [];

        // Parse fish_showcase (handle both MySQL auto-parsed and string formats)
        if (Array.isArray(userShowcase[0].fish_showcase)) {
          showcase = userShowcase[0].fish_showcase;
        } else if (typeof userShowcase[0].fish_showcase === 'string') {
          try {
            showcase = JSON.parse(userShowcase[0].fish_showcase);
          } catch (e) {
            console.error('Failed to parse fish_showcase:', e);
            showcase = [];
          }
        }

        // Remove all sold fish from showcase
        const soldFishSet = new Set(fishBeingSold.map(f => `${f.fish_name}|${f.rarity}`));
        const updatedShowcase = showcase.filter(
          f => !soldFishSet.has(`${f.name}|${f.rarity}`)
        );

        // Update the showcase if it changed
        if (updatedShowcase.length !== showcase.length) {
          await connection.query(
            'UPDATE users SET fish_showcase = ? WHERE id = ?',
            [JSON.stringify(updatedShowcase), userId]
          );
        }
      }
    }

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

// SSE endpoint for real-time global catch notifications
router.get('/global-catches/stream', (req, res) => {
  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Add client to SSE service
  sseService.addClient(res);

  console.log(`SSE client connected. Total clients: ${sseService.getClientCount()}`);
});

// Get recent global rare catches (for global notifications)
// NOTE: This endpoint is kept for backward compatibility but SSE is preferred
router.get('/global-catches', async (req, res) => {
  try {
    // Get the most recent 10 global catches (Mythic, Exotic, Arcane)
    // Only return catches from the last 5 minutes to keep it fresh
    const [catches] = await db.query(
      `SELECT user_id, profile_username, fish_name, rarity, caught_at
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

/**
 * GET /api/game/weather
 * Get current weather for all biomes
 *
 * Returns: { weather: { 1: { weather: 'clear', xpBonus: 0 }, 2: { ... }, ... } }
 */
router.get('/weather', async (req, res) => {
  try {
    const allWeather = getAllBiomeWeather();
    res.json({ weather: allWeather });
  } catch (error) {
    console.error('Get weather error:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

/**
 * GET /api/game/weather/:biomeId
 * Get current weather for a specific biome
 *
 * Returns: { weather: 'clear', xpBonus: 0, modifiers: {...} }
 */
router.get('/weather/:biomeId', async (req, res) => {
  try {
    const biomeId = parseInt(req.params.biomeId);

    if (isNaN(biomeId) || biomeId < 1) {
      return res.status(400).json({ error: 'Invalid biome ID' });
    }

    const weather = getBiomeWeather(biomeId);
    res.json(weather);
  } catch (error) {
    console.error('Get biome weather error:', error);
    res.status(500).json({ error: 'Failed to fetch biome weather' });
  }
});

/**
 * GET /api/game/anti-cheat-status
 * Check if the current user has an active anti-cheat punishment
 *
 * Returns: {
 *   isPunished: boolean,
 *   reason: string|null,
 *   expiresAt: string|null,
 *   remainingTime: number|null (milliseconds)
 * }
 */
router.get('/anti-cheat-status', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Check for active punishment
    const [flags] = await db.query(
      `SELECT * FROM anti_cheat_flags
       WHERE user_id = ?
         AND is_active = TRUE
         AND expires_at > NOW()
       ORDER BY expires_at DESC
       LIMIT 1`,
      [userId]
    );

    if (flags.length === 0) {
      return res.json({
        isPunished: false,
        reason: null,
        expiresAt: null,
        remainingTime: null
      });
    }

    const flag = flags[0];
    const expiresAt = new Date(flag.expires_at);
    const remainingTime = expiresAt.getTime() - Date.now();

    res.json({
      isPunished: true,
      reason: flag.reason,
      expiresAt: expiresAt.toISOString(),
      remainingTime: Math.max(0, remainingTime),
      castCount: flag.cast_count
    });
  } catch (error) {
    console.error('Get anti-cheat status error:', error);
    res.status(500).json({ error: 'Failed to fetch anti-cheat status' });
  }
});

export default router;
