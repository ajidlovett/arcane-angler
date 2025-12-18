// Equipment Data - Rods and Baits (ES Module format for backend)
// Loads from JSON files

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load rods from JSON file
const rodsPath = join(__dirname, '..', 'rods.json');
const rodsData = JSON.parse(readFileSync(rodsPath, 'utf-8'));

// Load baits from JSON file
const baitsPath = join(__dirname, '..', 'baits.json');
const baitsData = JSON.parse(readFileSync(baitsPath, 'utf-8'));

// Convert rods array to object map for backward compatibility
export const RODS = {};
rodsData.forEach(rod => {
  RODS[rod.id] = rod;
});

// Convert baits array to object map for backward compatibility
export const BAITS = {};
baitsData.forEach(bait => {
  BAITS[bait.id] = bait;
});

// Helper functions
export function getRodById(id) {
  return RODS[id] || null;
}

export function getBaitById(id) {
  return BAITS[id] || null;
}

export function getRodsForBiome(currentBiome) {
  return rodsData.filter(rod =>
    rod.biome_id === 'global' || rod.biome_id === currentBiome
  );
}

export function getBaitsForBiome(currentBiome) {
  return baitsData.filter(bait =>
    bait.biome_id === 'global' || bait.biome_id === currentBiome
  );
}

// Calculate rod upgrade cost
export function calculateRodUpgradeCost(rodId, currentLevel) {
  const rod = getRodById(rodId);
  if (!rod || rod.max_level === 0) return 0;

  const cost = Math.floor(rod.base_cost * Math.pow(rod.cost_multiplier, currentLevel));
  return cost;
}

// Export arrays for iteration
export const RODS_ARRAY = rodsData;
export const BAITS_ARRAY = baitsData;
