import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';
import emailService from '../services/email.js';
import { authLimiter, passwordResetLimiter } from '../middleware/rateLimiter.js';
import questService from '../services/questService.js';

const router = express.Router();

// Helper function to validate password strength
const validatePassword = (password) => {
    if (password.length < 8) {
        return { valid: false, error: 'Password must be at least 8 characters long' };
    }
    if (!/[A-Z]/.test(password)) {
        return { valid: false, error: 'Password must contain at least one uppercase letter' };
    }
    if (!/[a-z]/.test(password)) {
        return { valid: false, error: 'Password must contain at least one lowercase letter' };
    }
    if (!/[0-9]/.test(password)) {
        return { valid: false, error: 'Password must contain at least one number' };
    }
    return { valid: true };
};

// Register new user with email verification
router.post('/register', authLimiter, async (req, res) => {
    try {
        const { username, profileUsername, email, password } = req.body;

        // Validation
        if (!username || !profileUsername || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (username.length < 3 || username.length > 50) {
            return res.status(400).json({ error: 'Username must be 3-50 characters' });
        }

        if (profileUsername.length < 3 || profileUsername.length > 50) {
            return res.status(400).json({ error: 'Profile username must be 3-50 characters' });
        }

        // Validate password strength
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.valid) {
            return res.status(400).json({ error: passwordValidation.error });
        }

        // Email validation - simple regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        // Check if user already exists
        const [existingUsers] = await db.query(
            'SELECT id FROM users WHERE username = ? OR email = ?',
            [username, email]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({ error: 'Username or email already exists' });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Generate verification token
        const verificationToken = emailService.generateToken();
        const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

        // Insert user
        const [result] = await db.query(
            'INSERT INTO users (username, profile_username, email, password_hash, verification_token, verification_token_expires) VALUES (?, ?, ?, ?, ?, ?)',
            [username, profileUsername, email, passwordHash, verificationToken, verificationExpires]
        );

        // Send verification email
        const emailResult = await emailService.sendVerificationEmail(email, profileUsername, verificationToken);

        // Pre-generate quests for new user (non-blocking)
        questService.getAllActiveQuests(result.insertId).catch(err => {
            console.error('Quest pre-generation error on registration:', err);
        });

        // Generate JWT token
        const token = jwt.sign(
            { userId: result.insertId, username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(201).json({
            message: 'Registration successful! Please check your email to verify your account.',
            token,
            user: {
                id: result.insertId,
                username,
                profileUsername,
                email,
                emailVerified: false
            },
            emailSent: emailResult.success
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Verify email
router.get('/verify-email/:token', async (req, res) => {
    try {
        const { token } = req.params;

        const [users] = await db.query(
            'SELECT id, username, profile_username, email FROM users WHERE verification_token = ? AND verification_token_expires > NOW()',
            [token]
        );

        if (users.length === 0) {
            return res.status(400).json({ error: 'Invalid or expired verification token' });
        }

        const user = users[0];

        await db.query(
            'UPDATE users SET email_verified = TRUE, verification_token = NULL, verification_token_expires = NULL WHERE id = ?',
            [user.id]
        );

        res.json({
            message: 'Email verified successfully!',
            user: {
                id: user.id,
                username: user.username,
                profileUsername: user.profile_username,
                email: user.email,
                emailVerified: true
            }
        });
    } catch (error) {
        console.error('Email verification error:', error);
        res.status(500).json({ error: 'Verification failed' });
    }
});

// Resend verification email
router.post('/resend-verification', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const [users] = await db.query(
            'SELECT id, username, profile_username, email, email_verified FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = users[0];

        if (user.email_verified) {
            return res.status(400).json({ error: 'Email already verified' });
        }

        const verificationToken = emailService.generateToken();
        const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

        await db.query(
            'UPDATE users SET verification_token = ?, verification_token_expires = ? WHERE id = ?',
            [verificationToken, verificationExpires, user.id]
        );

        const emailResult = await emailService.sendVerificationEmail(user.email, user.profile_username, verificationToken);

        if (!emailResult.success) {
            return res.status(500).json({ error: 'Failed to send verification email' });
        }

        res.json({ message: 'Verification email sent!' });
    } catch (error) {
        console.error('Resend verification error:', error);
        res.status(500).json({ error: 'Failed to resend verification email' });
    }
});

// Login user
router.post('/login', authLimiter, async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const [users] = await db.query(
            'SELECT id, username, profile_username, email, password_hash, email_verified FROM users WHERE username = ?',
            [username]
        );

        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = users[0];

        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        await db.query('UPDATE users SET last_login = NOW() WHERE id = ?', [user.id]);

        // Pre-generate quests on login (non-blocking) to ensure they're ready when user opens quest page
        questService.getAllActiveQuests(user.id).catch(err => {
            console.error('Quest pre-generation error on login:', err);
        });

        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                profileUsername: user.profile_username,
                email: user.email,
                emailVerified: user.email_verified
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Forgot password
router.post('/forgot-password', passwordResetLimiter, async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const [users] = await db.query('SELECT id, username, profile_username, email FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.json({ message: 'If an account exists with that email, you will receive a password reset link.' });
        }

        const user = users[0];
        const resetToken = emailService.generateToken();
        const resetExpires = new Date(Date.now() + 60 * 60 * 1000);

        await db.query('UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?', [resetToken, resetExpires, user.id]);

        await emailService.sendPasswordResetEmail(user.email, user.profile_username, resetToken);

        res.json({ message: 'If an account exists with that email, you will receive a password reset link.' });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ error: 'Password reset request failed' });
    }
});

// Reset password
router.post('/reset-password', passwordResetLimiter, async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ error: 'Token and new password are required' });
        }

        // Validate password strength
        const passwordValidation = validatePassword(newPassword);
        if (!passwordValidation.valid) {
            return res.status(400).json({ error: passwordValidation.error });
        }

        const [users] = await db.query('SELECT id FROM users WHERE reset_token = ? AND reset_token_expires > NOW()', [token]);

        if (users.length === 0) {
            return res.status(400).json({ error: 'Invalid or expired reset token' });
        }

        const user = users[0];
        const passwordHash = await bcrypt.hash(newPassword, 10);

        await db.query('UPDATE users SET password_hash = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?', [passwordHash, user.id]);

        res.json({ message: 'Password reset successful!' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ error: 'Password reset failed' });
    }
});

// Verify token
router.get('/verify', async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid token' });
            }

            const [users] = await db.query('SELECT id, username, profile_username, email, email_verified FROM users WHERE id = ?', [decoded.userId]);

            if (users.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({ valid: true, user: users[0] });
        });
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(500).json({ error: 'Verification failed' });
    }
});

export default router;