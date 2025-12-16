/**
 * Quest Tracking Utility
 * Helper functions for tracking quest progress from game actions
 */

import db from '../db.js';

/**
 * Track quest progress for a specific action
 * @param {number} userId - User ID
 * @param {string} action - Action type (fish_caught, cast_performed, etc.)
 * @param {object} data - Action data (rarity, biome, amount, etc.)
 * @returns {Promise<object>} - Tracking result with completed quests
 */
export async function trackQuestProgress(userId, action, data = {}) {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Optimize simple quests with direct SQL updates (prevents race conditions)
    let updatedCount = 0;

    // Handle simple increment quests with single SQL UPDATE
    if (action === 'cast_performed') {
      const [result] = await connection.execute(`
        UPDATE player_quests
        SET current_progress = LEAST(current_progress + 1, target_amount),
            completed = (current_progress + 1 >= target_amount)
        WHERE user_id = ?
          AND quest_template_id = 'casts_01'
          AND completed = FALSE
          AND expires_at > NOW()
      `, [userId]);
      updatedCount += result.affectedRows;
    } else if (action === 'multi_catch') {
      const [result] = await connection.execute(`
        UPDATE player_quests
        SET current_progress = LEAST(current_progress + 1, target_amount),
            completed = (current_progress + 1 >= target_amount)
        WHERE user_id = ?
          AND quest_template_id = 'multi_catch_01'
          AND completed = FALSE
          AND expires_at > NOW()
      `, [userId]);
      updatedCount += result.affectedRows;
    } else if (action === 'chest_caught') {
      const [result] = await connection.execute(`
        UPDATE player_quests
        SET current_progress = LEAST(current_progress + 1, target_amount),
            completed = (current_progress + 1 >= target_amount)
        WHERE user_id = ?
          AND quest_template_id = 'catch_chest_01'
          AND completed = FALSE
          AND expires_at > NOW()
      `, [userId]);
      updatedCount += result.affectedRows;
    } else if (action === 'stat_upgraded') {
      const [result] = await connection.execute(`
        UPDATE player_quests
        SET current_progress = LEAST(current_progress + 1, target_amount),
            completed = (current_progress + 1 >= target_amount)
        WHERE user_id = ?
          AND quest_template_id = 'upgrade_stat_01'
          AND completed = FALSE
          AND expires_at > NOW()
      `, [userId]);
      updatedCount += result.affectedRows;
    } else if (action === 'xp_gained' && data.amount) {
      const [result] = await connection.execute(`
        UPDATE player_quests
        SET current_progress = LEAST(current_progress + ?, target_amount),
            completed = (current_progress + ? >= target_amount)
        WHERE user_id = ?
          AND quest_template_id = 'level_up_01'
          AND completed = FALSE
          AND expires_at > NOW()
      `, [data.amount, data.amount, userId]);
      updatedCount += result.affectedRows;
    } else if (action === 'relics_spent' && data.amount) {
      const [result] = await connection.execute(`
        UPDATE player_quests
        SET current_progress = LEAST(current_progress + ?, target_amount),
            completed = (current_progress + ? >= target_amount)
        WHERE user_id = ?
          AND quest_template_id = 'relic_spend_01'
          AND completed = FALSE
          AND expires_at > NOW()
      `, [data.amount, data.amount, userId]);
      updatedCount += result.affectedRows;
    } else if (action === 'fish_sold' && data.amount) {
      // Handle fish_sold quests with rarity filtering
      const increment = data.amount || 1;

      if (isRarePlus(data.rarity)) {
        await connection.execute(`
          UPDATE player_quests
          SET current_progress = LEAST(current_progress + ?, target_amount),
              completed = (current_progress + ? >= target_amount)
          WHERE user_id = ?
            AND quest_template_id LIKE 'sell_%'
            AND JSON_EXTRACT(metadata, '$.rarity_rule') = 'Rare+'
            AND completed = FALSE
            AND expires_at > NOW()
        `, [increment, increment, userId]);
      }

      // Update quests without rarity rule
      const [result] = await connection.execute(`
        UPDATE player_quests
        SET current_progress = LEAST(current_progress + ?, target_amount),
            completed = (current_progress + ? >= target_amount)
        WHERE user_id = ?
          AND quest_template_id LIKE 'sell_%'
          AND (JSON_EXTRACT(metadata, '$.rarity_rule') IS NULL OR JSON_EXTRACT(metadata, '$.rarity_rule') = 'null')
          AND completed = FALSE
          AND expires_at > NOW()
      `, [increment, increment, userId]);
      updatedCount += result.affectedRows;
    } else if (action === 'bait_used') {
      const [result] = await connection.execute(`
        UPDATE player_quests
        SET current_progress = LEAST(current_progress + 1, target_amount),
            completed = (current_progress + 1 >= target_amount)
        WHERE user_id = ?
          AND quest_template_id = 'use_bait_01'
          AND completed = FALSE
          AND expires_at > NOW()
      `, [userId]);
      updatedCount += result.affectedRows;
    } else if (action === 'biome_visited' && data.biome) {
      const [result] = await connection.execute(`
        UPDATE player_quests
        SET current_progress = LEAST(current_progress + 1, target_amount),
            completed = (current_progress + 1 >= target_amount)
        WHERE user_id = ?
          AND quest_template_id = 'biome_visit_01'
          AND JSON_EXTRACT(metadata, '$.targetBiome') = ?
          AND completed = FALSE
          AND expires_at > NOW()
      `, [userId, data.biome]);
      updatedCount += result.affectedRows;
    }

    // Get newly completed quests to award relics
    const [completedQuests] = await connection.execute(`
      SELECT * FROM player_quests
      WHERE user_id = ?
        AND completed = TRUE
        AND expires_at > NOW()
        AND reward_relics > 0
        AND id NOT IN (
          SELECT DISTINCT quest_id
          FROM quest_rewards_claimed
          WHERE user_id = ?
        )
    `, [userId, userId]);

    let totalRelicsEarned = 0;

    for (const quest of completedQuests) {
      // Award relics
      await connection.execute(`
        UPDATE player_data
        SET relics = relics + ?
        WHERE user_id = ?
      `, [quest.reward_relics, userId]);

      // Update quest history
      await connection.execute(`
        UPDATE quest_history
        SET completed_at = NOW()
        WHERE user_id = ?
          AND quest_template_id = ?
          AND rotation_date = ?
          AND completed_at IS NULL
      `, [userId, quest.quest_template_id, quest.rotation_date]);

      // Mark reward as claimed
      await connection.execute(`
        INSERT IGNORE INTO quest_rewards_claimed (user_id, quest_id)
        VALUES (?, ?)
      `, [userId, quest.id]);

      totalRelicsEarned += quest.reward_relics;
    }

    // For complex metadata-tracking quests (fish_caught), fall back to JS logic
    const needsJsProcessing = ['fish_caught'];
    if (needsJsProcessing.includes(action)) {
      // Get quests that need metadata processing
      const [allQuests] = await connection.execute(`
        SELECT * FROM player_quests
        WHERE user_id = ?
          AND completed = FALSE
          AND expires_at > NOW()
          AND (quest_template_id LIKE 'catch_%' OR quest_template_id LIKE 'multi_biome_%'
               OR quest_template_id LIKE 'use_bait_count_%' OR quest_template_id LIKE 'equip_bait_%')
      `, [userId]);

    if (allQuests.length === 0) {
      await connection.commit();
      return { updatedQuests: [], completedQuests: completedQuests, relicsEarned: totalRelicsEarned };
    }

    const updatedQuests = [];
    let additionalRelics = 0;

      for (const quest of allQuests) {
        let shouldUpdate = false;
        let progressIncrement = 0;

        // Metadata is already parsed by MySQL2 (JSON column auto-parsing)
        // Only parse if it's still a string
        const metadata = typeof quest.metadata === 'string'
          ? JSON.parse(quest.metadata)
          : (quest.metadata || {});

        // Match action to quest requirements (only complex metadata-based quests)
        switch (action) {
          case 'fish_caught':
            // Special handling for multi-biome quest
            if (quest.quest_template_id === 'multi_biome_01') {
              const visitedBiomes = metadata.visited_biomes || [];
              const currentBiome = data.biome;

              if (currentBiome && !visitedBiomes.includes(currentBiome)) {
                // New biome visited
                visitedBiomes.push(currentBiome);
                metadata.visited_biomes = visitedBiomes;
                shouldUpdate = true;
                progressIncrement = 1;

                // Update metadata in database
                await connection.execute(`
                  UPDATE player_quests
                  SET metadata = ?
                  WHERE id = ?
                `, [JSON.stringify(metadata), quest.id]);
              }
              break;
            }

            if (quest.quest_template_id.startsWith('catch_')) {
              // Skip chest quests - they use separate chest_caught action
              if (quest.quest_template_id === 'catch_chest_01') {
                break;
              }

              // Check biome requirement
              if (metadata.biome_rule === 'current' || metadata.biome_rule === 'any_unlocked') {
                if (metadata.targetBiome && data.biome !== metadata.targetBiome) {
                  break;
                }
              }

              // Check rarity requirement
              if (metadata.rarity_rule) {
                if (metadata.rarity_rule === 'Rare+' && !isRarePlus(data.rarity)) {
                  break;
                }
                if (metadata.rarity_rule === 'Epic+' && !isEpicPlus(data.rarity)) {
                  break;
                }
                if (metadata.rarity_rule === data.rarity) {
                  shouldUpdate = true;
                  progressIncrement = 1;
                } else if (!metadata.rarity_rule.includes('+')) {
                  break;
                } else {
                  shouldUpdate = true;
                  progressIncrement = 1;
                }
              } else {
                shouldUpdate = true;
                progressIncrement = 1;
              }

              // Check bait requirement
              // Default bait quest: only track if bait is null or "Stale Bread Crust"
              if (quest.quest_template_id.includes('default_bait')) {
                if (data.bait !== null && data.bait !== 'Stale Bread Crust') {
                  shouldUpdate = false;
                }
              }
              // Purchased bait quest: only track if bait is NOT null and NOT "Stale Bread Crust"
              if (quest.quest_template_id.includes('with_bait')) {
                if (data.bait === null || data.bait === 'Stale Bread Crust') {
                  shouldUpdate = false;
                }
              }
            }
            break;

          case 'bait_used':
            // Consecutive bait usage quest - track same bait used consecutively
            if (quest.quest_template_id === 'use_bait_count_02') {
              const currentBait = data.bait;
              const lastBait = metadata.last_bait || null;
              let consecutiveCount = metadata.consecutive_count || 0;

              if (currentBait === lastBait) {
                // Same bait as before - increment consecutive count
                consecutiveCount++;
              } else {
                // Different bait - reset to 1
                consecutiveCount = 1;
              }

              // Update metadata
              metadata.last_bait = currentBait;
              metadata.consecutive_count = consecutiveCount;

              // Update metadata in database
              await connection.execute(`
                UPDATE player_quests
                SET metadata = ?
                WHERE id = ?
              `, [JSON.stringify(metadata), quest.id]);

              // Progress = max consecutive count achieved so far
              if (consecutiveCount > quest.current_progress) {
                shouldUpdate = true;
                progressIncrement = consecutiveCount - quest.current_progress;
              }
            }

            // Different bait types quest - track unique baits
            if (quest.quest_template_id === 'equip_bait_type_01') {
              const usedBaits = metadata.used_baits || [];
              const baitName = data.bait;

              if (baitName && !usedBaits.includes(baitName)) {
                // New bait type used
                usedBaits.push(baitName);
                metadata.used_baits = usedBaits;
                shouldUpdate = true;
                progressIncrement = 1;

                // Update metadata in database
                await connection.execute(`
                  UPDATE player_quests
                  SET metadata = ?
                  WHERE id = ?
                `, [JSON.stringify(metadata), quest.id]);
              }
            }
            break;
        }

        if (shouldUpdate && progressIncrement > 0) {
          const newProgress = Math.min(
            quest.current_progress + progressIncrement,
            quest.target_amount
          );
          const isCompleted = newProgress >= quest.target_amount;

          // Update quest progress
          await connection.execute(`
            UPDATE player_quests
            SET current_progress = ?, completed = ?
            WHERE id = ?
          `, [newProgress, isCompleted, quest.id]);

          updatedQuests.push({
            ...quest,
            current_progress: newProgress,
            completed: isCompleted
          });

          // If completed, award relics
          if (isCompleted && !quest.completed) {
            await connection.execute(`
              UPDATE player_data
              SET relics = relics + ?
              WHERE user_id = ?
            `, [quest.reward_relics, userId]);

            // Update quest history
            await connection.execute(`
              UPDATE quest_history
              SET completed_at = NOW()
              WHERE user_id = ?
                AND quest_template_id = ?
                AND rotation_date = ?
                AND completed_at IS NULL
            `, [userId, quest.quest_template_id, quest.rotation_date]);

            // Mark reward as claimed
            await connection.execute(`
              INSERT IGNORE INTO quest_rewards_claimed (user_id, quest_id)
              VALUES (?, ?)
            `, [userId, quest.id]);

            additionalRelics += quest.reward_relics;
          }
        }
      }

      totalRelicsEarned += additionalRelics;
    }

    await connection.commit();
    return {
      updatedQuests: [],
      completedQuests: completedQuests,
      relicsEarned: totalRelicsEarned
    };
  } catch (error) {
    await connection.rollback();
    console.error('Quest tracking error:', error);
    // Don't throw - quest tracking should not break game actions
    return { updatedQuests: [], completedQuests: [], relicsEarned: 0 };
  } finally {
    connection.release();
  }
}

/**
 * Check if rarity is Rare or higher
 */
function isRarePlus(rarity) {
  const rarePlus = ['Rare', 'Epic', 'Treasure Chest', 'Legendary', 'Mythic', 'Exotic', 'Arcane'];
  return rarePlus.includes(rarity);
}

/**
 * Check if rarity is Epic or higher
 */
function isEpicPlus(rarity) {
  const epicPlus = ['Epic', 'Treasure Chest', 'Legendary', 'Mythic', 'Exotic', 'Arcane'];
  return epicPlus.includes(rarity);
}
