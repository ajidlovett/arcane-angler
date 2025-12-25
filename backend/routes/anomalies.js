import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// =====================================================
// ANOMALY ATTACK & PARTICIPATION ROUTES
// =====================================================

/**
 * GET /api/anomalies/current
 * Get currently active anomaly event with player participation data
 */
router.get('/current', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;

    // Get current active event
    const [events] = await db.execute(`
      SELECT
        ae.id, ae.anomaly_id, ae.spawn_time, ae.end_time, ae.next_spawn_time,
        ae.current_hp, ae.max_hp, ae.status, ae.total_participants, ae.total_damage_dealt,
        a.name, a.description, a.primary_weakness, a.secondary_weakness, a.resistant_stat,
        a.image_url, a.base_fragment_reward, a.primary_multiplier, a.secondary_multiplier, a.resistant_multiplier
      FROM anomaly_events ae
      JOIN anomalies a ON ae.anomaly_id = a.id
      WHERE ae.status = 'active'
      ORDER BY ae.spawn_time DESC
      LIMIT 1
    `);

    if (events.length === 0) {
      return res.json({
        active: false,
        message: 'No active anomaly',
        nextSpawnTime: null
      });
    }

    const event = events[0];

    // Get player's participation in this event
    const [participation] = await db.execute(`
      SELECT damage_dealt, attacks_made, last_attack_time, gold_earned, fragments_earned, rewards_claimed
      FROM anomaly_participation
      WHERE event_id = ? AND user_id = ?
    `, [event.id, userId]);

    const playerParticipation = participation.length > 0 ? participation[0] : null;

    // Calculate damage percentage
    const damagePercentage = event.total_damage_dealt > 0
      ? ((playerParticipation?.damage_dealt || 0) / event.total_damage_dealt * 100).toFixed(2)
      : 0;

    // Get top 10 participants
    const [topParticipants] = await db.execute(`
      SELECT
        u.profile_username,
        ap.damage_dealt,
        ap.attacks_made,
        ROUND((ap.damage_dealt / GREATEST(ae.total_damage_dealt, 1)) * 100, 2) as damage_percentage
      FROM anomaly_participation ap
      JOIN users u ON ap.user_id = u.id
      JOIN anomaly_events ae ON ap.event_id = ae.id
      WHERE ap.event_id = ?
      ORDER BY ap.damage_dealt DESC
      LIMIT 10
    `, [event.id]);

    // Count active players (attacked in last 15 minutes)
    const [activeCount] = await db.execute(`
      SELECT COUNT(DISTINCT user_id) as active_players
      FROM anomaly_participation
      WHERE event_id = ? AND last_attack_time >= DATE_SUB(NOW(), INTERVAL 15 MINUTE)
    `, [event.id]);

    res.json({
      active: true,
      event: {
        id: event.id,
        anomaly: {
          name: event.name,
          description: event.description,
          primaryWeakness: event.primary_weakness,
          secondaryWeakness: event.secondary_weakness,
          resistantStat: event.resistant_stat,
          imageUrl: event.image_url,
          baseFragmentReward: event.base_fragment_reward,
          multipliers: {
            primary: event.primary_multiplier,
            secondary: event.secondary_multiplier,
            resistant: event.resistant_multiplier
          }
        },
        spawnTime: event.spawn_time,
        endTime: event.end_time,
        nextSpawnTime: event.next_spawn_time,
        currentHp: event.current_hp,
        maxHp: event.max_hp,
        hpPercentage: ((event.current_hp / event.max_hp) * 100).toFixed(2),
        totalParticipants: event.total_participants,
        activeParticipants: activeCount[0].active_players,
        totalDamage: event.total_damage_dealt
      },
      playerParticipation: playerParticipation ? {
        damagDealt: playerParticipation.damage_dealt,
        attacksMade: playerParticipation.attacks_made,
        lastAttackTime: playerParticipation.last_attack_time,
        damagePercentage: damagePercentage,
        goldEarned: playerParticipation.gold_earned,
        fragmentsEarned: playerParticipation.fragments_earned,
        rewardsClaimed: playerParticipation.rewards_claimed
      } : null,
      leaderboard: topParticipants
    });

  } catch (error) {
    console.error('Error fetching current anomaly:', error);
    res.status(500).json({ error: 'Failed to fetch current anomaly' });
  }
});

