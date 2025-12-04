-- Migration: Add new achievement tracking columns for Exotic, Arcane, and detailed stats
-- Date: 2025-12-04

USE arcane_angler;

-- Add new achievement tracking columns to player_data
ALTER TABLE player_data
ADD COLUMN IF NOT EXISTS exotics_caught INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS arcanes_caught INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS treasure_chests_found INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS str_upgraded INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS int_upgraded INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS luck_upgraded INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS stamina_upgraded INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_relics_earned INT DEFAULT 0;

-- Add indexes for performance on frequently queried columns
ALTER TABLE player_data
ADD INDEX IF NOT EXISTS idx_exotics_caught (exotics_caught),
ADD INDEX IF NOT EXISTS idx_arcanes_caught (arcanes_caught),
ADD INDEX IF NOT EXISTS idx_treasure_chests_found (treasure_chests_found);

-- Update any existing rows to have default values
UPDATE player_data
SET
    exotics_caught = COALESCE(exotics_caught, 0),
    arcanes_caught = COALESCE(arcanes_caught, 0),
    treasure_chests_found = COALESCE(treasure_chests_found, 0),
    str_upgraded = COALESCE(str_upgraded, 0),
    int_upgraded = COALESCE(int_upgraded, 0),
    luck_upgraded = COALESCE(luck_upgraded, 0),
    stamina_upgraded = COALESCE(stamina_upgraded, 0),
    total_relics_earned = COALESCE(total_relics_earned, 0)
WHERE exotics_caught IS NULL
   OR arcanes_caught IS NULL
   OR treasure_chests_found IS NULL
   OR str_upgraded IS NULL
   OR int_upgraded IS NULL
   OR luck_upgraded IS NULL
   OR stamina_upgraded IS NULL
   OR total_relics_earned IS NULL;
