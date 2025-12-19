/**
 * Anti-Cheat Detection Service
 *
 * Detects and punishes:
 * 1. Autoclicker usage (consistent timing patterns)
 * 2. Multi-session abuse (concurrent casts from multiple tabs/devices)
 *
 * Punishment: 0 XP and 1 common fish for 10 minutes
 */

import db from '../db.js';

// Configuration
const CONFIG = {
  // Autoclicker detection
  MIN_CAST_INTERVAL: 50, // Minimum human reaction time (ms)
  MAX_CONSISTENT_CASTS: 10, // Number of suspiciously consistent casts before flagging
  CONSISTENCY_THRESHOLD: 30, // Max variance (ms) for "too consistent" pattern

  // Multi-session detection
  MULTI_SESSION_WINDOW: 2000, // If two casts happen within 2s, flag for multi-session

  // Punishment
  PUNISHMENT_DURATION: 10 * 60 * 1000, // 10 minutes in milliseconds

  // Tracking
  TIMING_HISTORY_SIZE: 20 // Track last 20 cast intervals
};

/**
 * Check if a user is currently flagged for cheating
 * @param {number} userId - User ID to check
 * @param {object} connection - Database connection
 * @returns {object|null} Active flag record or null
 */
export async function checkActivePunishment(userId, connection) {
  const [flags] = await connection.query(
    `SELECT * FROM anti_cheat_flags
     WHERE user_id = ?
       AND is_active = TRUE
       AND expires_at > NOW()
     ORDER BY expires_at DESC
     LIMIT 1`,
    [userId]
  );

  return flags.length > 0 ? flags[0] : null;
}

/**
 * Detect autoclicker based on cast timing patterns
 * @param {Array<number>} timings - Array of intervals between casts (in ms)
 * @returns {boolean} True if autoclicker detected
 */
function detectAutoclicker(timings) {
  if (!timings || timings.length < CONFIG.MAX_CONSISTENT_CASTS) {
    return false; // Not enough data
  }

  // Check last N casts for suspicious patterns
  const recentTimings = timings.slice(-CONFIG.MAX_CONSISTENT_CASTS);

  // Pattern 1: Too fast (< 50ms)
  const tooFastCount = recentTimings.filter(t => t < CONFIG.MIN_CAST_INTERVAL).length;
  if (tooFastCount >= 5) {
    console.log('[ANTI-CHEAT] Autoclicker detected: Too fast clicks', { tooFastCount });
    return true;
  }

  // Pattern 2: Too consistent (low variance)
  const mean = recentTimings.reduce((a, b) => a + b, 0) / recentTimings.length;
  const variance = recentTimings.reduce((sum, t) => sum + Math.pow(t - mean, 2), 0) / recentTimings.length;
  const stdDev = Math.sqrt(variance);

  // Human clicks have natural variance. Autoclickers are very consistent.
  // If standard deviation is < 30ms across 10 casts, it's suspicious
  if (stdDev < CONFIG.CONSISTENCY_THRESHOLD && mean > 0) {
    console.log('[ANTI-CHEAT] Autoclicker detected: Too consistent timing', {
      mean: mean.toFixed(2),
      stdDev: stdDev.toFixed(2),
      timings: recentTimings
    });
    return true;
  }

  return false;
}

/**
 * Detect multi-session abuse (concurrent casts from different tabs/devices)
 * @param {number} userId - User ID
 * @param {number} currentTime - Current timestamp (ms)
 * @param {number|null} lastCastTime - Last recorded cast time (ms)
 * @param {object} connection - Database connection
 * @returns {Promise<boolean>} True if multi-session detected
 */
async function detectMultiSession(userId, currentTime, lastCastTime, connection) {
  if (!lastCastTime) {
    return false; // First cast ever
  }

  const timeSinceLastCast = currentTime - lastCastTime;

  // If a cast happens within 2 seconds of the last one, it's likely multi-session
  // (Normal gameplay has 6s cooldown client-side)
  if (timeSinceLastCast < CONFIG.MULTI_SESSION_WINDOW) {
    console.log('[ANTI-CHEAT] Multi-session detected:', {
      userId,
      timeSinceLastCast,
      threshold: CONFIG.MULTI_SESSION_WINDOW
    });
    return true;
  }

  return false;
}

/**
 * Flag a user for cheating and apply punishment
 * @param {number} userId - User ID to flag
 * @param {string} reason - Reason for flagging ("autoclicker" or "multi_session")
 * @param {object} connection - Database connection
 * @returns {Promise<void>}
 */
