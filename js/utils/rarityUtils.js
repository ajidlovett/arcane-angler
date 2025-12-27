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
  // Validate inputs
  if (!rarity || !window.RARITY_COLORS) {
    console.warn('getRarityColor: Invalid rarity or RARITY_COLORS not defined', rarity);
    return '#9ca3af'; // Default gray
  }

  const color = window.RARITY_COLORS[rarity];
  if (!color) {
    console.warn('getRarityColor: No color found for rarity:', rarity);
    return '#9ca3af';
  }

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
  // Ensure we have a valid rarity
  if (!rarity || !window.RARITY_COLORS) {
    return { color: '#9ca3af' }; // Default gray
  }

  if (!window.isGradientRarity(rarity)) {
    const color = window.getRarityColor(rarity);
    return {
      color: color,
      display: 'inline-block'  // Ensure inline-block for better rendering
    };
  }

  // For gradient rarities (Exotic, Arcane)
  const gradient = window.RARITY_COLORS[rarity];
  return {
    backgroundImage: gradient,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    MozBackgroundClip: 'text',
    MozTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',  // Fallback for browsers that don't support background-clip
    fontWeight: 'bold',
    display: 'inline-block'
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
  // Provide fallback values
  if (!rarity || !window.RARITY_COLORS) {
    return {
      backgroundColor: surfaceColor || '#111827',
      borderColor: '#9ca3af'
    };
  }

  if (!window.isGradientRarity(rarity)) {
    const borderColor = window.getRarityColor(rarity);
    return {
      backgroundColor: surfaceColor || '#111827',
      borderColor: borderColor || '#9ca3af'
    };
  }

  // Extract first color from gradient for solid border
  const gradient = window.RARITY_COLORS[rarity];
  const firstColorMatch = gradient ? gradient.match(/#[0-9a-fA-F]{6}/) : null;
  const borderColor = firstColorMatch ? firstColorMatch[0] : '#9ca3af';

  // Create a dimmed gradient background overlay
  return {
    backgroundColor: surfaceColor || '#111827',
    borderColor: borderColor,
    backgroundImage: gradient ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), ${gradient}` : 'none',
    backgroundBlendMode: 'overlay'
  };
};