/**
 * POST /api/anomalies/attack
 * Attack the current anomaly with selected stat
 */
router.post('/attack', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { statUsed } = req.body;

    // Validate stat selection
    const validStats = ['strength', 'intelligence', 'luck', 'stamina'];
    if (!statUsed || !validStats.includes(statUsed)) {
      return res.status(400).json({ error: 'Invalid stat selected' });
    }

    // Get current active event
    const [events] = await db.execute(`
      SELECT ae.*, a.primary_weakness, a.secondary_weakness, a.resistant_stat,
             a.primary_multiplier, a.secondary_multiplier, a.resistant_multiplier,
             a.name as anomaly_name
      FROM anomaly_events ae
      JOIN anomalies a ON ae.anomaly_id = a.id
      WHERE ae.status = 'active'
      LIMIT 1
    `);

    if (events.length === 0) {
      return res.status(404).json({ error: 'No active anomaly to attack' });
    }

    const event = events[0];

    // Check if event is ended (5 min before next spawn)
    if (event.end_time && new Date() >= new Date(event.end_time)) {
      return res.status(400).json({ error: 'This anomaly has ended. New anomaly spawning soon!' });
    }

    // Get player stats and equipped rod
    const [playerData] = await db.execute(`
      SELECT pd.level, pd.equipped_rod, ps.strength, ps.intelligence, ps.luck, ps.stamina
      FROM player_data pd
      JOIN player_stats ps ON pd.user_id = ps.user_id
      WHERE pd.user_id = ?
    `, [userId]);

    if (playerData.length === 0) {
      return res.status(404).json({ error: 'Player data not found' });
    }

    const player = playerData[0];
    const playerStatValue = player[statUsed];

    // Check attack cooldown (6 seconds)
    const [lastAttack] = await db.execute(`
      SELECT last_attack_time
      FROM anomaly_participation
      WHERE event_id = ? AND user_id = ?
    `, [event.id, userId]);

    if (lastAttack.length > 0 && lastAttack[0].last_attack_time) {
      const lastAttackTime = new Date(lastAttack[0].last_attack_time);
      const timeSinceLastAttack = Date.now() - lastAttackTime.getTime();
      const MIN_ATTACK_INTERVAL = 5500; // 5.5 seconds (allow 500ms variance)

      if (timeSinceLastAttack < MIN_ATTACK_INTERVAL) {
        const cooldownRemaining = Math.ceil((MIN_ATTACK_INTERVAL - timeSinceLastAttack) / 1000);
        return res.status(429).json({
          error: 'Attack too fast! Wait 6 seconds between attacks.',
          cooldown: cooldownRemaining
        });
      }
    }

    // Calculate damage based on stat weakness/resistance
    let multiplier = 1.0;
    if (statUsed === event.primary_weakness) {
      multiplier = event.primary_multiplier;
    } else if (statUsed === event.secondary_weakness) {
      multiplier = event.secondary_multiplier;
    } else if (statUsed === event.resistant_stat) {
      multiplier = event.resistant_multiplier;
    }

    // TODO: Add equipment bonus from rod (future enhancement)
    const baseDamage = playerStatValue;
    const finalDamage = Math.floor(baseDamage * multiplier);

    // Update or create participation record
    await db.execute(`
      INSERT INTO anomaly_participation
        (event_id, user_id, damage_dealt, attacks_made, last_attack_time, first_attack_at, last_attack_at)
      VALUES (?, ?, ?, 1, NOW(), NOW(), NOW())
      ON DUPLICATE KEY UPDATE
        damage_dealt = damage_dealt + ?,
        attacks_made = attacks_made + 1,
        last_attack_time = NOW(),
        last_attack_at = NOW()
    `, [event.id, userId, finalDamage, finalDamage]);

    // Update event HP and total damage
    const newHp = Math.max(0, event.current_hp - finalDamage);
    await db.execute(`
      UPDATE anomaly_events
      SET current_hp = ?,
          total_damage_dealt = total_damage_dealt + ?,
          total_participants = (
            SELECT COUNT(DISTINCT user_id)
            FROM anomaly_participation
            WHERE event_id = ?
          )
      WHERE id = ?
    `, [newHp, finalDamage, event.id, event.id]);

    // Record attack stats for analytics
    await db.execute(`
      INSERT INTO anomaly_attack_stats (event_id, user_id, stat_used, damage_dealt, multiplier_applied)
      VALUES (?, ?, ?, ?, ?)
    `, [event.id, userId, statUsed, finalDamage, multiplier]);

    // Check if boss is defeated
    let defeated = false;
    if (newHp <= 0) {
      await db.execute(`
        UPDATE anomaly_events
        SET status = 'defeated', defeated_at = NOW()
        WHERE id = ?
      `, [event.id]);
      defeated = true;

      // Calculate and distribute rewards to all participants
      await calculateAndDistributeRewards(event.id);
    }

    res.json({
      success: true,
      attack: {
        statUsed,
        baseDamage,
        multiplier,
        finalDamage,
        effectiveness: multiplier > 1 ? 'super_effective' : multiplier < 1 ? 'not_effective' : 'normal'
      },
      anomaly: {
        name: event.anomaly_name,
        currentHp: newHp,
        maxHp: event.max_hp,
        hpPercentage: ((newHp / event.max_hp) * 100).toFixed(2),
        defeated
      }
    });

  } catch (error) {
    console.error('Error attacking anomaly:', error);
    res.status(500).json({ error: 'Failed to attack anomaly' });
  }
});

