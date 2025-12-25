import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import playerRoutes from './routes/player.js';
import gameRoutes from './routes/game.js';
import leaderboardRoutes from './routes/leaderboard.js';
import profileRoutes from './routes/profile.js';
import friendsRoutes from './routes/friends.js';
import commentsRoutes from './routes/comments.js';
import questRoutes from './routes/quests.js';
import chatRoutes from './routes/chat.js';
import anomalyRoutes from './routes/anomalies.js';
import fragmentShopRoutes from './routes/fragmentShop.js';
import { authLimiter, passwordResetLimiter, apiLimiter } from './middleware/rateLimiter.js';
import anomalyScheduler from './services/anomalyScheduler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Trust proxy: Required when behind reverse proxy (nginx, load balancer, etc.)
// This allows express-rate-limit to correctly identify users by their real IP
app.set('trust proxy', 1);

// Security: Request size limits (prevent DoS attacks with large payloads)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Middleware
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    credentials: true
}));

// Apply general rate limiting to all API routes
app.use('/api/', apiLimiter);

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes with specific rate limiters
app.use('/api/auth', authRoutes);
app.use('/api/player', playerRoutes);
app.use('/api/game', gameRoutes); // Server-authoritative game actions
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/friends', friendsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/quests', questRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/anomalies', anomalyRoutes);
app.use('/api/fragment-shop', fragmentShopRoutes);

// Export rate limiters for use in route files
app.locals.authLimiter = authLimiter;
app.locals.passwordResetLimiter = passwordResetLimiter;

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Arcane Angler API is running' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🎣 Arcane Angler API running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);

    // Start anomaly scheduler
    anomalyScheduler.start();
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully...');
    anomalyScheduler.stop();
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully...');
    anomalyScheduler.stop();
    process.exit(0);
});
