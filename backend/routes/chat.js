/**
 * Chat Routes
 * Handles live chat functionality with SSE support
 */

import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateText } from '../utils/profanityFilter.js';
import chatSSEService from '../services/chatSSEService.js';

const router = express.Router();

/**
 * POST /api/chat/send
 * Send a chat message to a specific channel
 */
router.post('/send', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { channel, message } = req.body;

    // Validate channel
    const validChannels = ['global', 'guild', 'notification'];
    if (!channel || !validChannels.includes(channel)) {
      return res.status(400).json({ error: 'Invalid channel' });
    }

    // Validate message (max 200 characters, profanity filter)
    const validation = validateText(message, 200);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    // Get user's profile_username, equipped_title, and profile_avatar
    let userData;
    try {
      [userData] = await db.execute(
        'SELECT u.profile_username, u.equipped_title, up.profile_avatar FROM users u LEFT JOIN user_profile up ON u.id = up.user_id WHERE u.id = ?',
        [userId]
      );
    } catch (dbError) {
      console.error('Database query error (possibly missing column):', dbError);

      // If equipped_title column doesn't exist, provide helpful error
      if (dbError.code === 'ER_BAD_FIELD_ERROR') {
        return res.status(500).json({
          error: 'Database schema error: equipped_title column is missing. Please run the profile features migration.'
        });
      }
      throw dbError; // Re-throw other errors
    }

    if (!userData || userData.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { profile_username, equipped_title, profile_avatar } = userData[0];

    // Insert message into database
    // Convert undefined to null for SQL compatibility
    const [result] = await db.execute(
      `INSERT INTO chat_messages (user_id, profile_username, equipped_title, channel, message_text)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, profile_username, equipped_title || null, channel, validation.cleaned]
    );

    // Get the inserted message with timestamp
    const [insertedMessage] = await db.execute(
      'SELECT * FROM chat_messages WHERE id = ?',
      [result.insertId]
    );

    const messageData = {
      id: insertedMessage[0].id,
      user_id: insertedMessage[0].user_id,
      profile_username: insertedMessage[0].profile_username,
      equipped_title: insertedMessage[0].equipped_title,
      profile_avatar: profile_avatar || 'avatar_001',
      channel: insertedMessage[0].channel,
      message_text: insertedMessage[0].message_text,
      created_at: insertedMessage[0].created_at
    };

    // Broadcast message to all clients in the channel via SSE
    chatSSEService.broadcastMessage(channel, messageData);

    res.json({ success: true, message: messageData });
  } catch (error) {
    console.error('Send chat message error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

/**
 * GET /api/chat/history/:channel
 * Get recent chat history for a specific channel (last 50 messages)
 */
router.get('/history/:channel', authenticateToken, async (req, res) => {
  try {
    const { channel } = req.params;

    // Validate channel
    const validChannels = ['global', 'guild', 'notification', 'weather'];
    if (!validChannels.includes(channel)) {
      return res.status(400).json({ error: 'Invalid channel' });
    }

    // Get last 50 messages from this channel (most recent first, then reverse for chronological order)
    const [messages] = await db.execute(
      `SELECT cm.id, cm.user_id, cm.profile_username, cm.equipped_title, cm.channel, cm.message_text, cm.created_at, up.profile_avatar
       FROM chat_messages cm
       LEFT JOIN user_profile up ON cm.user_id = up.user_id
       WHERE cm.channel = ?
       ORDER BY cm.created_at DESC
       LIMIT 50`,
      [channel]
    );

    // Reverse to show oldest first
    const chronologicalMessages = messages.reverse();

    res.json({ messages: chronologicalMessages });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({ error: 'Failed to get chat history' });
  }
});

/**
 * GET /api/chat/stream/:channel
 * SSE endpoint for real-time chat updates
 */
router.get('/stream/:channel', (req, res) => {
  const { channel } = req.params;

  // Validate channel
  const validChannels = ['global', 'guild', 'notification'];
  if (!validChannels.includes(channel)) {
    return res.status(400).json({ error: 'Invalid channel' });
  }

  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Add client to chat SSE service
  chatSSEService.addClient(res, channel);

  console.log(`Chat SSE client connected to ${channel}. Total clients: ${chatSSEService.getClientCount(channel)}`);
});

/**
 * POST /api/chat/notification
 * Add a system notification to the notification channel (e.g., global catches)
 * This is for server-generated notifications, not user messages
 */
router.post('/notification', async (req, res) => {
  try {
    const { message, type } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Insert as system message (user_id NULL, profile_username 'System')
    const [result] = await db.execute(
      `INSERT INTO chat_messages (user_id, profile_username, equipped_title, channel, message_text)
       VALUES (NULL, ?, NULL, 'notification', ?)`,
      [type === 'global_catch' ? 'Global Catch' : 'System', message]
    );

    // Get the inserted message
    const [insertedMessage] = await db.execute(
      'SELECT * FROM chat_messages WHERE id = ?',
      [result.insertId]
    );

    const messageData = {
      id: insertedMessage[0].id,
      user_id: insertedMessage[0].user_id,
      profile_username: insertedMessage[0].profile_username,
      equipped_title: insertedMessage[0].equipped_title,
      channel: insertedMessage[0].channel,
      message_text: insertedMessage[0].message_text,
      created_at: insertedMessage[0].created_at,
      type: type || 'system'
    };

    // Broadcast to notification channel
    chatSSEService.broadcastMessage('notification', messageData);

    res.json({ success: true, message: messageData });
  } catch (error) {
    console.error('Send notification error:', error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

export default router;
