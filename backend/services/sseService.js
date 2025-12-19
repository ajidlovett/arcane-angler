/**
 * Server-Sent Events (SSE) Service
 *
 * Manages SSE connections for real-time global catch notifications.
 * Replaces polling with push notifications from server to clients.
 */

class SSEService {
  constructor() {
    this.clients = new Set();
  }

  /**
   * Add a new SSE client connection
   * @param {Response} res - Express response object
   */
  addClient(res) {
    this.clients.add(res);

    // Send a comment to keep connection alive
    res.write(': SSE connection established\n\n');

    // Remove client on connection close
    res.on('close', () => {
      this.clients.delete(res);
    });
  }

  /**
   * Broadcast a global catch event to all connected clients
   * @param {Object} catchData - { profile_username, fish_name, rarity, caught_at }
   */
  broadcastGlobalCatch(catchData) {
    const data = JSON.stringify(catchData);
    const message = `data: ${data}\n\n`;

    // Send to all connected clients
    this.clients.forEach(client => {
      try {
        client.write(message);
      } catch (error) {
        console.error('Error sending SSE message:', error);
        this.clients.delete(client);
      }
    });
  }

  /**
   * Get number of connected clients (for monitoring)
   */
  getClientCount() {
    return this.clients.size;
  }
}

// Export singleton instance
const sseService = new SSEService();
export default sseService;
