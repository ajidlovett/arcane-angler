// Game Helper Functions
export const GameHelpers = {
  // Get current biome fish
  getCurrentBiomeFish: (currentBiome) => {
    return window.BIOMES[currentBiome].fish;
  },

  // Get all fish from current biome
  getAllCurrentBiomeFish: (currentBiome) => {
    const biomeFish = window.GameHelpers.getCurrentBiomeFish(currentBiome);
    return Object.values(biomeFish).flat();
  },

  // Calculate total stats including equipment bonuses
  getTotalStats: (player) => {
    const rod = player.equippedRod ? window.RODS[player.equippedRod] : null;
    const bait = player.equippedBait ? window.BAITS[player.equippedBait] : null;

    return {
      strength: Number(player.stats.strength) + (rod?.str || 0) + (bait?.str || 0),
      intelligence: Number(player.stats.intelligence) + (rod?.int || 0) + (bait?.int || 0),
      luck: Number(player.stats.luck) + (rod?.luck || 0) + (bait?.luck || 0),
      stamina: Number(player.stats.stamina) + (rod?.stam || 0) + (bait?.stam || 0)
    };
  },

  // Get biome relic range
  getBiomeRelicRange: (biome) => {
    if (biome <= 5) return { min: 1, max: 5 };
    if (biome <= 10) return { min: 5, max: 12 };
    if (biome <= 15) return { min: 12, max: 25 };
    if (biome <= 20) return { min: 25, max: 45 };
    if (biome <= 25) return { min: 45, max: 70 };
    return { min: 70, max: 100 };
  },

  // Calculate rarity based on luck (Jackpot Mechanic)
  // Luck only affects high-tier rarities: Legendary, Treasure Chest, Mythic, Exotic, Arcane
  calculateRarity: (totalLuck) => {
    const baseWeights = {
      'Common': 50000,
      'Uncommon': 28000,
      'Fine': 15000,
      'Rare': 5000,
      'Epic': 1575,
      'Treasure Chest': 250,
      'Legendary': 150,
      'Mythic': 25,
      'Exotic': 4,
      'Arcane': 1
    };

    // High-tier rarities affected by luck (Jackpot Mechanic)
    const highTierRarities = ['Legendary', 'Treasure Chest', 'Mythic', 'Exotic', 'Arcane'];

    const effectiveWeights = {};
    let poolSize = 0;

    for (const [tier, baseWeight] of Object.entries(baseWeights)) {
      if (highTierRarities.includes(tier)) {
        // Formula: NewWeight = BaseWeight * (1 + (TotalLuck / 100))
        // 1 Luck point = +1% Weight for high-tier rarities
        effectiveWeights[tier] = baseWeight * (1 + (totalLuck / 100));
      } else {
        // Common, Uncommon, Fine, Rare, Epic: Not affected by luck
        effectiveWeights[tier] = baseWeight;
      }
      poolSize += effectiveWeights[tier];
    }

    const roll = Math.random() * poolSize;
    let cumulative = 0;

    for (const [tier, weight] of Object.entries(effectiveWeights)) {
      cumulative += weight;
      if (roll <= cumulative) return tier;
    }

    return 'Common';
  },

  // Calculate fish count based on strength
  calculateFishCount: (rarity, totalStrength) => {
    // Boss fish (Legendary, Mythic, Exotic, Arcane) and Treasure Chest always = 1
    // These get Titan Bonus instead
    const bossFish = ['Legendary', 'Mythic', 'Exotic', 'Arcane', 'Treasure Chest'];
    if (bossFish.includes(rarity)) return 1;

    // Normal fish: Base range + chance-based extra
    // BaseMax = 1 + FLOOR(TotalSTR / 100)
    const baseMax = 1 + Math.floor(totalStrength / 100);

    // ChanceForExtra = (TotalSTR % 100)%
    // Every 1 STR point adds +1% chance to gain +1 extra fish above BaseMax
    const chanceForExtra = totalStrength % 100;

    // Roll for extra fish (0-99)
    const roll = Math.random() * 100;
    const finalMax = (roll < chanceForExtra) ? baseMax + 1 : baseMax;

    // Return random integer between 1 and finalMax (inclusive)
    return Math.floor(Math.random() * finalMax) + 1;
  },

  // Calculate titan bonus for Boss fish (Legendary, Mythic, Exotic, Arcane)
  // Boss fish get a massive gold multiplier based on strength instead of quantity
  calculateTitanBonus: (totalStrength) => {
    // Formula: 1 + (TotalSTR * 0.02)
    // Example: 200 STR = 5x multiplier (1 + 4)
    return 1 + (totalStrength * 0.02);
  },

  // Generate treasure chest rewards
  generateTreasureChest: (currentBiome, totalLuck) => {
    const biomeRelicRange = window.GameHelpers.getBiomeRelicRange(currentBiome);
    const biomeData = window.BIOMES[currentBiome];

    // Find the highest legendary fish gold value in the biome
    let highestLegendaryGold = 200; // Fallback minimum
    if (biomeData && biomeData.fish && biomeData.fish.Legendary) {
      const legendaryFish = biomeData.fish.Legendary;
      highestLegendaryGold = Math.max(...legendaryFish.map(fish => fish.gold));
    }

    // Gold: Base on highest legendary with 100%-175% variation + luck modifier
    const baseGold = highestLegendaryGold;
    const goldVariation = Math.random() * 0.75 + 1.0; // 100% to 175%
    const luckModifier = 1 + (totalLuck / 100); // 1 Luck = +1% gold
    const goldReward = Math.floor(baseGold * goldVariation * luckModifier);

    // Relics: Based on biome range, scaled by luck
    const baseRelics = Math.floor(Math.random() * (biomeRelicRange.max - biomeRelicRange.min + 1)) + biomeRelicRange.min;
    const relicReward = Math.floor(baseRelics * (1 + (totalLuck / 100)));

    return { gold: goldReward, relics: relicReward };
  },

  // Calculate gold multiplier based on Intelligence (with diminishing returns)
  // Uses soft cap to prevent infinite gold generation in late game
  calculateGoldMultiplier: (totalIntelligence) => {
    // Formula: 1 + ((TotalINT ^ 0.7) * 0.05)
    // Power of 0.7 provides diminishing returns for high INT values
    // Example: 100 INT = ~1.76x, 1000 INT = ~4.48x (not linear!)
    return 1 + (Math.pow(totalIntelligence, 0.7) * 0.05);
  },

  // Calculate Critical Catch XP multiplier based on Stamina
  calculateCriticalCatch: (totalStamina) => {
    // Base crit chance: TotalStamina / 10 (capped at 50%)
    const baseCritChance = Math.min(totalStamina / 10, 50);

    // Determine multiplier tier based on stamina
    if (totalStamina >= 1000) {
      // 1000+ Stamina: 50% chance for scaling multiplier
      // Every 500 stamina = +1x multiplier
      // 1000-1499: 3x, 1500-1999: 4x, 2000-2499: 5x, etc.
      const roll = Math.random() * 100;
      if (roll < 50) {
        const multiplier = 3 + Math.floor((totalStamina - 1000) / 500);
        return multiplier;
      }
    } else if (totalStamina >= 750) {
      // 750+ Stamina: 50% chance for 2x XP, 25% chance for 3x XP
      const roll = Math.random() * 100;
      if (roll < 25) return 3;
      if (roll < 75) return 2; // 25-75 = 50% chance
    } else if (totalStamina >= 500) {
      // 500+ Stamina: 50% chance for 2x XP
      const roll = Math.random() * 100;
      if (roll < 50) return 2;
    } else {
      // Below 500: Use base crit chance for 2x XP
      const roll = Math.random() * 100;
      if (roll < baseCritChance) return 2;
    }

    return 1; // No crit
  },

  // Get a random funny line
  getFunnyLine: (currentBiome) => {
    const allFish = window.GameHelpers.getAllCurrentBiomeFish(currentBiome);
    const randomFish = allFish[Math.floor(Math.random() * allFish.length)];

    const lines = [...window.FUNNY_LINES];

    // Add dynamic lines with random fish name
    lines.push(`You hoped to catch ${randomFish.name} but you caught:`);
    lines.push(`You hoped to catch ${randomFish.name} but you caught:`);
    lines.push(`You were 100% sure it was ${randomFish.name} but it was:`);
    lines.push(`You bet your soul on catching ${randomFish.name} and got:`);
    lines.push(`The manual said this spot has ${randomFish.name}, you got:`);
    lines.push(`You visualized catching ${randomFish.name} but reality gave you:`);
    lines.push(`You prepared a speech for ${randomFish.name} but caught:`);
    lines.push(`You bought specific bait for ${randomFish.name} and caught:`);
    lines.push(`The prophecy foretold of ${randomFish.name}, instead you got:`);

    return lines[Math.floor(Math.random() * lines.length)];
  },

  // Check and return newly unlocked achievements
  checkAchievements: (player) => {
    if (!window.ACHIEVEMENTS || !Array.isArray(window.ACHIEVEMENTS)) {
      return [];
    }

    const newAchievements = [];
    window.ACHIEVEMENTS.forEach(achievement => {
      if (!player.achievements.includes(achievement.id)) {
        const currentValue = Number(player[achievement.stat]) || 0;
        if (currentValue >= achievement.requirement) {
          newAchievements.push(achievement.id);
        }
      }
    });

    return newAchievements;
  }
};