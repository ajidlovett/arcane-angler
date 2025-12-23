// Game Helper Functions
window.GameHelpers = {
  // Get current biome fish
  getCurrentBiomeFish: (currentBiome) => {
    return window.BIOMES[currentBiome].fish;
  },

  // Get all fish from current biome
  getAllCurrentBiomeFish: (currentBiome) => {
    const biomeFish = window.GameHelpers.getCurrentBiomeFish(currentBiome);
    return Object.values(biomeFish).flat();
  },

  // Calculate rod upgrade cost based on current level
  // Formula: Cost = BaseCost × Multiplier^CurrentLevel
  calculateRodUpgradeCost: (rodId, currentLevel) => {
    const rod = window.getRodById(rodId);
    if (!rod || rod.max_level === 0) return 0; // Can't upgrade default rod

    const cost = Math.floor(rod.base_cost * Math.pow(rod.cost_multiplier, currentLevel));
    return cost;
  },

  // Get rod stats based on rod ID and level
  getRodStats: (rodId, level, currentBiome) => {
    const rod = window.getRodById(rodId);
    if (!rod) return { strength: 0, luck: 0, relicWeight: 0, treasureWeight: 0, xpBonus: 0 };

    const stats = {
      strength: 0,
      luck: 0,
      relicWeight: 0,
      treasureWeight: 0,
      xpBonus: 0
    };

    // Parse effect_per_level to determine stat type and bonus
    if (typeof rod.effect_per_level === 'string') {
      if (rod.effect_per_level.includes('Strength')) {
        const match = rod.effect_per_level.match(/\+(\d+)/);
        if (match) stats.strength = parseInt(match[1]) * level;
      } else if (rod.effect_per_level.includes('Luck')) {
        const match = rod.effect_per_level.match(/\+(\d+)/);
        if (match) stats.luck = parseInt(match[1]) * level;
      } else if (rod.effect_per_level.includes('Relic Weight')) {
        const match = rod.effect_per_level.match(/\+(\d+)/);
        if (match) stats.relicWeight = parseInt(match[1]) * level;
      } else if (rod.effect_per_level.includes('Treasure Weight')) {
        const match = rod.effect_per_level.match(/\+(\d+)/);
        if (match) stats.treasureWeight = parseInt(match[1]) * level;
      } else if (rod.effect_per_level.includes('XP')) {
        // XP bonus: +2.5% per level (additive)
        // Only applies if fishing in the matching biome
        if (rod.biome_id === currentBiome) {
          const match = rod.effect_per_level.match(/\+([\d.]+)%/);
          if (match) stats.xpBonus = parseFloat(match[1]) * level;
        }
      }
    }

    return stats;
  },

  // Calculate total stats including equipment bonuses
  getTotalStats: (player) => {
    // Get equipped rod stats based on level
    let rodStats = { strength: 0, luck: 0, relicWeight: 0, treasureWeight: 0, xpBonus: 0 };
    if (player.equippedRod) {
      const rodLevel = player.rodLevels?.[player.equippedRod] || 1;
      rodStats = window.GameHelpers.getRodStats(player.equippedRod, rodLevel, player.currentBiome);
    }

    // Get equipped bait luck bonus
    let baitLuck = 0;
    if (player.equippedBait) {
      const bait = window.getBaitById(player.equippedBait);
      if (bait) baitLuck = bait.luck || 0;
    }

    return {
      strength: Number(player.stats.strength) + rodStats.strength,
      intelligence: Number(player.stats.intelligence),
      luck: Number(player.stats.luck) + rodStats.luck + baitLuck,
      stamina: Number(player.stats.stamina),
      relicWeight: rodStats.relicWeight,
      treasureWeight: rodStats.treasureWeight,
      xpBonus: rodStats.xpBonus
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

  // Calculate rarity based on luck (Jackpot Mechanic) and bait restrictions
  // Luck only affects high-tier rarities: Legendary, Treasure Chest, Mythic, Exotic, Arcane
  // Bait can restrict which rarities can be caught
  calculateRarity: (totalLuck, equippedBaitId, relicWeight = 0, treasureWeight = 0) => {
    const baseWeights = {
      'Common': 60046,
      'Uncommon': 23000,
      'Fine': 10000,
      'Rare': 4000,
      'Relic': 2000,
      'Epic': 750,
      'Treasure Chest': 150,
      'Legendary': 40,
      'Mythic': 10,
      'Exotic': 3,
      'Arcane': 1
    };

    // Apply Relic and Treasure weight bonuses from rods
    if (relicWeight > 0) {
      baseWeights['Relic'] = 2000 + relicWeight;
    }
    if (treasureWeight > 0) {
      baseWeights['Treasure Chest'] = 150 + treasureWeight;
    }

    // Get bait rarity restrictions
    let allowedRarities = Object.keys(baseWeights);
    if (equippedBaitId) {
      const bait = window.getBaitById(equippedBaitId);
      if (bait && bait.rarity_limit && !bait.rarity_limit.includes('All')) {
        // Bait restricts rarities - only allow specified rarities
        allowedRarities = bait.rarity_limit;
      }
    }

    // High-tier rarities affected by luck (Jackpot Mechanic)
    const highTierRarities = ['Legendary', 'Treasure Chest', 'Mythic', 'Exotic', 'Arcane', 'Relic'];

    const effectiveWeights = {};
    let poolSize = 0;

    for (const [tier, baseWeight] of Object.entries(baseWeights)) {
      // Skip if rarity is not allowed by bait
      if (!allowedRarities.includes(tier)) continue;

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

    return allowedRarities.includes('Common') ? 'Common' : allowedRarities[0];
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
    // Formula: 1 + (TotalSTR * 0.0005)
    // 0.05% increase per STR point
    // Example: 2000 STR = 2x multiplier (1 + 1)
    return 1 + (totalStrength * 0.0005);
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