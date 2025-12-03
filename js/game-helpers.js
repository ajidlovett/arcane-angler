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

  // Calculate rarity based on luck
  calculateRarity: (totalLuck) => {
    const baseWeights = {
      'Common': 50000,
      'Uncommon': 28000,
      'Fine': 15000,
      'Rare': 5000,
      'Epic': 1575,
      'Treasure Chest': 250,
      'Legendary': 150,
      'Mythic': 25
    };

    const effectiveWeights = {};
    let poolSize = 0;

    for (const [tier, baseWeight] of Object.entries(baseWeights)) {
      if (tier === 'Common') {
        effectiveWeights[tier] = baseWeight;
      } else {
        effectiveWeights[tier] = baseWeight * (1 + (totalLuck / 100));
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
    if (rarity === 'Mythic' || rarity === 'Treasure Chest') return 1;

    const guaranteedExtra = Math.floor(totalStrength / 50);
    const remainder = totalStrength % 50;
    const chanceForBonus = remainder * 2;
    const bonusFish = Math.random() * 100 < chanceForBonus ? 1 : 0;

    return 1 + guaranteedExtra + bonusFish;
  },

  // Calculate titan bonus for mythic fish
  calculateTitanBonus: (totalStrength) => {
    const guaranteedExtra = Math.floor(totalStrength / 50);
    const remainder = totalStrength % 50;
    const avgBonus = remainder / 50;
    const wouldHaveCaught = guaranteedExtra + avgBonus;

    return 1 + (0.5 * wouldHaveCaught);
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

    // Use highest legendary gold as base, with 100-150% variation
    const baseGold = highestLegendaryGold;
    const goldVariation = Math.random() * 0.5 + 1.0; // 100% to 150% of base
    const goldReward = Math.floor(baseGold * goldVariation * (1 + (totalLuck / 100)));

    // Relics scale with biome (same as before)
    const baseRelics = Math.floor(Math.random() * (biomeRelicRange.max - biomeRelicRange.min + 1)) + biomeRelicRange.min;
    const relicReward = Math.floor(baseRelics * (1 + (totalLuck / 100)));

    return { gold: goldReward, relics: relicReward };
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