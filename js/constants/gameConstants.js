// Game Constants
// Rarity definitions and color mappings for fish rarities

window.RARITIES = ['Common', 'Uncommon', 'Fine', 'Rare', 'Epic', 'Legendary', 'Mythic', 'Exotic', 'Arcane'];

window.RARITY_COLORS = {
  'Common': '#9ca3af',
  'Uncommon': '#84cc16',
  'Fine': '#3b82f6',
  'Rare': '#a855f7',      // Brighter purple
  'Relic': '#a855f7',     // Same purple as Rare (special item, not a fish)
  'Epic': '#ec4899',      // Pink for better distinction
  'Legendary': '#f59e0b',
  'Mythic': '#ef4444',
  'Exotic': 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',  // Cyan to purple gradient
  'Arcane': 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f59e0b 100%)',  // Purple to pink to orange gradient
  'Treasure Chest': '#fbbf24'
};
