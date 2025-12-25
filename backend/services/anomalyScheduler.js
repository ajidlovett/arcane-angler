import db from '../db.js';
import { processGlobalBoosterQueue } from '../routes/fragmentShop.js';
import { autoClaimPendingRewards, calculateAndDistributeRewards } from '../routes/anomalies.js';

// =====================================================
// ANOMALY SPAWN SCHEDULER
// =====================================================

class AnomalyScheduler {
  constructor() {
    this.spawnInterval = null;
    this.queueCheckInterval = null;
    this.rewardCheckInterval = null;
  }

  /**
   * Start the anomaly spawn scheduler
   */
  async start() {
    console.log('🎣 Anomaly Scheduler starting...');

    // Initialize first anomaly if none exists
    await this.initializeFirstAnomaly();

    // Check every minute for:
    // - End time reached (make current anomaly unavailable)
    // - Next spawn time reached (spawn new anomaly)
    this.spawnInterval = setInterval(() => {
      this.checkAnomalySpawn();
    }, 60 * 1000); // Every 1 minute

    // Check global booster queue every minute
    this.queueCheckInterval = setInterval(() => {
      processGlobalBoosterQueue();
    }, 60 * 1000); // Every 1 minute

    // Check for defeated bosses and distribute rewards
    this.rewardCheckInterval = setInterval(() => {
      this.checkDefeatedBosses();
    }, 30 * 1000); // Every 30 seconds

    console.log('✅ Anomaly Scheduler started successfully');
  }

  /**
   * Stop the scheduler
   */
  stop() {
    if (this.spawnInterval) {
      clearInterval(this.spawnInterval);
      this.spawnInterval = null;
    }
    if (this.queueCheckInterval) {
      clearInterval(this.queueCheckInterval);
      this.queueCheckInterval = null;
    }
    if (this.rewardCheckInterval) {
      clearInterval(this.rewardCheckInterval);
      this.rewardCheckInterval = null;
    }
    console.log('🛑 Anomaly Scheduler stopped');
  }

  /**
   * Initialize first anomaly if database is empty
   */
  async initializeFirstAnomaly() {
    try {
      const [existingEvents] = await db.execute(`
        SELECT id FROM anomaly_events WHERE status = 'active' LIMIT 1
      `);

      if (existingEvents.length === 0) {
        console.log('No active anomaly found. Spawning initial anomaly...');
        await this.spawnNewAnomaly();
      } else {
        console.log('Active anomaly found. No initialization needed.');
      }
    } catch (error) {
      console.error('Error initializing first anomaly:', error);
    }
  }

  /**
   * Check if it's time to end current anomaly or spawn new one
   */
  async checkAnomalySpawn() {
    try {
      const now = new Date();

      // Get current active event
      const [activeEvents] = await db.execute(`
        SELECT id, end_time, next_spawn_time, status
        FROM anomaly_events
        WHERE status = 'active'
        LIMIT 1
      `);

      if (activeEvents.length === 0) {
        // No active event, check if we should spawn one
        const [endedEvents] = await db.execute(`
          SELECT id, next_spawn_time
          FROM anomaly_events
          WHERE status = 'ended' AND next_spawn_time <= NOW()
          ORDER BY next_spawn_time ASC
          LIMIT 1
        `);

        if (endedEvents.length > 0) {
          console.log('⏰ Time to spawn new anomaly!');
          await this.spawnNewAnomaly();
        }
        return;
      }

      const event = activeEvents[0];

      // Check if end_time is set and reached (5 min before next spawn)
      if (event.end_time && now >= new Date(event.end_time)) {
        console.log('⚠️ Current anomaly ending (5 min before next spawn)');
        await this.endCurrentAnomaly(event.id);
        return;
      }

      // Check if next_spawn_time reached
      if (event.next_spawn_time && now >= new Date(event.next_spawn_time)) {
        console.log('🎯 Next spawn time reached!');
        await this.endCurrentAnomaly(event.id);
        await this.spawnNewAnomaly();
      }

    } catch (error) {
      console.error('Error checking anomaly spawn:', error);
    }
  }

  /**
   * End current anomaly event
   */
  async endCurrentAnomaly(eventId) {
    try {
      // Auto-claim pending rewards for all participants
      const [participants] = await db.execute(`
        SELECT DISTINCT user_id
        FROM anomaly_participation
        WHERE event_id = ?
      `, [eventId]);

      console.log(`Auto-claiming rewards for ${participants.length} participants...`);

      for (const participant of participants) {
        await autoClaimPendingRewards(participant.user_id);
      }

      // Mark event as ended
      await db.execute(`
        UPDATE anomaly_events
        SET status = 'ended'
        WHERE id = ?
      `, [eventId]);

      console.log(`✅ Anomaly event ${eventId} ended and rewards auto-claimed`);

    } catch (error) {
      console.error('Error ending anomaly:', error);
    }
  }

