/**
 * Game Logic Utilities - Server-Authoritative Calculations
 *
 * This file contains all game logic calculations that must be performed server-side
 * to prevent client manipulation. These functions are ported from js/game-helpers.js
 * but without any database access (pure calculation functions).
 */

import { RODS, BAITS } from '../data/equipment.js';

/**
 * Calculate total stats including equipment bonuses
 * @param {Object} baseStats - { strength, intelligence, luck, stamina }
 * @param {string|null} equippedRod - Rod name or null
 * @param {string|null} equippedBait - Bait name or null
 * @returns {Object} Total stats with equipment bonuses
 */
function getTotalStats(baseStats, equippedRod, equippedBait, rodLevels = {}, currentBiome = 1) {
  const rod = equippedRod && RODS[equippedRod] ? RODS[equippedRod] : null;
  const bait = equippedBait && BAITS[equippedBait] ? BAITS[equippedBait] : null;

  // Calculate rod stats based on level
  let rodStats = { strength: 0, luck: 0, relicWeight: 0, treasureWeight: 0, xpBonus: 0 };
  if (rod && rod.effect_per_level) {
    const rodLevel = rodLevels[equippedRod] || 1;

    // Parse effect_per_level to determine stat type and bonus
    const effectStr = rod.effect_per_level;
    if (effectStr.includes('Strength')) {
      const match = effectStr.match(/\+(\d+)/);
      if (match) rodStats.strength = parseInt(match[1]) * rodLevel;
    } else if (effectStr.includes('Luck')) {
      const match = effectStr.match(/\+(\d+)/);
      if (match) rodStats.luck = parseInt(match[1]) * rodLevel;
    } else if (effectStr.includes('Relic')) {
      const match = effectStr.match(/\+(\d+)/);
      if (match) rodStats.relicWeight = parseInt(match[1]) * rodLevel;
    } else if (effectStr.includes('Treasure')) {
      const match = effectStr.match(/\+(\d+)/);
      if (match) rodStats.treasureWeight = parseInt(match[1]) * rodLevel;
    } else if (effectStr.includes('XP')) {
      // XP bonus only applies if fishing in the rod's matching biome
      if (rod.biome_id && rod.biome_id === currentBiome) {
        const match = effectStr.match(/\+([\d.]+)/);
        if (match) rodStats.xpBonus = parseFloat(match[1]) * rodLevel;
      }
    }
  }

  // Get bait luck bonus (new bait structure only has luck)
  const baitLuck = bait?.luck || 0;

  return {
    strength: Number(baseStats.strength) + rodStats.strength,
    intelligence: Number(baseStats.intelligence),
    luck: Number(baseStats.luck) + rodStats.luck + baitLuck,
    stamina: Number(baseStats.stamina),
    relicWeight: rodStats.relicWeight,
    treasureWeight: rodStats.treasureWeight,
    xpBonus: rodStats.xpBonus
  };
}

/**
 * Get biome relic range based on biome number
 * @param {number} biome - Biome number (1-26)
 * @returns {Object} { min, max } relic range
 */
function getBiomeRelicRange(biome) {
  if (biome <= 5) return { min: 1, max: 5 };
  if (biome <= 10) return { min: 6, max: 10 };
  if (biome <= 15) return { min: 11, max: 15 };
  if (biome <= 20) return { min: 16, max: 20 };
  if (biome <= 25) return { min: 21, max: 25 };
  return { min: 21, max: 25 }; // Biome 26+ same as 21-25
}

/**
 * Calculate Luck Power from total luck stat (REFACTORED Helper)
 * Luck (LUCK) - "The Fate Weaver" - Step A: Convert Stat to Luck Power
 *
 * Scaling with diminishing returns:
 * - First 1000 pts: 100% efficiency (1 pt = 1 power)
 * - 1000-5000 pts: 75% efficiency
 * - 5000-10000 pts: 50% efficiency
 * - 10000-15000 pts: 25% efficiency
 * - 15000-20000 pts: 15% efficiency
 * - 20000+ pts: 10% efficiency
 *
 * @param {number} totalLuck - Total luck (base + equipment)
 * @returns {number} Luck power
 */
