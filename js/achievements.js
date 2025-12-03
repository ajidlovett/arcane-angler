// Achievements Data
window.ACHIEVEMENTS = [
  { id: 'first_catch', name: 'First Catch', desc: 'Catch your first fish', icon: '🎣', requirement: 1, stat: 'totalFishCaught' },
  { id: 'novice_angler', name: 'Novice Angler', desc: 'Catch 50 fish', icon: '🐟', requirement: 50, stat: 'totalFishCaught' },
  { id: 'skilled_angler', name: 'Skilled Angler', desc: 'Catch 250 fish', icon: '🎣', requirement: 250, stat: 'totalFishCaught' },
  { id: 'master_angler', name: 'Master Angler', desc: 'Catch 1000 fish', icon: '🏆', requirement: 1000, stat: 'totalFishCaught' },
  { id: 'legendary_angler', name: 'Legendary Angler', desc: 'Catch 5000 fish', icon: '⭐', requirement: 5000, stat: 'totalFishCaught' },

  { id: 'first_mythic', name: 'Titan Slayer', desc: 'Catch your first Mythic fish', icon: '🐲', requirement: 1, stat: 'mythicsCaught' },
  { id: 'mythic_hunter', name: 'Mythic Hunter', desc: 'Catch 10 Mythic fish', icon: '🔱', requirement: 10, stat: 'mythicsCaught' },
  { id: 'first_legendary', name: 'Legend Hunter', desc: 'Catch your first Legendary fish', icon: '✨', requirement: 1, stat: 'legendariesCaught' },
  { id: 'legendary_collector', name: 'Legendary Collector', desc: 'Catch 25 Legendary fish', icon: '💫', requirement: 25, stat: 'legendariesCaught' },

  { id: 'level_10', name: 'Getting Started', desc: 'Reach level 10', icon: '📈', requirement: 10, stat: 'level' },
  { id: 'level_25', name: 'Rising Star', desc: 'Reach level 25', icon: '🌟', requirement: 25, stat: 'level' },
  { id: 'level_50', name: 'Veteran Angler', desc: 'Reach level 50', icon: '💪', requirement: 50, stat: 'level' },
  { id: 'level_100', name: 'Century Mark', desc: 'Reach level 100', icon: '💯', requirement: 100, stat: 'level' },

  { id: 'gold_1k', name: 'First Fortune', desc: 'Earn 1,000 total gold', icon: '💰', requirement: 1000, stat: 'totalGoldEarned' },
  { id: 'gold_10k', name: 'Wealthy Trader', desc: 'Earn 10,000 total gold', icon: '💵', requirement: 10000, stat: 'totalGoldEarned' },
  { id: 'gold_100k', name: 'Gold Baron', desc: 'Earn 100,000 total gold', icon: '👑', requirement: 100000, stat: 'totalGoldEarned' },
  { id: 'gold_1m', name: 'Millionaire', desc: 'Earn 1,000,000 total gold', icon: '💎', requirement: 1000000, stat: 'totalGoldEarned' },

  { id: 'merchant_apprentice', name: 'Merchant Apprentice', desc: 'Sell 100 fish', icon: '🏪', requirement: 100, stat: 'totalFishSold' },
  { id: 'merchant_expert', name: 'Merchant Expert', desc: 'Sell 500 fish', icon: '🛒', requirement: 500, stat: 'totalFishSold' },
  { id: 'merchant_tycoon', name: 'Merchant Tycoon', desc: 'Sell 2500 fish', icon: '🏦', requirement: 2500, stat: 'totalFishSold' },

  { id: 'stat_upgrade_5', name: 'Power Up', desc: 'Upgrade any stat 5 times', icon: '⚡', requirement: 5, stat: 'statsUpgraded' },
  { id: 'stat_upgrade_25', name: 'Dedicated Trainer', desc: 'Upgrade any stat 25 times', icon: '💪', requirement: 25, stat: 'statsUpgraded' },
  { id: 'stat_upgrade_100', name: 'Max Power', desc: 'Upgrade any stat 100 times', icon: '🔥', requirement: 100, stat: 'statsUpgraded' },

  { id: 'biome_explorer', name: 'Biome Explorer', desc: 'Unlock 5 biomes', icon: '🗺️', requirement: 5, stat: 'currentBiome' },
  { id: 'biome_wanderer', name: 'Biome Wanderer', desc: 'Unlock 10 biomes', icon: '🧭', requirement: 10, stat: 'currentBiome' },
  { id: 'world_traveler', name: 'World Traveler', desc: 'Unlock 20 biomes', icon: '🌍', requirement: 20, stat: 'currentBiome' },
  { id: 'realm_master', name: 'Realm Master', desc: 'Unlock all 30 biomes', icon: '🌌', requirement: 30, stat: 'currentBiome' }
];
