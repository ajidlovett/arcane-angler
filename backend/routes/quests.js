/**
 * Quest API Routes
 * Handles quest retrieval and progress tracking
 */

import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import questService from '../services/questService.js';
import db from '../db.js';

const router = express.Router();

/**
 * GET /api/quests
 * Get all active quests for the authenticated user
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    console.log('[Quest API] Fetching quests for user:', userId);
    const quests = await questService.getAllActiveQuests(userId);
    console.log('[Quest API] Quests fetched:', {
      daily: quests.daily.length,
      weekly: quests.weekly.length,
      monthly: quests.monthly.length
    });

    res.json({
      success: true,
      quests
    });
  } catch (error) {
    console.error('Error fetching quests:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Failed to fetch quests', details: error.message });
  }
});

/**
 * GET /api/quests/:type
 * Get quests of a specific type (daily, weekly, monthly)
 */
router.get('/:type', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { type } = req.params;

    if (!['daily', 'weekly', 'monthly'].includes(type)) {
      return res.status(400).json({ error: 'Invalid quest type' });
    }

    const quests = await questService.getOrRotateQuests(userId, type);

    res.json({
      success: true,
      quests
    });
  } catch (error) {
    console.error(`Error fetching ${req.params.type} quests:`, error);
    res.status(500).json({ error: 'Failed to fetch quests' });
  }
});

/**
 * POST /api/quests/track
 * Track quest progress for multiple quest types
 * Body: { action: string, data: object }
 */
router.post('/track', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { action, data } = req.body;

    if (!action) {
      return res.status(400).json({ error: 'Action type is required' });
    }

    // Get all active quests
    const allQuests = await questService.getAllActiveQuests(userId);
    const activeQuests = [
      ...allQuests.daily,
      ...allQuests.weekly,
      ...allQuests.monthly
    ].filter(q => !q.completed);

    const updatedQuests = [];
    const completedQuests = [];

    // Track progress based on action type
    for (const quest of activeQuests) {
      let shouldUpdate = false;
      let progressIncrement = 0;

      const metadata = quest.metadata || {};

      // Match action to quest requirements
      switch (action) {
        case 'fish_caught':
          // Check if quest is about catching fish
          if (quest.quest_template_id.startsWith('catch_')) {
            // Check biome requirement
            if (metadata.biome_rule === 'current' && data.biome !== metadata.targetBiome) {
              break;
            }
            if (metadata.biome_rule === 'any_unlocked' && data.biome !== metadata.targetBiome) {
              break;
            }

            // Check rarity requirement
            if (metadata.rarity_rule) {
              if (metadata.rarity_rule === 'Rare+' && !this.isRarePlus(data.rarity)) {
                break;
              }
              if (metadata.rarity_rule === 'Epic+' && !this.isEpicPlus(data.rarity)) {
                break;
              }
              if (metadata.rarity_rule && metadata.rarity_rule === data.rarity) {
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
          if (quest.quest_template_id === 'use_bait_01') {
            shouldUpdate = true;
            progressIncrement = 1;
          }
          break;

        case 'fish_sold':
          if (quest.quest_template_id.startsWith('sell_')) {
            if (metadata.rarity_rule === 'Rare+' && !this.isRarePlus(data.rarity)) {
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

        case 'unique_species':
          if (quest.quest_template_id === 'catch_species_unique_01') {
            // This requires special handling on frontend
            // We'll update progress with the unique count
            if (data.uniqueCount !== undefined) {
              shouldUpdate = true;
              progressIncrement = data.uniqueCount - quest.current_progress;
            }
          }
          break;
      }

      if (shouldUpdate && progressIncrement > 0) {
        const updated = await questService.updateQuestProgress(quest.id, userId, progressIncrement);
        updatedQuests.push(updated);

        if (updated.completed && !quest.completed) {
          completedQuests.push(updated);
        }
      }
    }

    res.json({
      success: true,
      updatedQuests,
      completedQuests,
      relicsEarned: completedQuests.reduce((sum, q) => sum + q.reward_relics, 0)
    });
  } catch (error) {
    console.error('Error tracking quest progress:', error);
    res.status(500).json({ error: 'Failed to track quest progress' });
  }
});

/**
 * Helper: Check if rarity is Rare or higher
 */
router.isRarePlus = function(rarity) {
  const rarePlus = ['Rare', 'Epic', 'Treasure Chest', 'Legendary', 'Mythic', 'Exotic', 'Arcane'];
  return rarePlus.includes(rarity);
};

/**
 * Helper: Check if rarity is Epic or higher
 */
router.isEpicPlus = function(rarity) {
  const epicPlus = ['Epic', 'Treasure Chest', 'Legendary', 'Mythic', 'Exotic', 'Arcane'];
  return epicPlus.includes(rarity);
};

/**
 * POST /api/quests/manual-update/:questId
 * Manually update quest progress (for testing or admin)
 */
router.post('/manual-update/:questId', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { questId } = req.params;
    const { progress } = req.body;

    if (progress === undefined || progress < 0) {
      return res.status(400).json({ error: 'Valid progress amount required' });
    }

    const updated = await questService.updateQuestProgress(parseInt(questId), userId, progress);

    res.json({
      success: true,
      quest: updated
    });
  } catch (error) {
    console.error('Error manually updating quest:', error);
    res.status(500).json({ error: error.message || 'Failed to update quest' });
  }
});

/**
 * GET /api/quests/history
 * Get quest completion history
 */
router.get('/history/completed', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { limit = 50 } = req.query;

    const [history] = await db.execute(`
      SELECT
        qh.quest_template_id,
        qh.quest_type,
        qh.rotation_date,
        qh.completed_at
      FROM quest_history qh
      WHERE qh.user_id = ?
        AND qh.completed_at IS NOT NULL
      ORDER BY qh.completed_at DESC
      LIMIT ?
    `, [userId, parseInt(limit)]);

    res.json({
      success: true,
      history
    });
  } catch (error) {
    console.error('Error fetching quest history:', error);
    res.status(500).json({ error: 'Failed to fetch quest history' });
  }
});

export default router;