async function flagUser(userId, reason, connection) {
  const expiresAt = new Date(Date.now() + CONFIG.PUNISHMENT_DURATION);

  // Check if user already has an active flag
  const existingFlag = await checkActivePunishment(userId, connection);

  if (existingFlag) {
    // Extend existing punishment and increment count
    await connection.query(
      `UPDATE anti_cheat_flags
       SET expires_at = ?,
           cast_count = cast_count + 1,
           reason = ?
       WHERE id = ?`,
      [expiresAt, reason, existingFlag.id]
    );

    console.log('[ANTI-CHEAT] Extended punishment for user:', {
      userId,
      reason,
      newExpiresAt: expiresAt,
      castCount: existingFlag.cast_count + 1
    });
  } else {
    // Create new flag
    await connection.query(
      `INSERT INTO anti_cheat_flags (user_id, expires_at, reason, is_active, cast_count)
       VALUES (?, ?, ?, TRUE, 1)`,
      [userId, expiresAt, reason]
    );

    console.log('[ANTI-CHEAT] Flagged user:', {
      userId,
      reason,
      expiresAt
    });
  }
}

/**
 * Main anti-cheat check - called before processing each cast
 * @param {number} userId - User ID
 * @param {object} playerData - Player data from database (includes last_cast_time, recent_cast_timings)
 * @param {object} connection - Database connection
 * @returns {Promise<object>} { isViolation: boolean, reason: string|null, activeFlag: object|null }
 */
export async function checkForCheating(userId, playerData, connection) {
  const currentTime = Date.now();
  const lastCastTime = playerData.last_cast_time;

  // Parse recent cast timings
  let recentTimings = [];
  try {
    if (playerData.recent_cast_timings) {
      const parsed = typeof playerData.recent_cast_timings === 'string'
        ? JSON.parse(playerData.recent_cast_timings)
        : playerData.recent_cast_timings;
      recentTimings = Array.isArray(parsed) ? parsed : [];
    }
  } catch (e) {
    console.error('[ANTI-CHEAT] Error parsing recent_cast_timings:', e);
    recentTimings = [];
  }

  // Calculate interval since last cast
  let interval = null;
  if (lastCastTime) {
    interval = currentTime - lastCastTime;
  }

  // Detect multi-session abuse
  const isMultiSession = await detectMultiSession(userId, currentTime, lastCastTime, connection);
  if (isMultiSession) {
    await flagUser(userId, 'multi_session', connection);
    const activeFlag = await checkActivePunishment(userId, connection);
    return {
      isViolation: true,
      reason: 'multi_session',
      activeFlag
    };
  }

  // Add current interval to timing history
  if (interval !== null) {
    recentTimings.push(interval);

    // Keep only last N timings
    if (recentTimings.length > CONFIG.TIMING_HISTORY_SIZE) {
      recentTimings = recentTimings.slice(-CONFIG.TIMING_HISTORY_SIZE);
    }
  }

  // Detect autoclicker
  const isAutoclicker = detectAutoclicker(recentTimings);
  if (isAutoclicker) {
    await flagUser(userId, 'autoclicker', connection);
    const activeFlag = await checkActivePunishment(userId, connection);
    return {
      isViolation: true,
      reason: 'autoclicker',
      activeFlag
    };
  }

  // Update player's cast timing data
  await connection.query(
    `UPDATE player_data
     SET last_cast_time = ?,
         recent_cast_timings = ?
     WHERE user_id = ?`,
    [currentTime, JSON.stringify(recentTimings), userId]
  );

  // Check if user has an existing active punishment (from previous violations)
  const activeFlag = await checkActivePunishment(userId, connection);

  return {
    isViolation: activeFlag !== null,
    reason: activeFlag ? activeFlag.reason : null,
    activeFlag
  };
}

/**
 * Apply punishment override to cast result
 * Overrides the catch to give 0 XP and 1 common fish
 * @param {object} biomeData - Current biome data
 * @param {object} activeFlag - Active punishment flag
 * @returns {object} Punished result
 */
export function applyPunishment(biomeData, activeFlag) {
  // Select a random common fish from the biome
  const commonFish = biomeData.Common;
  const fish = commonFish[Math.floor(Math.random() * commonFish.length)];

  return {
    isPunished: true,
    rarity: 'Common',
    fish: {
      name: fish.name,
      desc: fish.desc || fish.description || ''
    },
    count: 1,
    xpGained: 0, // NO XP
    goldGained: 0,
    relicsGained: 0,
    titanBonus: 1,
    punishmentReason: activeFlag.reason,
    punishmentExpiresAt: activeFlag.expires_at
  };
}

/**
 * Cleanup expired flags (should be run periodically)
 * @returns {Promise<number>} Number of flags cleaned up
 */
export async function cleanupExpiredFlags() {
  try {
    const [result] = await db.query(
      `UPDATE anti_cheat_flags
       SET is_active = FALSE
       WHERE is_active = TRUE
         AND expires_at <= NOW()`
    );

    if (result.affectedRows > 0) {
      console.log('[ANTI-CHEAT] Cleaned up expired flags:', result.affectedRows);
    }

    return result.affectedRows;
  } catch (error) {
    console.error('[ANTI-CHEAT] Error cleaning up expired flags:', error);
    return 0;
  }
}

export default {
  checkForCheating,
  checkActivePunishment,
  applyPunishment,
  cleanupExpiredFlags
};
