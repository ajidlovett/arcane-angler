/**
 * Weather Service - Server-Authoritative Weather System
 *
 * Manages per-biome weather states that update every hour
 * Weather affects rarity weights (percentage-based) and fishing XP bonus
 *
 * Weather States:
 * - Clear (35%)
 * - Rain (20%)
 * - Windy (13%)
 * - Foggy (10%)
 * - Heatwave (8%)
 * - Storm (7%)
 * - Blight (5%)
 * - Gold Breeze (1%)
 * - Arcane Surge (1%)
 *
 * Features:
 * - Per-biome weather state (not global)
 * - Updates every hour automatically
 * - O(1) weather lookup per fishing request
 * - Treasure Chest rarity unaffected by weather
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load weather configuration from weather.json
const weatherConfigPath = path.join(__dirname, '..', 'weather.json');
let weatherConfig = {};

try {
  const configData = fs.readFileSync(weatherConfigPath, 'utf8');
  weatherConfig = JSON.parse(configData);
  console.log('[WeatherService] Weather config loaded successfully');
} catch (error) {
  console.error('[WeatherService] Failed to load weather.json:', error);
  // Fallback to minimal config
  weatherConfig = {
    clear: { modifiers: {}, xpBonus: 0 },
    rain: { modifiers: {}, xpBonus: 5 },
    windy: { modifiers: {}, xpBonus: 10 },
    foggy: { modifiers: {}, xpBonus: 12 },
    heatwave: { modifiers: {}, xpBonus: 15 },
    storm: { modifiers: {}, xpBonus: 25 },
    blight: { modifiers: {}, xpBonus: -50 },
    gold_breeze: { modifiers: {}, xpBonus: -25 },
    arcane_surge: { modifiers: {}, xpBonus: 50 }
  };
}

// Weather roll probabilities (sum to 100)
const WEATHER_PROBABILITIES = {
  clear: 35,
  rain: 20,
  windy: 13,
  foggy: 10,
  heatwave: 8,
  storm: 7,
  blight: 5,
  gold_breeze: 1,
  arcane_surge: 1
};

// Weather update interval (1 hour in milliseconds)
const WEATHER_UPDATE_INTERVAL = 1 * 60 * 60 * 1000; // 1 hour

// In-memory weather state map: biomeId -> { weather: string, lastUpdate: timestamp }
const biomeWeatherState = new Map();

// Total number of biomes (hardcoded for now, can be made dynamic)
const TOTAL_BIOMES = 40;

/**
 * Roll a random weather based on probabilities
 * @returns {string} Weather type (e.g., 'clear', 'rain', 'storm')
 */
function rollWeather() {
  const random = Math.random() * 100; // 0-100
  let cumulative = 0;

  for (const [weather, probability] of Object.entries(WEATHER_PROBABILITIES)) {
    cumulative += probability;
    if (random < cumulative) {
      return weather;
    }
  }

  // Fallback to clear (should never reach here)
  return 'clear';
}

/**
 * Initialize weather for a specific biome
 * @param {number} biomeId - Biome ID
 */
function initializeBiomeWeather(biomeId) {
  const weather = rollWeather();
  biomeWeatherState.set(biomeId, {
    weather,
    lastUpdate: Date.now()
  });
  console.log(`[WeatherService] Initialized biome ${biomeId} with weather: ${weather}`);
}

/**
 * Log weather change (weather chat channel removed)
 * @param {number} biomeId - Biome ID
 * @param {string} newWeather - New weather type
 */
async function logWeatherChange(biomeId, newWeather) {
  // Just log to console - no chat broadcast
  if (newWeather !== 'clear') {
    console.log(`[WeatherService] Biome ${biomeId} weather changed to ${newWeather}`);
  }
}

/**
 * Update weather for a specific biome if 1 hour has passed
 * @param {number} biomeId - Biome ID
 */
function updateBiomeWeatherIfNeeded(biomeId) {
  const state = biomeWeatherState.get(biomeId);

  if (!state) {
    // First time accessing this biome - initialize it
    initializeBiomeWeather(biomeId);
    return;
  }

  const timeSinceLastUpdate = Date.now() - state.lastUpdate;

  if (timeSinceLastUpdate >= WEATHER_UPDATE_INTERVAL) {
    // Roll new weather
    const newWeather = rollWeather();
    biomeWeatherState.set(biomeId, {
      weather: newWeather,
      lastUpdate: Date.now()
    });
    console.log(`[WeatherService] Updated biome ${biomeId} weather: ${state.weather} -> ${newWeather}`);

    // Log weather change (chat broadcast removed)
    logWeatherChange(biomeId, newWeather);
  }
}

