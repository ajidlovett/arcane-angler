const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');
const { validateText } = require('../utils/profanityFilter');
const router = express.Router();

// Get comments for a profile
router.get('/:userId', authenticateToken, async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        const [comments] = await db.query(
            `SELECT
                c.id,
                c.commenter_id,
                c.commenter_username,
                c.commenter_title,
                c.comment_text,
                c.created_at,
                c.updated_at
             FROM profile_comments c
             WHERE c.profile_user_id = ?
             ORDER BY c.created_at DESC
             LIMIT ? OFFSET ?`,
            [userId, limit, offset]
        );

        // Get total count
        const [count] = await db.query(
            'SELECT COUNT(*) as total FROM profile_comments WHERE profile_user_id = ?',
            [userId]
        );

        res.json({
            comments,
            total: count[0].total,
            hasMore: (offset + limit) < count[0].total
        });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});

// Post a comment
router.post('/:userId', authenticateToken, async (req, res) => {
    try {
        const commenterId = req.user.userId;
        const profileUserId = parseInt(req.params.userId);
        const { commentText } = req.body;

        if (!commentText) {
            return res.status(400).json({ error: 'Comment text is required' });
        }

        // Validate text
        const validation = validateText(commentText, 500);
        if (!validation.valid) {
            return res.status(400).json({ error: validation.error });
        }

        // Check if profile allows comments
        const [profileUser] = await db.query(
            'SELECT allow_comments FROM users WHERE id = ?',
            [profileUserId]
        );

        if (profileUser.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!profileUser[0].allow_comments) {
            return res.status(403).json({ error: 'This user has disabled comments' });
        }

        // Get commenter info
        const [commenter] = await db.query(
            'SELECT profileUsername, equipped_title FROM users WHERE id = ?',
            [commenterId]
        );

        // Insert comment
        const [result] = await db.query(
            `INSERT INTO profile_comments
             (profile_user_id, commenter_id, commenter_username, commenter_title, comment_text)
             VALUES (?, ?, ?, ?, ?)`,
            [profileUserId, commenterId, commenter[0].profileUsername, commenter[0].equipped_title, validation.cleaned]
        );

        res.json({
            success: true,
            comment: {
                id: result.insertId,
                commenter_id: commenterId,
                commenter_username: commenter[0].profileUsername,
                commenter_title: commenter[0].equipped_title,
                comment_text: validation.cleaned,
                created_at: new Date()
            }
        });
    } catch (error) {
        console.error('Error posting comment:', error);
        res.status(500).json({ error: 'Failed to post comment' });
    }
});

// Delete own comment
router.delete('/:commentId', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const commentId = parseInt(req.params.commentId);

        // Get comment to check ownership or if user is profile owner
        const [comment] = await db.query(
            'SELECT commenter_id, profile_user_id FROM profile_comments WHERE id = ?',
            [commentId]
        );

        if (comment.length === 0) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Allow deletion if: comment author OR profile owner
        if (comment[0].commenter_id !== userId && comment[0].profile_user_id !== userId) {
            return res.status(403).json({ error: 'Not authorized to delete this comment' });
        }

        await db.query('DELETE FROM profile_comments WHERE id = ?', [commentId]);

        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Failed to delete comment' });
    }
});

// Update comment (within 5 minutes of posting)
router.put('/:commentId', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const commentId = parseInt(req.params.commentId);
        const { commentText } = req.body;

        if (!commentText) {
            return res.status(400).json({ error: 'Comment text is required' });
        }

        // Validate text
        const validation = validateText(commentText, 500);
        if (!validation.valid) {
            return res.status(400).json({ error: validation.error });
        }

        // Get comment
        const [comment] = await db.query(
            'SELECT commenter_id, created_at FROM profile_comments WHERE id = ?',
            [commentId]
        );

        if (comment.length === 0) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Check ownership
        if (comment[0].commenter_id !== userId) {
            return res.status(403).json({ error: 'Not authorized to edit this comment' });
        }

        // Check if within 5 minutes
        const createdAt = new Date(comment[0].created_at);
        const now = new Date();
        const minutesSince = (now - createdAt) / 1000 / 60;

        if (minutesSince > 5) {
            return res.status(403).json({ error: 'Can only edit comments within 5 minutes of posting' });
        }

        // Update comment
        await db.query(
            'UPDATE profile_comments SET comment_text = ? WHERE id = ?',
            [validation.cleaned, commentId]
        );

        res.json({ success: true, comment_text: validation.cleaned });
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ error: 'Failed to update comment' });
    }
});

module.exports = router;
