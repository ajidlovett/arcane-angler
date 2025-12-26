import db from '../db.js';

/**
 * Get total XP multiplier from personal and global boosters
 * Personal and global boosters stack additively:
 * - Personal: 15% = 1.15x
 * - Global: 25% = 1.25x
 * - Combined: 15% + 25% = 40% = 1.40x
 *
 * @param {number} userId - User ID
 * @returns {Promise<{totalMultiplier: number, personal: number, global: number}>}
 */
export async function getXpMultiplier(userId) {
  try {
    let personalMultiplier = 0; // Additive bonus (0 = no bonus, 0.15 = 15% bonus)
    let globalMultiplier = 0;

    // Get personal XP booster from player_data
    const [playerData] = await db.execute(
      `SELECT active_xp_booster_personal FROM player_data WHERE user_id = ?`,
      [userId]
    );

    if (playerData.length > 0 && playerData[0].active_xp_booster_personal) {
      try {
        const personalBooster = JSON.parse(playerData[0].active_xp_booster_personal);

        // Check if booster is still active
        if (personalBooster.expires_at && new Date(personalBooster.expires_at) > new Date()) {
          personalMultiplier = personalBooster.multiplier - 1; // Convert 1.15 to 0.15
        } else {
          // Booster expired, clear it
          await db.execute(
            `UPDATE player_data SET active_xp_booster_personal = NULL WHERE user_id = ?`,
            [userId]
          );
        }
      } catch (error) {
        console.error('Error parsing personal XP booster:', error);
      }
    }

    // Get active global XP booster with activator name
    const [globalBooster] = await db.execute(
      `SELECT gq.multiplier, gq.expires_at, u.profile_username, u.id as activator_id
       FROM global_xp_booster_queue gq
       JOIN users u ON gq.activated_by_user_id = u.id
       WHERE gq.status = 'active' AND gq.expires_at > NOW()
       LIMIT 1`
    );

    let globalActivatorName = null;
    let globalActivatorId = null;
    if (globalBooster.length > 0) {
      globalMultiplier = globalBooster[0].multiplier - 1; // Convert 1.25 to 0.25
      globalActivatorName = globalBooster[0].profile_username;
      globalActivatorId = globalBooster[0].activator_id;
    }

    // Stack boosters additively
    const totalMultiplier = 1 + personalMultiplier + globalMultiplier;

    return {
      totalMultiplier, // e.g., 1.40 (for 15% + 25% = 40% total bonus)
      personal: personalMultiplier, // e.g., 0.15 (15% bonus)
      global: globalMultiplier, // e.g., 0.25 (25% bonus)
      globalActivatorName, // e.g., "PlayerName" or null
      globalActivatorId // e.g., 123 or null
    };

  } catch (error) {
    console.error('Error getting XP multiplier:', error);
    return {
      totalMultiplier: 1,
      personal: 0,
      global: 0
    };
  }
}
