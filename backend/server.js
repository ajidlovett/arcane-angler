import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import playerRoutes from './routes/player.js';
import gameRoutes from './routes/game.js';
import leaderboardRoutes from './routes/leaderboard.js';
import profileRoutes from './routes/profile.js';
import friendsRoutes from './routes/friends.js';
import commentsRoutes from './routes/comments.js';
import questRoutes from './routes/quests.js';
import { authLimiter, passwordResetLimiter, apiLimiter } from './middleware/rateLimiter.js';

dotenv.config();

// ES module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Export rate limiters for use in route files
app.locals.authLimiter = authLimiter;
app.locals.passwordResetLimiter = passwordResetLimiter;

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Arcane Angler API is running' });
});

// Serve static files from dist/ (production build)
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath, {
    maxAge: '1d', // Cache static assets for 1 day
    etag: true
}));

// SPA fallback: serve index.html for all non-API routes
// This allows React Router to handle client-side routing
app.get('*', (req, res, next) => {
    // Don't serve index.html for API routes
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'API route not found' });
    }

    // Serve index.html for all other routes
    res.sendFile(path.join(distPath, 'index.html'));
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
});