/**
 * Get current weather for a biome (O(1) lookup)
 * @param {number} biomeId - Biome ID
 * @returns {Object} { weather: string, xpBonus: number, modifiers: Object }
 */
export function getBiomeWeather(biomeId) {
  // Update weather if needed
  updateBiomeWeatherIfNeeded(biomeId);

  const state = biomeWeatherState.get(biomeId);
  const weatherType = state.weather;
  const config = weatherConfig[weatherType] || weatherConfig.clear;

  return {
    weather: weatherType,
    xpBonus: config.xpBonus || 0,
    modifiers: config.modifiers || {}
  };
}

/**
 * Apply weather modifiers to rarity weights
 * NOTE: Treasure Chest is UNAFFECTED by weather
 *
 * @param {Object} weights - Base rarity weights { Common: 60046, Uncommon: 23000, ... }
 * @param {number} biomeId - Current biome ID
 * @returns {Object} Modified weights
 */
export function applyWeatherToWeights(weights, biomeId) {
  const weather = getBiomeWeather(biomeId);
  const modifiers = weather.modifiers;

  // Create a copy of weights to modify
  const modifiedWeights = { ...weights };

  // Apply percentage modifiers to each rarity (except Treasure Chest)
  for (const [rarity, baseWeight] of Object.entries(modifiedWeights)) {
    if (rarity === 'Treasure Chest') {
      // Treasure Chest is unaffected by weather
      continue;
    }

    // Convert rarity name to lowercase for lookup (e.g., "Common" -> "common")
    const rarityKey = rarity.toLowerCase();
    const modifier = modifiers[rarityKey] || 0; // Percentage modifier (e.g., -10 for -10%)

    // Apply modifier: newWeight = baseWeight * (1 + modifier/100)
    // Example: 60046 * (1 + (-10)/100) = 60046 * 0.9 = 54041
    const multiplier = 1 + (modifier / 100);
    modifiedWeights[rarity] = Math.max(1, Math.floor(baseWeight * multiplier)); // Ensure weight >= 1
  }

  return modifiedWeights;
}

/**
 * Get weather XP bonus for a biome
 * @param {number} biomeId - Biome ID
 * @returns {number} XP bonus percentage (e.g., 25 for +25%)
 */
export function getWeatherXpBonus(biomeId) {
  const weather = getBiomeWeather(biomeId);
  return weather.xpBonus || 0;
}

/**
 * Get all biome weather states (for API endpoint)
 * @returns {Object} Map of biomeId -> { weather, xpBonus }
 */
export function getAllBiomeWeather() {
  const result = {};

  // Only return initialized biomes
  for (const [biomeId, state] of biomeWeatherState.entries()) {
    updateBiomeWeatherIfNeeded(biomeId);
    const updatedState = biomeWeatherState.get(biomeId);
    const config = weatherConfig[updatedState.weather] || weatherConfig.clear;

    result[biomeId] = {
      weather: updatedState.weather,
      xpBonus: config.xpBonus || 0
    };
  }

  return result;
}

/**
 * Initialize all biomes with random weather on server start
 */
export function initializeAllBiomes() {
  console.log(`[WeatherService] Initializing weather for ${TOTAL_BIOMES} biomes...`);

  for (let biomeId = 1; biomeId <= TOTAL_BIOMES; biomeId++) {
    initializeBiomeWeather(biomeId);
  }

  console.log(`[WeatherService] All biomes initialized with weather`);
}

// Auto-initialize all biomes on module load
initializeAllBiomes();

// Set up periodic weather update check (every 30 minutes, check all biomes)
setInterval(() => {
  console.log('[WeatherService] Running periodic weather update check...');
  for (let biomeId = 1; biomeId <= TOTAL_BIOMES; biomeId++) {
    updateBiomeWeatherIfNeeded(biomeId);
  }
}, 30 * 60 * 1000); // Check every 30 minutes

console.log('[WeatherService] Weather service initialized and running');
