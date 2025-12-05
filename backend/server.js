require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { authLimiter, passwordResetLimiter, apiLimiter } = require('./middleware/rateLimiter');

const app = express();
const PORT = process.env.PORT || 3000;

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
app.use('/api/auth', require('./routes/auth'));
app.use('/api/player', require('./routes/player'));
app.use('/api/leaderboard', require('./routes/leaderboard'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/friends', require('./routes/friends'));
app.use('/api/comments', require('./routes/comments'));

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
});
