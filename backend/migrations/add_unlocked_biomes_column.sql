-- Migration: Add unlocked_biomes column to player_data table
-- Date: 2025-12-03

-- Add unlocked_biomes column to track which biomes have been paid for
ALTER TABLE player_data
ADD COLUMN unlocked_biomes JSON;

-- Set all existing rows to have biome 1 unlocked by default
UPDATE player_data
SET unlocked_biomes = '[1]';
