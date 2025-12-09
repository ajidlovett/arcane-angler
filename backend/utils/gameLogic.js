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
 * Uses weighted RNG with luck modifiers
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

  const effectiveWeights = {};
  let poolSize = 0;

  for (const [tier, baseWeight] of Object.entries(baseWeights)) {
    if (tier === 'Common') {
      effectiveWeights[tier] = baseWeight;
    } else {
      // Luck increases chances for rare+ tiers
      effectiveWeights[tier] = baseWeight * (1 + (totalLuck / 200));
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
  // Mythic/Exotic/Arcane/Treasure always = 1
  if (rarity === 'Mythic' || rarity === 'Exotic' || rarity === 'Arcane' || rarity === 'Treasure Chest') {
    return 1;
  }

  const guaranteedExtra = Math.floor(totalStrength / 50);
  const remainder = totalStrength % 50;
  const chanceForBonus = remainder * 2; // remainder * 2 = % chance
  const bonusFish = Math.random() * 100 < chanceForBonus ? 1 : 0;

  return 1 + guaranteedExtra + bonusFish;
}

/**
 * Calculate titan bonus multiplier for Mythic fish
 * Mythic fish get a gold multiplier based on strength
 * @param {number} totalStrength - Total strength (base + equipment)
 * @returns {number} Titan bonus multiplier (>= 1.0)
 */
function calculateTitanBonus(totalStrength) {
  const guaranteedExtra = Math.floor(totalStrength / 50);
  const remainder = totalStrength % 50;
  const avgBonus = remainder / 50;
  const wouldHaveCaught = guaranteedExtra + avgBonus;

  return 1 + (0.5 * wouldHaveCaught);
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

  // Gold: 100-150% of highest legendary, scaled by luck
  const baseGold = highestLegendaryGold;
  const goldVariation = Math.random() * 0.5 + 1.0; // 100% to 150%
  const goldReward = Math.floor(baseGold * goldVariation * (1 + (totalLuck / 200)));

  // Relics: Based on biome range, scaled by luck
  const baseRelics = Math.floor(Math.random() * (biomeRelicRange.max - biomeRelicRange.min + 1)) + biomeRelicRange.min;
  const relicReward = Math.floor(baseRelics * (1 + (totalLuck / 200)));

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
 * @returns {Object} { newLevel, newXP, leveledUp }
 */
function calculateLevelUp(currentLevel, currentXP, xpGained) {
  let level = currentLevel;
  let xp = currentXP + xpGained;
  let leveledUp = false;

  while (true) {
    const xpNeeded = calculateXPForNextLevel(level);
    if (xp >= xpNeeded) {
      xp -= xpNeeded;
      level++;
      leveledUp = true;
    } else {
      break;
    }
  }

  return { newLevel: level, newXP: xp, leveledUp };
}

/**
 * Calculate cost to upgrade a stat
 * @param {number} currentStatValue - Current stat value
 * @returns {number} Relic cost
 */
function calculateStatUpgradeCost(currentStatValue) {
  // Linear scaling for early levels (1-10), then exponential
  // This makes early upgrades affordable while scaling later
  if (currentStatValue <= 10) {
    return Math.max(1, Math.floor(currentStatValue * 1.5));
  }

  // Exponential scaling for higher levels
  const baseRelics = 3;
  return Math.floor(baseRelics * Math.pow(currentStatValue, 1.3));
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
  generateTreasureChest,
  calculateXPForNextLevel,
  calculateLevelUp,
  calculateStatUpgradeCost,
  findFishInBiome,
  selectRandomFish
};