/**
 * GET /api/anomalies/history
 * Get player's last 5 participated anomaly events
 */
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;

    const [history] = await db.execute(`
      SELECT
        ae.id, ae.spawn_time, ae.defeated_at, ae.status,
        a.name as anomaly_name,
        ap.damage_dealt, ap.attacks_made, ap.gold_earned, ap.fragments_earned,
        ROUND((ap.damage_dealt / GREATEST(ae.total_damage_dealt, 1)) * 100, 2) as damage_percentage,
        ae.total_participants
      FROM anomaly_participation ap
      JOIN anomaly_events ae ON ap.event_id = ae.id
      JOIN anomalies a ON ae.anomaly_id = a.id
      WHERE ap.user_id = ?
      ORDER BY ae.spawn_time DESC
      LIMIT 5
    `, [userId]);

    res.json({ history });

  } catch (error) {
    console.error('Error fetching anomaly history:', error);
    res.status(500).json({ error: 'Failed to fetch anomaly history' });
  }
});

/**
 * Helper function: Calculate and distribute rewards
 */
async function calculateAndDistributeRewards(eventId) {
  try {
    // Get event details
    const [eventData] = await db.execute(`
      SELECT ae.total_damage_dealt, a.base_fragment_reward
      FROM anomaly_events ae
      JOIN anomalies a ON ae.anomaly_id = a.id
      WHERE ae.id = ?
    `, [eventId]);

    if (eventData.length === 0) return;

    const { total_damage_dealt, base_fragment_reward } = eventData[0];

    // Get all participants
    const [participants] = await db.execute(`
      SELECT ap.user_id, ap.damage_dealt, pd.level
      FROM anomaly_participation ap
      JOIN player_data pd ON ap.user_id = pd.user_id
      WHERE ap.event_id = ?
    `, [eventId]);

    // Calculate rewards for each participant
    for (const participant of participants) {
      const damagePercentage = (participant.damage_dealt / total_damage_dealt) * 100;

      // Gold calculation
      const baseGold = participant.level * (Math.floor(Math.random() * 101) + 100); // level × (100-200)
      const contributionBonus = Math.floor(damagePercentage * 50);
      const totalGold = baseGold + contributionBonus;

      // Fragment calculation
      let totalFragments = base_fragment_reward; // Base participation reward
      totalFragments += Math.floor(damagePercentage / 2); // 10% damage = +5 fragments
      if (damagePercentage >= 10) totalFragments += 5;
      if (damagePercentage >= 20) totalFragments += 10;

      // Update participation record with rewards
      await db.execute(`
        UPDATE anomaly_participation
        SET gold_earned = ?, fragments_earned = ?
        WHERE event_id = ? AND user_id = ?
      `, [totalGold, totalFragments, eventId, participant.user_id]);
    }

  } catch (error) {
    console.error('Error calculating rewards:', error);
  }
}

