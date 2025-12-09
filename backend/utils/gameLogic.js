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
function getTotalStats(baseStats, equippedRod, equippedBait) {
  const rod = equippedRod && RODS[equippedRod] ? RODS[equippedRod] : null;
  const bait = equippedBait && BAITS[equippedBait] ? BAITS[equippedBait] : null;

  return {
    strength: Number(baseStats.strength) + (rod?.str || 0) + (bait?.str || 0),
    intelligence: Number(baseStats.intelligence) + (rod?.int || 0) + (bait?.int || 0),
    luck: Number(baseStats.luck) + (rod?.luck || 0) + (bait?.luck || 0),
    stamina: Number(baseStats.stamina) + (rod?.stam || 0) + (bait?.stam || 0)
  };
}

/**
 * Get biome relic range based on biome number
 * @param {number} biome - Biome number (1-26)
 * @returns {Object} { min, max } relic range
 */
function getBiomeRelicRange(biome) {
  if (biome <= 5) return { min: 1, max: 5 };
  if (biome <= 10) return { min: 5, max: 12 };
  if (biome <= 15) return { min: 12, max: 25 };
  if (biome <= 20) return { min: 25, max: 45 };
  if (biome <= 25) return { min: 45, max: 70 };
  return { min: 70, max: 100 };
}

/**
 * Calculate rarity based on luck stat
 * Uses weighted RNG with luck modifiers (Jackpot Mechanic)
 * Luck only affects high-tier rarities: Legendary, Treasure Chest, Mythic, Exotic, Arcane
 * @param {number} totalLuck - Total luck (base + equipment)
 * @returns {string} Rarity tier
 */
function calculateRarity(totalLuck) {
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

  return 'Common'; // Fallback
}

/**
 * Calculate number of fish caught based on strength
 * Higher strength = more fish per cast
 * @param {string} rarity - Fish rarity tier
 * @param {number} totalStrength - Total strength (base + equipment)
 * @returns {number} Number of fish caught
 */
function calculateFishCount(rarity, totalStrength) {
  // Boss fish (Legendary, Mythic, Exotic, Arcane) and Treasure Chest always = 1
  // These get Titan Bonus instead
  const bossFish = ['Legendary', 'Mythic', 'Exotic', 'Arcane', 'Treasure Chest'];
  if (bossFish.includes(rarity)) {
    return 1;
  }

  // Normal fish: Random range from 1 to MaxCatch
  // MaxCatch = 1 + FLOOR(TotalSTR / 100)
  const maxCatch = 1 + Math.floor(totalStrength / 100);

  // Return random integer between 1 and maxCatch (inclusive)
  return Math.floor(Math.random() * maxCatch) + 1;
}

/**
 * Calculate titan bonus multiplier for Boss fish (Legendary, Mythic, Exotic, Arcane)
 * Boss fish get a massive gold multiplier based on strength instead of quantity
 * @param {number} totalStrength - Total strength (base + equipment)
 * @returns {number} Titan bonus multiplier (>= 1.0)
 */
function calculateTitanBonus(totalStrength) {
  // Formula: 1 + (TotalSTR * 0.02)
  // Example: 200 STR = 5x multiplier (1 + 4)
  return 1 + (totalStrength * 0.02);
}

/**
 * Calculate gold multiplier based on Intelligence (with diminishing returns)
 * Uses soft cap to prevent infinite gold generation in late game
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

  // Relics: Based on biome range, scaled by luck
  const baseRelics = Math.floor(Math.random() * (biomeRelicRange.max - biomeRelicRange.min + 1)) + biomeRelicRange.min;
  const relicReward = Math.floor(baseRelics * (1 + (totalLuck / 100)));

  return { gold: goldReward, relics: relicReward };
}

/**
 * Calculate XP required for next level
 * @param {number} currentLevel - Current player level
 * @returns {number} XP needed for next level
 */
function calculateXPForNextLevel(currentLevel) {
  // Formula: baseXP * (level^1.5)
  const baseXP = 100;
  return Math.floor(baseXP * Math.pow(currentLevel, 1.5));
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
  calculateFishCount,
  calculateTitanBonus,
  calculateGoldMultiplier,
  calculateCriticalCatch,
  generateTreasureChest,
  calculateXPForNextLevel,
  calculateLevelUp,
  calculateStatUpgradeCost,
  findFishInBiome,
  selectRandomFish
};