function calculateLuckPower(totalLuck) {
  let luckPower = 0;
  let remainingLuck = totalLuck;

  // Tier 1: 0-1000 = 100% efficiency
  if (remainingLuck > 0) {
    const tier1 = Math.min(remainingLuck, 1000);
    luckPower += tier1 * 1.0;
    remainingLuck -= tier1;
  }

  // Tier 2: 1000-5000 = 75% efficiency
  if (remainingLuck > 0) {
    const tier2 = Math.min(remainingLuck, 4000);
    luckPower += tier2 * 0.75;
    remainingLuck -= tier2;
  }

  // Tier 3: 5000-10000 = 50% efficiency
  if (remainingLuck > 0) {
    const tier3 = Math.min(remainingLuck, 5000);
    luckPower += tier3 * 0.5;
    remainingLuck -= tier3;
  }

  // Tier 4: 10000-15000 = 25% efficiency
  if (remainingLuck > 0) {
    const tier4 = Math.min(remainingLuck, 5000);
    luckPower += tier4 * 0.25;
    remainingLuck -= tier4;
  }

  // Tier 5: 15000-20000 = 15% efficiency
  if (remainingLuck > 0) {
    const tier5 = Math.min(remainingLuck, 5000);
    luckPower += tier5 * 0.15;
    remainingLuck -= tier5;
  }

  // Tier 6: 20000+ = 10% efficiency
  if (remainingLuck > 0) {
    luckPower += remainingLuck * 0.1;
  }

  return luckPower;
}

/**
 * Calculate rarity based on luck stat (REFACTORED)
 * Luck (LUCK) - "The Fate Weaver" - Step B: Apply Luck Power with Damping
 *
 * Uses weighted RNG with damped luck modifiers
 * Luck affects high-tier rarities with damping factors
 *
 * Damping Factors:
 * - Legendary: 0.5
 * - Mythic: 0.2
 * - Exotic: 0.05
 * - Arcane: 0.01
 *
 * @param {number} totalLuck - Total luck (base + equipment)
 * @param {boolean} isAutoCast - Whether this is an auto-cast (caps at Epic)
 * @returns {string} Rarity tier
 */
