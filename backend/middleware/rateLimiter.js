const rateLimit = require('express-rate-limit');

// Strict rate limiter for authentication endpoints (login, register)
// Prevents brute force attacks and credential stuffing
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: {
        error: 'Too many authentication attempts from this IP, please try again after 15 minutes.'
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Moderate rate limiter for password reset endpoints
const passwordResetLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // Limit each IP to 3 requests per hour
    message: {
        error: 'Too many password reset attempts, please try again after an hour.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// General API rate limiter for other endpoints
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per minute
    message: {
        error: 'Too many requests from this IP, please slow down.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    authLimiter,
    passwordResetLimiter,
    apiLimiter
};
