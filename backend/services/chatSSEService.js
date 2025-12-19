/**
 * Chat Server-Sent Events (SSE) Service
 *
 * Manages SSE connections for real-time chat updates across different channels.
 * Supports global, guild, and notification channels.
 */

class ChatSSEService {
  constructor() {
    // Map of channel -> Set of client connections
    this.channels = {
      global: new Set(),
      guild: new Set(),
      notification: new Set()
    };
  }

  /**
   * Add a new SSE client connection to a specific channel
   * @param {Response} res - Express response object
   * @param {string} channel - Channel name (global, guild, notification)
   */
  addClient(res, channel = 'global') {
    if (!this.channels[channel]) {
      console.error(`Invalid channel: ${channel}`);
      return;
    }

    this.channels[channel].add(res);

    // Send a comment to keep connection alive
    res.write(': Chat SSE connection established\n\n');

    // Remove client on connection close
    res.on('close', () => {
      this.channels[channel].delete(res);
      console.log(`Client disconnected from ${channel}. Remaining: ${this.channels[channel].size}`);
    });
  }

  /**
   * Broadcast a chat message to all clients in a specific channel
   * @param {string} channel - Channel to broadcast to
   * @param {Object} messageData - { id, user_id, profile_username, equipped_title, message_text, created_at }
   */
  broadcastMessage(channel, messageData) {
    if (!this.channels[channel]) {
      console.error(`Invalid channel for broadcast: ${channel}`);
      return;
    }

    const data = JSON.stringify(messageData);
    const message = `data: ${data}\n\n`;

    // Send to all connected clients in this channel
    this.channels[channel].forEach(client => {
      try {
        client.write(message);
      } catch (error) {
        console.error(`Error sending SSE message to ${channel}:`, error);
        this.channels[channel].delete(client);
      }
    });
  }

  /**
   * Get number of connected clients for a channel
   * @param {string} channel - Channel name
   */
  getClientCount(channel) {
    return this.channels[channel] ? this.channels[channel].size : 0;
  }

  /**
   * Get total number of connected clients across all channels
   */
  getTotalClientCount() {
    return Object.values(this.channels).reduce((sum, clients) => sum + clients.size, 0);
  }
}

// Export singleton instance
const chatSSEService = new ChatSSEService();
export default chatSSEService;
