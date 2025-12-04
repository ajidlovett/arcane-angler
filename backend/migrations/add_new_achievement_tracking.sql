-- Migration: Add new achievement tracking columns for Exotic, Arcane, and detailed stats
-- Date: 2025-12-04

USE arcane_angler;

-- Add new achievement tracking columns to player_data
-- Note: If columns already exist, you can safely ignore the error or comment out the ones that exist
ALTER TABLE player_data
ADD COLUMN exotics_caught INT DEFAULT 0,
ADD COLUMN arcanes_caught INT DEFAULT 0,
ADD COLUMN treasure_chests_found INT DEFAULT 0,
ADD COLUMN str_upgraded INT DEFAULT 0,
ADD COLUMN int_upgraded INT DEFAULT 0,
ADD COLUMN luck_upgraded INT DEFAULT 0,
ADD COLUMN stamina_upgraded INT DEFAULT 0,
ADD COLUMN total_relics_earned INT DEFAULT 0;

-- Add indexes for performance on frequently queried columns
-- Note: If indexes already exist, you can safely ignore the error
CREATE INDEX idx_exotics_caught ON player_data (exotics_caught);
CREATE INDEX idx_arcanes_caught ON player_data (arcanes_caught);
CREATE INDEX idx_treasure_chests_found ON player_data (treasure_chests_found);

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
