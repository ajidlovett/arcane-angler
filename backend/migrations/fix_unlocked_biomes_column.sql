-- Fix unlocked_biomes column to be proper JSON type
-- Date: 2025-12-03

-- First, drop the problematic column
ALTER TABLE player_data DROP COLUMN IF EXISTS unlocked_biomes;

-- Recreate it with proper JSON type
ALTER TABLE player_data ADD COLUMN unlocked_biomes JSON;

-- Set default value for all users
UPDATE player_data SET unlocked_biomes = '[1]';

-- Verify
SELECT user_id, unlocked_biomes, JSON_VALID(unlocked_biomes) as is_valid
FROM player_data;