/**
 * POST /api/anomalies/claim-rewards
 * Claim rewards from defeated anomaly (auto-claimed on new spawn, but manual option available)
 */
router.post('/claim-rewards', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({ error: 'Event ID required' });
    }

    // Get participation record
    const [participation] = await db.execute(`
      SELECT gold_earned, fragments_earned, rewards_claimed
      FROM anomaly_participation
      WHERE event_id = ? AND user_id = ?
    `, [eventId, userId]);

    if (participation.length === 0) {
      return res.status(404).json({ error: 'No participation found for this event' });
    }

    const { gold_earned, fragments_earned, rewards_claimed } = participation[0];

    if (rewards_claimed) {
      return res.status(400).json({ error: 'Rewards already claimed' });
    }

    // Add rewards to player_data
    await db.execute(`
      UPDATE player_data
      SET gold = gold + ?,
          anomaly_fragments = anomaly_fragments + ?
      WHERE user_id = ?
    `, [gold_earned, fragments_earned, userId]);

    // Mark rewards as claimed
    await db.execute(`
      UPDATE anomaly_participation
      SET rewards_claimed = TRUE
      WHERE event_id = ? AND user_id = ?
    `, [eventId, userId]);

    res.json({
      success: true,
      rewards: {
        gold: gold_earned,
        fragments: fragments_earned
      }
    });

  } catch (error) {
    console.error('Error claiming rewards:', error);
    res.status(500).json({ error: 'Failed to claim rewards' });
  }
});

/**
 * Auto-claim unclaimed rewards from previous events
 * Called when new anomaly spawns
 */
async function autoClaimPendingRewards(userId) {
  try {
    // Find all unclaimed rewards
    const [unclaimedRewards] = await db.execute(`
      SELECT event_id, gold_earned, fragments_earned
      FROM anomaly_participation
      WHERE user_id = ? AND rewards_claimed = FALSE AND gold_earned > 0
    `, [userId]);

    if (unclaimedRewards.length === 0) return;

    let totalGold = 0;
    let totalFragments = 0;

    for (const reward of unclaimedRewards) {
      totalGold += reward.gold_earned;
      totalFragments += reward.fragments_earned;

      // Mark as claimed
      await db.execute(`
        UPDATE anomaly_participation
        SET rewards_claimed = TRUE
        WHERE event_id = ? AND user_id = ?
      `, [reward.event_id, userId]);
    }

    // Add to player_data
    await db.execute(`
      UPDATE player_data
      SET gold = gold + ?,
          anomaly_fragments = anomaly_fragments + ?
      WHERE user_id = ?
    `, [totalGold, totalFragments, userId]);

    console.log(`Auto-claimed ${totalGold} gold and ${totalFragments} fragments for user ${userId}`);

  } catch (error) {
    console.error('Error auto-claiming rewards:', error);
  }
}

// Export for use in other modules
export default router;
export { autoClaimPendingRewards, calculateAndDistributeRewards };
