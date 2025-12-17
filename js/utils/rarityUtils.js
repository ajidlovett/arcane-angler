// Rarity Utility Functions
// Helper functions for handling rarity colors, gradients, and styles

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
