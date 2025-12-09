-- Fix unlocked_biomes for existing users and ensure new users start with biome 1 unlocked

-- Update existing NULL values to [1]
UPDATE player_data
SET unlocked_biomes = JSON_ARRAY(1)
WHERE unlocked_biomes IS NULL OR unlocked_biomes = 'null';

-- Note: The discovered_fish column in player_data is deprecated
-- We now use the locked_fish table for tracking discovered fish (for fishpedia)
-- No action needed for discovered_fish column
