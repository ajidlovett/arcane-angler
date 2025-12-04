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
  { id: 'realm_master', name: 'Realm Master', desc: 'Unlock all 30 biomes', icon: '🌌', requirement: 30, stat: 'currentBiome' },

  // Exotic fish achievements
  { id: 'first_exotic', name: 'Exotic Discovery', desc: 'Catch your first Exotic fish', icon: '🦋', requirement: 1, stat: 'exoticsCaught' },
  { id: 'exotic_collector', name: 'Exotic Collector', desc: 'Catch 5 Exotic fish', icon: '🌈', requirement: 5, stat: 'exoticsCaught' },
  { id: 'exotic_master', name: 'Exotic Master', desc: 'Catch 25 Exotic fish', icon: '🔮', requirement: 25, stat: 'exoticsCaught' },

  // Arcane fish achievements
  { id: 'first_arcane', name: 'Arcane Awakening', desc: 'Catch your first Arcane fish', icon: '✨', requirement: 1, stat: 'arcanesCaught' },
  { id: 'arcane_seeker', name: 'Arcane Seeker', desc: 'Catch 3 Arcane fish', icon: '🌟', requirement: 3, stat: 'arcanesCaught' },
  { id: 'arcane_legend', name: 'Arcane Legend', desc: 'Catch 10 Arcane fish', icon: '⚡', requirement: 10, stat: 'arcanesCaught' },

  // Treasure chest achievements
  { id: 'first_treasure', name: 'Treasure Hunter', desc: 'Find your first treasure chest', icon: '📦', requirement: 1, stat: 'treasureChestsFound' },
  { id: 'chest_seeker', name: 'Chest Seeker', desc: 'Find 25 treasure chests', icon: '💎', requirement: 25, stat: 'treasureChestsFound' },
  { id: 'fortune_finder', name: 'Fortune Finder', desc: 'Find 100 treasure chests', icon: '🏴‍☠️', requirement: 100, stat: 'treasureChestsFound' },

  // Strength upgrade achievements
  { id: 'strength_novice', name: 'Strength Training', desc: 'Upgrade strength 10 times', icon: '💪', requirement: 10, stat: 'strUpgraded' },
  { id: 'strength_expert', name: 'Powerhouse', desc: 'Upgrade strength 50 times', icon: '🏋️', requirement: 50, stat: 'strUpgraded' },
  { id: 'strength_titan', name: 'Titan Strength', desc: 'Upgrade strength 200 times', icon: '⚔️', requirement: 200, stat: 'strUpgraded' },

  // Intelligence upgrade achievements
  { id: 'intelligence_novice', name: 'Quick Learner', desc: 'Upgrade intelligence 10 times', icon: '📚', requirement: 10, stat: 'intUpgraded' },
  { id: 'intelligence_expert', name: 'Genius Trader', desc: 'Upgrade intelligence 50 times', icon: '🧠', requirement: 50, stat: 'intUpgraded' },
  { id: 'intelligence_sage', name: 'Market Sage', desc: 'Upgrade intelligence 200 times', icon: '🎓', requirement: 200, stat: 'intUpgraded' },

  // Luck upgrade achievements
  { id: 'luck_novice', name: 'Lucky Start', desc: 'Upgrade luck 10 times', icon: '🍀', requirement: 10, stat: 'luckUpgraded' },
  { id: 'luck_expert', name: 'Fortune Favored', desc: 'Upgrade luck 50 times', icon: '🎰', requirement: 50, stat: 'luckUpgraded' },
  { id: 'luck_blessed', name: 'Blessed by RNG', desc: 'Upgrade luck 200 times', icon: '🌠', requirement: 200, stat: 'luckUpgraded' },

  // Stamina upgrade achievements
  { id: 'stamina_novice', name: 'Building Endurance', desc: 'Upgrade stamina 10 times', icon: '🏃', requirement: 10, stat: 'staminaUpgraded' },
  { id: 'stamina_expert', name: 'Marathon Fisher', desc: 'Upgrade stamina 50 times', icon: '⏱️', requirement: 50, stat: 'staminaUpgraded' },
  { id: 'stamina_tireless', name: 'Tireless Angler', desc: 'Upgrade stamina 200 times', icon: '♾️', requirement: 200, stat: 'staminaUpgraded' },

  // Total relics earned achievements
  { id: 'relic_collector', name: 'Relic Collector', desc: 'Earn 100 total relics', icon: '💠', requirement: 100, stat: 'totalRelicsEarned' },
  { id: 'relic_hoarder', name: 'Relic Hoarder', desc: 'Earn 500 total relics', icon: '💍', requirement: 500, stat: 'totalRelicsEarned' },
  { id: 'ancient_keeper', name: 'Ancient Keeper', desc: 'Earn 2000 total relics', icon: '🗿', requirement: 2000, stat: 'totalRelicsEarned' },

  // Gold in pocket achievements
  { id: 'savings_start', name: 'Savings Account', desc: 'Have 10,000 gold in your pocket', icon: '💰', requirement: 10000, stat: 'gold' },
  { id: 'gold_vault', name: 'Gold Vault', desc: 'Have 100,000 gold in your pocket', icon: '🏦', requirement: 100000, stat: 'gold' },
  { id: 'dragon_hoard', name: 'Dragon Hoard', desc: 'Have 1,000,000 gold in your pocket', icon: '🐉', requirement: 1000000, stat: 'gold' }
];
