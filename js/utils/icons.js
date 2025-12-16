// Icon definitions for Arcane Angler
export const Icons = {
  Fish: () => '🎣',
  Package: () => '📦',
  TrendingUp: () => '📊',
  Target: () => '🎯',
  Users: () => '👥',
  User: () => '👤',
  Trophy: () => '🏆',
  Award: () => '🏅',
  Menu: () => '☰',
  X: () => '✕',
  Lock: () => '🔒',
  Unlock: () => '🔓',
  ChevronRight: () => '›',
  Trash2: () => '🗑️'
};

// Also export to window for backward compatibility
if (typeof window !== 'undefined') {
  window.Icons = Icons;
}

export default Icons;
