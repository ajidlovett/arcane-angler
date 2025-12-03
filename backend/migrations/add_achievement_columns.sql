-- Migration: Add achievement tracking columns to player_data table
-- Date: 2025-12-03

USE arcane_angler;

-- Add new achievement tracking columns to player_data
ALTER TABLE player_data
ADD COLUMN IF NOT EXISTS achievements JSON DEFAULT '[]',
ADD COLUMN IF NOT EXISTS total_fish_caught INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_fish_sold INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_gold_earned BIGINT DEFAULT 0,
ADD COLUMN IF NOT EXISTS mythics_caught INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS legendaries_caught INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS stats_upgraded INT DEFAULT 0;

-- Add indexes for performance
ALTER TABLE player_data
ADD INDEX IF NOT EXISTS idx_total_fish_caught (total_fish_caught),
ADD INDEX IF NOT EXISTS idx_mythics_caught (mythics_caught);

-- Update any existing rows to have default values
UPDATE player_data
SET
    achievements = '[]',
    total_fish_caught = 0,
    total_fish_sold = 0,
    total_gold_earned = 0,
    mythics_caught = 0,
    legendaries_caught = 0,
    stats_upgraded = 0
WHERE achievements IS NULL;
