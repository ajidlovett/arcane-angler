// Rarity Utility Functions
// Helper functions for handling rarity colors, gradients, and styles
// Loaded as a plain script (not a module), uses window.* for global access

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
    fontWeight: 'bold',
    display: 'inline-block',
    boxDecorationBreak: 'clone',
    WebkitBoxDecorationBreak: 'clone'
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

/**
 * Get CSS style object for gradient background with solid border (for Exotic/Arcane)
 * @param {string} rarity - The fish rarity
 * @param {string} surfaceColor - The base surface color
 * @returns {object} Style object with gradient background and solid border
 */
window.getGradientBackgroundStyle = (rarity, surfaceColor) => {
  if (!window.isGradientRarity(rarity)) {
    return {
      backgroundColor: surfaceColor,
      borderColor: window.getRarityColor(rarity)
    };
  }

  // Extract first color from gradient for solid border
  const gradient = window.RARITY_COLORS[rarity];
  const firstColorMatch = gradient.match(/#[0-9a-fA-F]{6}/);
  const borderColor = firstColorMatch ? firstColorMatch[0] : '#9ca3af';

  // Create a dimmed gradient background overlay
  return {
    backgroundColor: surfaceColor,
    borderColor: borderColor,
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), ${gradient}`,
    backgroundBlendMode: 'overlay'
  };
};
