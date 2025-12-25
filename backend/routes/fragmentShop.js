import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// =====================================================
// FRAGMENT SHOP ROUTES
// =====================================================

/**
 * GET /api/fragment-shop/items
 * Get all available items in the fragment shop
 */
router.get('/items', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;

    // Get player's current fragments
    const [playerData] = await db.execute(`
      SELECT anomaly_fragments
      FROM player_data
      WHERE user_id = ?
    `, [userId]);

    const currentFragments = playerData[0]?.anomaly_fragments || 0;

    // Get owned avatars
    const [ownedAvatars] = await db.execute(`
      SELECT item_id
      FROM fragment_shop_purchases
      WHERE user_id = ? AND item_type = 'avatar'
    `, [userId]);

    const ownedAvatarIds = ownedAvatars.map(a => a.item_id);

    // Scan fragment avatar directory for available avatars
    const avatarPath = path.join(__dirname, '../../assets/avatar/fragment');
    let availableAvatars = [];

    try {
      const files = await fs.readdir(avatarPath);
      availableAvatars = files
        .filter(file => file.startsWith('avatarboss_') && file.endsWith('.png'))
        .map(file => ({
          id: file.replace('.png', ''),
          name: formatAvatarName(file),
          imageUrl: `/assets/avatar/fragment/${file}`,
          cost: 50,
          owned: ownedAvatarIds.includes(file.replace('.png', ''))
        }))
        .sort((a, b) => a.id.localeCompare(b.id));
    } catch (error) {
      console.error('Error reading avatar directory:', error);
      // If directory doesn't exist or error, return empty array
      availableAvatars = [];
    }

    // Define booster items
    const boosters = [
      {
        id: 'xp_booster_personal_15',
        type: 'xp_booster_personal',
        name: 'Personal XP Booster',
        description: '+15% XP for 2 hours (personal)',
        multiplier: 1.15,
        duration: 2,
        cost: 30,
        icon: '⚡'
      },
      {
        id: 'xp_booster_global_25',
        type: 'xp_booster_global',
        name: 'Global XP Booster',
        description: '+25% XP for 2 hours (all players)',
        multiplier: 1.25,
        duration: 2,
        cost: 100,
        icon: '🌟'
      }
    ];

    res.json({
      currentFragments,
      items: {
        avatars: availableAvatars,
        boosters
      }
    });

  } catch (error) {
    console.error('Error fetching shop items:', error);
    res.status(500).json({ error: 'Failed to fetch shop items' });
  }
});

/**
 * POST /api/fragment-shop/purchase
 * Purchase an item from the fragment shop
 */
router.post('/purchase', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { itemType, itemId, cost } = req.body;

    if (!itemType || !cost) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const validTypes = ['avatar', 'xp_booster_personal', 'xp_booster_global'];
    if (!validTypes.includes(itemType)) {
      return res.status(400).json({ error: 'Invalid item type' });
    }

    // Get player's current fragments
    const [playerData] = await db.execute(`
      SELECT anomaly_fragments
      FROM player_data
      WHERE user_id = ?
    `, [userId]);

    const currentFragments = playerData[0]?.anomaly_fragments || 0;

    if (currentFragments < cost) {
      return res.status(400).json({
        error: 'Not enough fragments',
        required: cost,
        current: currentFragments
      });
    }

    // Check if avatar already owned
    if (itemType === 'avatar') {
      const [existing] = await db.execute(`
        SELECT id FROM fragment_shop_purchases
        WHERE user_id = ? AND item_type = 'avatar' AND item_id = ?
      `, [userId, itemId]);

      if (existing.length > 0) {
        return res.status(400).json({ error: 'Avatar already owned' });
      }
    }

    // Deduct fragments
    await db.execute(`
      UPDATE player_data
      SET anomaly_fragments = anomaly_fragments - ?
      WHERE user_id = ?
    `, [cost, userId]);

    // Record purchase
    await db.execute(`
      INSERT INTO fragment_shop_purchases (user_id, item_type, item_id, cost)
      VALUES (?, ?, ?, ?)
    `, [userId, itemType, itemId, cost]);

    // Handle different item types
    let result = { success: true, itemType, itemId };

    if (itemType === 'xp_booster_personal') {
      // Activate personal booster immediately
      const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
      await db.execute(`
        UPDATE player_data
        SET active_xp_booster_personal = ?
        WHERE user_id = ?
      `, [JSON.stringify({ multiplier: 1.15, expires_at: expiresAt }), userId]);

      result.booster = {
        multiplier: 1.15,
        expiresAt
      };
    } else if (itemType === 'xp_booster_global') {
      // Queue global booster
      await db.execute(`
        INSERT INTO global_xp_booster_queue (activated_by_user_id, multiplier, duration_hours)
        VALUES (?, ?, ?)
      `, [userId, 1.25, 2]);

      // Check if this is the first in queue (auto-activate)
      await processGlobalBoosterQueue();

      result.message = 'Global booster queued! Check queue status for activation time.';
    }

    res.json(result);

  } catch (error) {
    console.error('Error purchasing item:', error);
    res.status(500).json({ error: 'Failed to purchase item' });
  }
});

