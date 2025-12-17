// Rarity Utility Functions
// Helper functions for handling rarity colors, gradients, and styles

/**
 * Rarity color definitions (solid colors for solid rarities, gradients for special ones)
 */
export const rarityColors = {
    common: '#9ca3af',      // Gray-400
    uncommon: '#4ade80',    // Green-400
    fine: '#60a5fa',        // Blue-400
    rare: '#3b82f6',        // Blue-500
    epic: '#a855f7',        // Purple-500
    legendary: '#f59e0b',   // Amber-500
    mythic: '#ef4444',      // Red-500
    exotic: '#ec4899',      // Pink-500
    arcane: '#8b5cf6',      // Violet-500
};

/**
 * Get rarity color (for borders and text)
 * @param {string} rarity - The fish rarity
 * @returns {string} Color hex code
 */
export const getRarityColor = (rarity) => {
    return rarityColors[rarity?.toLowerCase()] || rarityColors.common;
};

/**
 * Check if rarity uses a gradient
 * @param {string} rarity - The fish rarity
 * @returns {boolean} True if rarity uses gradient styling
 */
export const isGradientRarity = (rarity) => {
    const color = window.RARITY_COLORS?.[rarity];
    return color && color.startsWith('linear-gradient');
};

/**
 * Get CSS style object for gradient text
 * @param {string} rarity - The fish rarity
 * @returns {object} Style object with gradient or solid color
 */
export const getGradientTextStyle = (rarity) => {
    const r = rarity?.toLowerCase();
    if (r === 'legendary') {
        return {
            background: 'linear-gradient(to right, #fcd34d, #f59e0b)',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
        };
    }
    if (r === 'mythic') {
        return {
            background: 'linear-gradient(to right, #f87171, #dc2626)',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
        };
    }
    if (r === 'exotic') {
        return {
            background: 'linear-gradient(to right, #f472b6, #db2777)',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
        };
    }
    if (r === 'arcane') {
        return {
            background: 'linear-gradient(to right, #a78bfa, #7c3aed)',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
        };
    }
    return { color: getRarityColor(rarity) };
};

// ============================================
// BACKWARD COMPATIBILITY - window.* functions
// ============================================

/**
 * Get rarity color (solid or gradient)
 * @param {string} rarity - The fish rarity
 * @param {boolean} forBackground - Whether this is for a background (returns gradient) or border/text (extracts first color)
 * @returns {string} Color or gradient string
 */
window.getRarityColor = (rarity, forBackground = false) => {
    const color = window.RARITY_COLORS[rarity];
    if (!color) return '#9ca3af';

    if (forBackground && color.startsWith('linear-gradient')) {
        return color; // Return gradient for backgrounds
    }

    // For borders/text, extract first color from gradient
    if (color.startsWith('linear-gradient')) {
        const match = color.match(/#[0-9a-fA-F]{6}/);
        return match ? match[0] : '#9ca3af';
    }

    return color;
};

/**
 * Check if rarity uses a gradient
 * @param {string} rarity - The fish rarity
 * @returns {boolean} True if rarity uses gradient styling
 */
window.isGradientRarity = (rarity) => {
    const color = window.RARITY_COLORS[rarity];
    return color && color.startsWith('linear-gradient');
};

/**
 * Get CSS style object for gradient text
 * @param {string} rarity - The fish rarity
 * @returns {object} Style object with gradient or solid color
 */
window.getGradientTextStyle = (rarity) => {
    if (!window.isGradientRarity(rarity)) {
        return { color: window.getRarityColor(rarity) };
    }

    return {
        background: window.RARITY_COLORS[rarity],
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontWeight: 'bold'
    };
};

/**
 * Get CSS style object for gradient border
 * @param {string} rarity - The fish rarity
 * @returns {object} Style object for border styling
 */
window.getGradientBorderStyle = (rarity) => {
    if (!window.isGradientRarity(rarity)) {
        return { borderColor: window.getRarityColor(rarity) };
    }

    // For gradients, we'll use borderImage
    return {
        borderColor: 'transparent',
        backgroundImage: window.RARITY_COLORS[rarity],
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box'
    };
};