  /**
   * Spawn a new random anomaly
   */
  async spawnNewAnomaly() {
    try {
      // Get random anomaly that wasn't spawned in the last 5 events
      const [recentAnomalies] = await db.execute(`
        SELECT DISTINCT anomaly_id
        FROM anomaly_events
        ORDER BY spawn_time DESC
        LIMIT 5
      `);

      const recentIds = recentAnomalies.map(a => a.anomaly_id);
      const excludeClause = recentIds.length > 0
        ? `WHERE id NOT IN (${recentIds.join(',')})`
        : '';

      const [availableAnomalies] = await db.execute(`
        SELECT id, name, max_hp
        FROM anomalies
        ${excludeClause}
        ORDER BY RAND()
        LIMIT 1
      `);

      if (availableAnomalies.length === 0) {
        // If all anomalies were recent, just pick any random one
        const [anyAnomaly] = await db.execute(`
          SELECT id, name, max_hp
          FROM anomalies
          ORDER BY RAND()
          LIMIT 1
        `);
        availableAnomalies.push(anyAnomaly[0]);
      }

      const selectedAnomaly = availableAnomalies[0];

      // Calculate random spawn duration (6-12 hours)
      const spawnDurationHours = Math.floor(Math.random() * 7) + 6; // 6-12 hours
      const nextSpawnTime = new Date(Date.now() + spawnDurationHours * 60 * 60 * 1000);
      const endTime = new Date(nextSpawnTime.getTime() - 5 * 60 * 1000); // 5 min before next spawn

      // Calculate base HP (will scale with active players)
      const baseHp = selectedAnomaly.max_hp;

      // Create new event
      const [result] = await db.execute(`
        INSERT INTO anomaly_events
          (anomaly_id, spawn_time, end_time, next_spawn_time, current_hp, max_hp, status)
        VALUES (?, NOW(), ?, ?, ?, ?, 'active')
      `, [selectedAnomaly.id, endTime, nextSpawnTime, baseHp, baseHp]);

      console.log(`🌊 New anomaly spawned: ${selectedAnomaly.name}`);
      console.log(`   HP: ${baseHp.toLocaleString()}`);
      console.log(`   Next spawn: ${nextSpawnTime.toISOString()}`);
      console.log(`   End time: ${endTime.toISOString()}`);

      return result.insertId;

    } catch (error) {
      console.error('Error spawning new anomaly:', error);
    }
  }

  /**
   * Check for defeated bosses and calculate rewards
   */
  async checkDefeatedBosses() {
    try {
      // Find recently defeated bosses that haven't had rewards distributed
      const [defeatedBosses] = await db.execute(`
        SELECT ae.id, ae.anomaly_id
        FROM anomaly_events ae
        WHERE ae.status = 'defeated'
          AND ae.defeated_at >= DATE_SUB(NOW(), INTERVAL 1 MINUTE)
          AND NOT EXISTS (
            SELECT 1
            FROM anomaly_participation ap
            WHERE ap.event_id = ae.id AND ap.gold_earned > 0
            LIMIT 1
          )
      `);

      for (const boss of defeatedBosses) {
        console.log(`💰 Calculating rewards for defeated boss ${boss.id}...`);
        await calculateAndDistributeRewards(boss.id);
      }

    } catch (error) {
      console.error('Error checking defeated bosses:', error);
    }
  }

  /**
   * Scale anomaly HP based on active player count
   * Called periodically to adjust difficulty dynamically
   */
  async scaleAnomalyHP() {
    try {
      const [activeEvents] = await db.execute(`
        SELECT id, anomaly_id
        FROM anomaly_events
        WHERE status = 'active'
        LIMIT 1
      `);

      if (activeEvents.length === 0) return;

      const event = activeEvents[0];

      // Count active players (attacked in last 15 minutes)
      const [activeCount] = await db.execute(`
        SELECT COUNT(DISTINCT user_id) as active_players
        FROM anomaly_participation
        WHERE event_id = ? AND last_attack_time >= DATE_SUB(NOW(), INTERVAL 15 MINUTE)
      `, [event.id]);

      const activePlayers = activeCount[0].active_players || 1;

      // Get base HP
      const [anomalyData] = await db.execute(`
        SELECT max_hp FROM anomalies WHERE id = ?
      `, [event.anomaly_id]);

      const baseHp = anomalyData[0].max_hp;

      // Calculate scaled HP using logarithmic scaling
      const scaledMaxHp = Math.floor(baseHp * (1 + Math.log10(activePlayers)));

      // Update max_hp if significantly different (to avoid constant small changes)
      const [currentEvent] = await db.execute(`
        SELECT max_hp FROM anomaly_events WHERE id = ?
      `, [event.id]);

      const currentMaxHp = currentEvent[0].max_hp;
      const hpDifference = Math.abs(currentMaxHp - scaledMaxHp);

      if (hpDifference > baseHp * 0.1) { // Only update if 10%+ difference
        const hpRatio = scaledMaxHp / currentMaxHp;

        await db.execute(`
          UPDATE anomaly_events
          SET max_hp = ?,
              current_hp = GREATEST(0, FLOOR(current_hp * ?))
          WHERE id = ?
        `, [scaledMaxHp, hpRatio, event.id]);

        console.log(`⚖️ Scaled anomaly HP: ${currentMaxHp.toLocaleString()} → ${scaledMaxHp.toLocaleString()} (${activePlayers} active players)`);
      }

    } catch (error) {
      console.error('Error scaling anomaly HP:', error);
    }
  }
}

// Singleton instance
const anomalyScheduler = new AnomalyScheduler();

export default anomalyScheduler;
