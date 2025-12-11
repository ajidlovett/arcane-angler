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
  try {
    // Get all active quests for the user
    const [allQuests] = await db.execute(`
      SELECT * FROM player_quests
      WHERE user_id = ?
        AND completed = FALSE
        AND expires_at > NOW()
    `, [userId]);

    if (allQuests.length === 0) {
      return { updatedQuests: [], completedQuests: [], relicsEarned: 0 };
    }

    const updatedQuests = [];
    const completedQuests = [];
    let totalRelicsEarned = 0;

    for (const quest of allQuests) {
      let shouldUpdate = false;
      let progressIncrement = 0;

      // Metadata is already parsed by MySQL2 (JSON column auto-parsing)
      // Only parse if it's still a string
      const metadata = typeof quest.metadata === 'string'
        ? JSON.parse(quest.metadata)
        : (quest.metadata || {});

      // Match action to quest requirements
      switch (action) {
        case 'fish_caught':
          if (quest.quest_template_id.startsWith('catch_')) {
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
            if (quest.quest_template_id.includes('default_bait') && data.bait !== null) {
              shouldUpdate = false;
            }
            if (quest.quest_template_id.includes('with_bait') && data.bait === null) {
              shouldUpdate = false;
            }
          }
          break;

        case 'cast_performed':
          if (quest.quest_template_id === 'casts_01') {
            shouldUpdate = true;
            progressIncrement = 1;
          }
          break;

        case 'multi_catch':
          if (quest.quest_template_id === 'multi_catch_01') {
            shouldUpdate = true;
            progressIncrement = 1;
          }
          break;

        case 'bait_used':
          if (quest.quest_template_id === 'use_bait_01' || quest.quest_template_id === 'use_bait_count_02') {
            shouldUpdate = true;
            progressIncrement = 1;
          }
          break;

        case 'fish_sold':
          if (quest.quest_template_id.startsWith('sell_')) {
            if (metadata.rarity_rule === 'Rare+' && !isRarePlus(data.rarity)) {
              break;
            }
            shouldUpdate = true;
            progressIncrement = data.amount || 1;
          }
          break;

        case 'chest_caught':
          if (quest.quest_template_id === 'catch_chest_01') {
            shouldUpdate = true;
            progressIncrement = 1;
          }
          break;

        case 'stat_upgraded':
          if (quest.quest_template_id === 'upgrade_stat_01') {
            shouldUpdate = true;
            progressIncrement = 1;
          }
          break;

        case 'xp_gained':
          if (quest.quest_template_id === 'level_up_01') {
            shouldUpdate = true;
            progressIncrement = data.amount || 0;
          }
          break;

        case 'relics_spent':
          if (quest.quest_template_id === 'relic_spend_01') {
            shouldUpdate = true;
            progressIncrement = data.amount || 0;
          }
          break;

        case 'biome_visited':
          if (quest.quest_template_id === 'biome_visit_01' &&
              metadata.targetBiome === data.biome) {
            shouldUpdate = true;
            progressIncrement = 1;
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
        await db.execute(`
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
          await db.execute(`
            UPDATE player_data
            SET relics = relics + ?
            WHERE user_id = ?
          `, [quest.reward_relics, userId]);

          // Update quest history
          await db.execute(`
            UPDATE quest_history
            SET completed_at = NOW()
            WHERE user_id = ?
              AND quest_template_id = ?
              AND rotation_date = ?
              AND completed_at IS NULL
          `, [userId, quest.quest_template_id, quest.rotation_date]);

          completedQuests.push(quest);
          totalRelicsEarned += quest.reward_relics;
        }
      }
    }

    return {
      updatedQuests,
      completedQuests,
      relicsEarned: totalRelicsEarned
    };
  } catch (error) {
    console.error('Quest tracking error:', error);
    // Don't throw - quest tracking should not break game actions
    return { updatedQuests: [], completedQuests: [], relicsEarned: 0 };
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