function calculateRarity(totalLuck, isAutoCast = false, equippedBaitId = null, relicWeight = 0, treasureWeight = 0) {
  const baseWeights = {
    'Common': 60046,
    'Uncommon': 23000,
    'Fine': 10000,
    'Rare': 4000,
    'Relic': 2000,          // NEW: Drops 1-5 relics instead of fish
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
  if (equippedBaitId && BAITS[equippedBaitId]) {
    const bait = BAITS[equippedBaitId];
    if (bait.rarity_limit && !bait.rarity_limit.includes('All')) {
      allowedRarities = bait.rarity_limit;
    }
  }

  // Calculate luck power from total luck
  const luckPower = calculateLuckPower(totalLuck);

  // Damping factors for high-tier rarities
  const dampingFactors = {
    'Legendary': 0.5,
    'Treasure Chest': 0.5, // Same as Legendary
    'Mythic': 0.2,
    'Exotic': 0.05,
    'Arcane': 0.01
  };

  const effectiveWeights = {};
  let poolSize = 0;

  for (const [tier, baseWeight] of Object.entries(baseWeights)) {
    // Skip if not allowed by bait
    if (!allowedRarities.includes(tier)) {
      continue;
    }

    // Auto-Cast caps at Epic rarity
    if (isAutoCast && ['Relic', 'Treasure Chest', 'Legendary', 'Mythic', 'Exotic', 'Arcane'].includes(tier)) {
      continue; // Skip these rarities for auto-cast
    }

    if (dampingFactors[tier] !== undefined) {
      // High-tier: Base + Floor(Luck Power * Damping)
      const bonus = Math.floor(luckPower * dampingFactors[tier]);
      effectiveWeights[tier] = baseWeight + bonus;
    } else {
      // Low-tier (Common, Uncommon, Fine, Rare, Relic, Epic): Not affected by luck
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

  return 'Common'; // Fallback
}

/**
 * Calculate number of fish caught based on strength (REFACTORED)
 * Strength (STR) - "The Bulk Hauler"
 * Effect: Increases fish quantity per cast (ACTIVE Play only - Manual Casting)
 * Returns a RANGE: random between 1 and Max
 *
 * @param {string} rarity - Fish rarity tier
 * @param {number} totalStrength - Total strength (base + equipment)
 * @param {boolean} isAutoCast - Whether this is an auto-cast (auto-cast always yields 1)
 * @returns {number} Number of fish caught (random between 1 and max)
 */
function calculateFishCount(rarity, totalStrength, isAutoCast = false) {
  // Auto-Cast always yields 1 fish (ignores STR)
  if (isAutoCast) {
    return 1;
  }

  // Boss fish (Legendary, Mythic, Exotic, Arcane) and Treasure Chest always = 1
  const bossFish = ['Legendary', 'Mythic', 'Exotic', 'Arcane', 'Treasure Chest'];
  if (bossFish.includes(rarity)) {
    return 1;
  }

  // STR Scaling:
  // - If STR <= 1000: Raw Bonus = STR * 0.005
  // - If STR > 1000: Raw Bonus = 5 + ((STR - 1000) * 0.002)
  let rawBonus;
  if (totalStrength <= 1000) {
    rawBonus = totalStrength * 0.005;
  } else {
    rawBonus = 5 + ((totalStrength - 1000) * 0.002);
  }

  // Efficiency by rarity
  const efficiencyMap = {
    'Common': 1.0,
    'Uncommon': 0.8,
    'Fine': 0.6,
    'Rare': 0.4,
    'Epic': 0.2
  };

  const efficiency = efficiencyMap[rarity] || 1.0;

  // Max Yield = 1 + Floor(Raw Bonus * Efficiency)
  const maxYield = 1 + Math.floor(rawBonus * efficiency);

  // Return random value between 1 and maxYield (inclusive)
  return Math.floor(Math.random() * maxYield) + 1;
}

/**
 * Calculate titan bonus multiplier for Boss fish (Legendary, Mythic, Exotic, Arcane)
 * Boss fish get a massive gold multiplier based on strength instead of quantity
 * @param {number} totalStrength - Total strength (base + equipment)
 * @returns {number} Titan bonus multiplier (>= 1.0)
 */
function calculateTitanBonus(totalStrength) {
  // Formula: 1 + (TotalSTR * 0.002)
  // 0.2% increase per STR point
  // Example: 500 STR = 2x multiplier (1 + 1)
  return 1 + (totalStrength * 0.002);
}

/**
 * Calculate gold multiplier based on Intelligence (with diminishing returns)
 * DEPRECATED: INT now affects booster duration, not gold
 * @deprecated Use calculateIntelligenceDuration instead
 * @param {number} totalIntelligence - Total intelligence (base + equipment)
 * @returns {number} Gold multiplier (>= 1.0)
 */
function calculateGoldMultiplier(totalIntelligence) {
  // Formula: 1 + ((TotalINT ^ 0.7) * 0.05)
  // Power of 0.7 provides diminishing returns for high INT values
  // Example: 100 INT = ~1.76x, 1000 INT = ~4.48x (not linear!)
  return 1 + (Math.pow(totalIntelligence, 0.7) * 0.05);
}

/**
 * Calculate booster item duration based on Intelligence (REFACTORED)
 * Intelligence (INT) - "The Time Mage"
 * Effect: Increases Booster Item duration
 *
 * Scaling: 5-Tier Cumulative Calculation
 * - 0-5k pts: +0.5s/pt
 * - 5k-10k pts: +0.4s/pt
 * - 10k-15k pts: +0.3s/pt
 * - 15k-20k pts: +0.2s/pt
 * - 20k+ pts: +0.1s/pt
 *
 * @param {number} totalIntelligence - Total intelligence (base + equipment)
 * @param {number} baseDurationSeconds - Base booster duration in seconds
 * @returns {number} Extended duration in seconds
 */
function calculateIntelligenceDuration(totalIntelligence, baseDurationSeconds) {
  let bonusSeconds = 0;
  let remainingInt = totalIntelligence;

  // Tier 1: 0-5000 pts = +0.5s/pt
  if (remainingInt > 0) {
    const tier1 = Math.min(remainingInt, 5000);
    bonusSeconds += tier1 * 0.5;
    remainingInt -= tier1;
  }

  // Tier 2: 5000-10000 pts = +0.4s/pt
  if (remainingInt > 0) {
    const tier2 = Math.min(remainingInt, 5000);
    bonusSeconds += tier2 * 0.4;
    remainingInt -= tier2;
  }

  // Tier 3: 10000-15000 pts = +0.3s/pt
  if (remainingInt > 0) {
    const tier3 = Math.min(remainingInt, 5000);
    bonusSeconds += tier3 * 0.3;
    remainingInt -= tier3;
  }

  // Tier 4: 15000-20000 pts = +0.2s/pt
  if (remainingInt > 0) {
    const tier4 = Math.min(remainingInt, 5000);
    bonusSeconds += tier4 * 0.2;
    remainingInt -= tier4;
  }

  // Tier 5: 20000+ pts = +0.1s/pt
  if (remainingInt > 0) {
    bonusSeconds += remainingInt * 0.1;
  }

  return baseDurationSeconds + bonusSeconds;
}

/**
 * Calculate Critical Catch XP multiplier based on Stamina
 * @param {number} totalStamina - Total stamina (base + equipment)
 * @returns {number} XP multiplier (1x, 2x, 3x, 4x, 5x, etc.)
 */
function calculateCriticalCatch(totalStamina) {
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
}

/**
 * Generate treasure chest rewards
 * @param {number} currentBiome - Current biome number
 * @param {number} totalLuck - Total luck stat
 * @param {Object} biomeData - Biome data object from backend/data/biomes.js
 * @returns {Object} { gold, relics }
 */
function generateTreasureChest(currentBiome, totalLuck, biomeData) {
  const biomeRelicRange = getBiomeRelicRange(currentBiome);

  // Find highest legendary fish gold value in the biome
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

  // Relics: Fixed range based on biome (NOT affected by luck)
  const relicReward = Math.floor(Math.random() * (biomeRelicRange.max - biomeRelicRange.min + 1)) + biomeRelicRange.min;

  return { gold: goldReward, relics: relicReward };
}

/**
 * Calculate XP required for next level
 * @param {number} currentLevel - Current player level
 * @returns {number} XP needed for next level
 */
function calculateXPForNextLevel(currentLevel) {
  // Linear formula: 200 * current level
  // Level 1→2: 200, Level 2→3: 400, Level 3→4: 600, etc.
  return 200 * currentLevel;
}

/**
 * Calculate new level and XP after gaining XP
 * @param {number} currentLevel - Current level
 * @param {number} currentXP - Current XP
 * @param {number} xpGained - XP to add
 * @returns {Object} { newLevel, newXP, leveledUp, levelsGained, relicsGained }
 */
function calculateLevelUp(currentLevel, currentXP, xpGained) {
  let level = currentLevel;
  let xp = currentXP + xpGained;
  let leveledUp = false;
  let levelsGained = 0;

  while (true) {
    const xpNeeded = calculateXPForNextLevel(level);
    if (xp >= xpNeeded) {
      xp -= xpNeeded;
      level++;
      leveledUp = true;
      levelsGained++;
    } else {
      break;
    }
  }

  // Grant 3 relics per level gained
  const relicsGained = levelsGained * 3;

  return { newLevel: level, newXP: xp, leveledUp, levelsGained, relicsGained };
}

/**
 * Calculate cost to upgrade a stat
 * @param {number} currentStatValue - Current stat value
 * @returns {number} Relic cost
 */
function calculateStatUpgradeCost(currentStatValue) {
  // Flat cost: 2 relics per point (simple and predictable)
  return 2;
}

/**
 * Validate fish exists in a biome
 * @param {Object} biomeData - Biome data object
 * @param {string} fishName - Fish name
 * @param {string} rarity - Rarity tier
 * @returns {Object|null} Fish data or null if not found
 */
function findFishInBiome(biomeData, fishName, rarity) {
  if (!biomeData || !biomeData.fish || !biomeData.fish[rarity]) {
    return null;
  }

  return biomeData.fish[rarity].find(f => f.name === fishName) || null;
}

/**
 * Select random fish from biome rarity pool
 * @param {Object} biomeData - Biome data object
 * @param {string} rarity - Rarity tier
 * @returns {Object|null} Random fish from that rarity tier
 */
function selectRandomFish(biomeData, rarity) {
  if (!biomeData || !biomeData.fish || !biomeData.fish[rarity]) {
    return null;
  }

  const fishPool = biomeData.fish[rarity];
  if (fishPool.length === 0) return null;

  return fishPool[Math.floor(Math.random() * fishPool.length)];
}

export {
  getTotalStats,
  getBiomeRelicRange,
  calculateRarity,
  calculateLuckPower,
  calculateFishCount,
  calculateTitanBonus,
  calculateGoldMultiplier,
  calculateIntelligenceDuration,
  calculateCriticalCatch,
  generateTreasureChest,
  calculateXPForNextLevel,
  calculateLevelUp,
  calculateStatUpgradeCost,
  findFishInBiome,
  selectRandomFish
};
