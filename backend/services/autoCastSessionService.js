/**
 * AutoCast Session Service
 *
 * Prevents multi-instance abuse by tracking active autocast sessions.
 * Only one autocast session allowed per user at a time.
 */

import crypto from 'crypto';

class AutoCastSessionService {
  constructor() {
    // Map: userId -> { sessionId, startTime, lastActivityTime }
    this.activeSessions = new Map();

    // Clean up stale sessions every minute
    this.cleanupInterval = setInterval(() => {
      this.cleanupStaleSessions();
    }, 60000); // 1 minute
  }

  /**
   * Generate a unique session ID
   * @returns {string} Session ID
   */
  generateSessionId() {
    return crypto.randomBytes(16).toString('hex');
  }

  /**
   * Start a new autocast session
   * @param {number} userId - User ID
   * @returns {object} { success: boolean, sessionId?: string, error?: string }
   */
  startSession(userId) {
    const existingSession = this.activeSessions.get(userId);

    if (existingSession) {
      // Check if session is still active (within last 30 seconds)
      const timeSinceLastActivity = Date.now() - existingSession.lastActivityTime;

      if (timeSinceLastActivity < 30000) { // 30 seconds
        console.log('[AutoCast] Multi-instance detected for user:', userId);
        return {
          success: false,
          error: 'An autocast session is already active. Please stop the other session first.'
        };
      } else {
        // Session is stale, allow new session
        console.log('[AutoCast] Replacing stale session for user:', userId);
      }
    }

    // Create new session
    const sessionId = this.generateSessionId();
    this.activeSessions.set(userId, {
      sessionId,
      startTime: Date.now(),
      lastActivityTime: Date.now()
    });

    console.log('[AutoCast] Started session for user:', userId, 'sessionId:', sessionId);

    return {
      success: true,
      sessionId
    };
  }

  /**
   * Validate an autocast request
   * @param {number} userId - User ID
   * @param {string} sessionId - Session ID from client
   * @returns {boolean} True if valid
   */
  validateSession(userId, sessionId) {
    const session = this.activeSessions.get(userId);

    if (!session) {
      console.log('[AutoCast] No active session for user:', userId);
      return false;
    }

    if (session.sessionId !== sessionId) {
      console.log('[AutoCast] Invalid session ID for user:', userId);
      return false;
    }

    // Update last activity time
    session.lastActivityTime = Date.now();

    return true;
  }

  /**
   * End an autocast session
   * @param {number} userId - User ID
   * @param {string} sessionId - Session ID from client
   * @returns {boolean} True if ended successfully
   */
  endSession(userId, sessionId) {
    const session = this.activeSessions.get(userId);

    if (!session) {
      return false;
    }

    if (session.sessionId !== sessionId) {
      console.log('[AutoCast] Cannot end session - invalid session ID for user:', userId);
      return false;
    }

    this.activeSessions.delete(userId);
    console.log('[AutoCast] Ended session for user:', userId);

    return true;
  }

  /**
   * Clean up stale sessions (no activity in 30+ seconds)
   */
  cleanupStaleSessions() {
    const now = Date.now();
    const staleThreshold = 30000; // 30 seconds

    let cleanedCount = 0;

    for (const [userId, session] of this.activeSessions.entries()) {
      const timeSinceLastActivity = now - session.lastActivityTime;

      if (timeSinceLastActivity > staleThreshold) {
        this.activeSessions.delete(userId);
        cleanedCount++;
        console.log('[AutoCast] Cleaned up stale session for user:', userId);
      }
    }

    if (cleanedCount > 0) {
      console.log('[AutoCast] Cleaned up', cleanedCount, 'stale sessions');
    }
  }

  /**
   * Get active session count
   * @returns {number} Number of active sessions
   */
  getActiveSessionCount() {
    return this.activeSessions.size;
  }

  /**
   * Cleanup on service shutdown
   */
  cleanup() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
}

// Export singleton instance
const autoCastSessionService = new AutoCastSessionService();
export default autoCastSessionService;
