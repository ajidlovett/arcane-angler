import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get friends list
router.get('/list', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;

        const [friends] = await db.query(
            `SELECT
                f.id,
                f.friend_id,
                u.username,
                u.profileUsername,
                u.equipped_title,
                f.created_at
             FROM friends f
             JOIN users u ON (
                 CASE
                     WHEN f.user_id = ? THEN f.friend_id = u.id
                     ELSE f.user_id = u.id
                 END
             )
             WHERE (f.user_id = ? OR f.friend_id = ?)
             AND f.status = 'accepted'
             ORDER BY f.created_at DESC`,
            [userId, userId, userId]
        );

        res.json({ friends });
    } catch (error) {
        console.error('Error fetching friends:', error);
        res.status(500).json({ error: 'Failed to fetch friends' });
    }
});

// Get friend requests (pending)
router.get('/requests', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;

        // Get incoming requests (where current user is the friend_id)
        const [incoming] = await db.query(
            `SELECT
                f.id,
                f.user_id as requester_id,
                u.username,
                u.profileUsername,
                u.equipped_title,
                f.created_at
             FROM friends f
             JOIN users u ON f.requester_id = u.id
             WHERE f.friend_id = ?
             AND f.status = 'pending'
             ORDER BY f.created_at DESC`,
            [userId]
        );

        // Get outgoing requests (where current user is the requester)
        const [outgoing] = await db.query(
            `SELECT
                f.id,
                f.friend_id,
                u.username,
                u.profileUsername,
                u.equipped_title,
                f.created_at
             FROM friends f
             JOIN users u ON f.friend_id = u.id
             WHERE f.requester_id = ?
             AND f.status = 'pending'
             ORDER BY f.created_at DESC`,
            [userId]
        );

        res.json({ incoming, outgoing });
    } catch (error) {
        console.error('Error fetching friend requests:', error);
        res.status(500).json({ error: 'Failed to fetch friend requests' });
    }
});

// Send friend request
router.post('/send/:targetUserId', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const targetUserId = parseInt(req.params.targetUserId);

        if (userId === targetUserId) {
            return res.status(400).json({ error: 'Cannot send friend request to yourself' });
        }

        // Check if target user exists
        const [targetUser] = await db.query(
            'SELECT id FROM users WHERE id = ?',
            [targetUserId]
        );

        if (targetUser.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if friendship already exists (any status)
        const [existing] = await db.query(
            `SELECT * FROM friends
             WHERE (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?)`,
            [userId, targetUserId, targetUserId, userId]
        );

        if (existing.length > 0) {
            if (existing[0].status === 'accepted') {
                return res.status(400).json({ error: 'Already friends' });
            } else if (existing[0].status === 'pending') {
                return res.status(400).json({ error: 'Friend request already sent' });
            } else {
                // If declined, allow sending again
                await db.query('DELETE FROM friends WHERE id = ?', [existing[0].id]);
            }
        }

        // Check pending request limit
        const [pendingCount] = await db.query(
            'SELECT COUNT(*) as count FROM friends WHERE requester_id = ? AND status = "pending"',
            [userId]
        );

        if (pendingCount[0].count >= 50) {
            return res.status(400).json({ error: 'Too many pending friend requests. Maximum 50.' });
        }

        // Create friend request (bidirectional entries)
        await db.query(
            `INSERT INTO friends (user_id, friend_id, status, requester_id)
             VALUES (?, ?, 'pending', ?), (?, ?, 'pending', ?)`,
            [userId, targetUserId, userId, targetUserId, userId, userId]
        );

        res.json({ success: true });
    } catch (error) {
        console.error('Error sending friend request:', error);
        res.status(500).json({ error: 'Failed to send friend request' });
    }
});

// Accept friend request
router.post('/accept/:requestId', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const requestId = parseInt(req.params.requestId);

        // Verify this request is for the current user
        const [request] = await db.query(
            'SELECT * FROM friends WHERE id = ? AND friend_id = ? AND status = "pending"',
            [requestId, userId]
        );

        if (request.length === 0) {
            return res.status(404).json({ error: 'Friend request not found' });
        }

        const requesterId = request[0].requester_id;

        // Update both friendship entries to accepted
        await db.query(
            `UPDATE friends SET status = 'accepted'
             WHERE ((user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?))
             AND requester_id = ?`,
            [userId, requesterId, requesterId, userId, requesterId]
        );

        res.json({ success: true });
    } catch (error) {
        console.error('Error accepting friend request:', error);
        res.status(500).json({ error: 'Failed to accept friend request' });
    }
});

// Decline friend request
router.post('/decline/:requestId', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const requestId = parseInt(req.params.requestId);

        // Verify this request is for the current user
        const [request] = await db.query(
            'SELECT * FROM friends WHERE id = ? AND friend_id = ? AND status = "pending"',
            [requestId, userId]
        );

        if (request.length === 0) {
            return res.status(404).json({ error: 'Friend request not found' });
        }

        const requesterId = request[0].requester_id;

        // Delete both friendship entries
        await db.query(
            `DELETE FROM friends
             WHERE ((user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?))
             AND requester_id = ?`,
            [userId, requesterId, requesterId, userId, requesterId]
        );

        res.json({ success: true });
    } catch (error) {
        console.error('Error declining friend request:', error);
        res.status(500).json({ error: 'Failed to decline friend request' });
    }
});

// Remove friend
router.delete('/remove/:friendId', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const friendId = parseInt(req.params.friendId);

        // Delete both friendship entries
        await db.query(
            `DELETE FROM friends
             WHERE (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?)`,
            [userId, friendId, friendId, userId]
        );

        res.json({ success: true });
    } catch (error) {
        console.error('Error removing friend:', error);
        res.status(500).json({ error: 'Failed to remove friend' });
    }
});

// Check if users are friends
router.get('/check/:targetUserId', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const targetUserId = parseInt(req.params.targetUserId);

        const [friendship] = await db.query(
            `SELECT status FROM friends
             WHERE ((user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?))
             LIMIT 1`,
            [userId, targetUserId, targetUserId, userId]
        );

        if (friendship.length === 0) {
            return res.json({ status: 'none' });
        }

        res.json({ status: friendship[0].status });
    } catch (error) {
        console.error('Error checking friendship:', error);
        res.status(500).json({ error: 'Failed to check friendship' });
    }
});

export default router;