/**
 * GET /api/fragment-shop/global-booster/queue
 * Get current global booster queue status
 */
router.get('/global-booster/queue', authenticateToken, async (req, res) => {
  try {
    // Get currently active booster
    const [activeBooster] = await db.execute(`
      SELECT
        gq.id, gq.activated_by_user_id, gq.multiplier, gq.activated_at, gq.expires_at,
        u.profile_username
      FROM global_xp_booster_queue gq
      JOIN users u ON gq.activated_by_user_id = u.id
      WHERE gq.status = 'active'
      LIMIT 1
    `);

    // Get queued boosters
    const [queuedBoosters] = await db.execute(`
      SELECT
        gq.id, gq.activated_by_user_id, gq.multiplier, gq.queued_at,
        u.profile_username
      FROM global_xp_booster_queue gq
      JOIN users u ON gq.activated_by_user_id = u.id
      WHERE gq.status = 'queued'
      ORDER BY gq.queued_at ASC
    `);

    res.json({
      active: activeBooster.length > 0 ? {
        id: activeBooster[0].id,
        activatedBy: activeBooster[0].profile_username,
        multiplier: activeBooster[0].multiplier,
        activatedAt: activeBooster[0].activated_at,
        expiresAt: activeBooster[0].expires_at,
        timeRemaining: Math.max(0, new Date(activeBooster[0].expires_at) - Date.now())
      } : null,
      queue: queuedBoosters.map((booster, index) => ({
        id: booster.id,
        position: index + 1,
        activatedBy: booster.profile_username,
        multiplier: booster.multiplier,
        queuedAt: booster.queued_at
      }))
    });

  } catch (error) {
    console.error('Error fetching booster queue:', error);
    res.status(500).json({ error: 'Failed to fetch booster queue' });
  }
});

/**
 * GET /api/fragment-shop/global-booster/leaderboard
 * Get leaderboard of players who have activated global boosters
 */
router.get('/global-booster/leaderboard', authenticateToken, async (req, res) => {
  try {
    const [leaderboard] = await db.execute(`
      SELECT
        u.profile_username,
        u.id as user_id,
        COUNT(*) as activations,
        MAX(gq.activated_at) as last_activation
      FROM fragment_shop_purchases fsp
      JOIN users u ON fsp.user_id = u.id
      LEFT JOIN global_xp_booster_queue gq ON gq.activated_by_user_id = u.id AND gq.status IN ('active', 'expired')
      WHERE fsp.item_type = 'xp_booster_global'
      GROUP BY u.id, u.profile_username
      ORDER BY activations DESC, last_activation DESC
      LIMIT 50
    `);

    res.json({ leaderboard });

  } catch (error) {
    console.error('Error fetching booster leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch booster leaderboard' });
  }
});

// =====================================================
// HELPER FUNCTIONS
// =====================================================

/**
 * Process global booster queue
 * - Expire old boosters
 * - Activate next queued booster if no active one
 */
async function processGlobalBoosterQueue() {
  try {
    // Mark expired boosters
    await db.execute(`
      UPDATE global_xp_booster_queue
      SET status = 'expired'
      WHERE status = 'active' AND expires_at <= NOW()
    `);

    // Check if there's an active booster
    const [activeBooster] = await db.execute(`
      SELECT id FROM global_xp_booster_queue
      WHERE status = 'active'
      LIMIT 1
    `);

    // If no active booster, activate oldest queued one
    if (activeBooster.length === 0) {
      const [nextBooster] = await db.execute(`
        SELECT id, duration_hours
        FROM global_xp_booster_queue
        WHERE status = 'queued'
        ORDER BY queued_at ASC
        LIMIT 1
      `);

      if (nextBooster.length > 0) {
        const expiresAt = new Date(Date.now() + nextBooster[0].duration_hours * 60 * 60 * 1000);

        await db.execute(`
          UPDATE global_xp_booster_queue
          SET status = 'active',
              activated_at = NOW(),
              expires_at = ?
          WHERE id = ?
        `, [expiresAt, nextBooster[0].id]);

        console.log(`Activated global booster ID ${nextBooster[0].id}`);
      }
    }

  } catch (error) {
    console.error('Error processing booster queue:', error);
  }
}

/**
 * Format avatar filename to display name
 * Example: avatarboss_001.png -> "Anomaly Hunter #1"
 */
function formatAvatarName(filename) {
  const match = filename.match(/avatarboss_(\d+)/);
  if (match) {
    return `Anomaly Hunter #${match[1]}`;
  }
  return filename.replace('.png', '').replace(/_/g, ' ');
}

// Export for use in cron jobs
export default router;
export { processGlobalBoosterQueue };
