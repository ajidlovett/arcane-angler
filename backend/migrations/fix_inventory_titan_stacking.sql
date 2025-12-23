-- Fix inventory stacking to separate fish with different Titan values
-- Date: 2025-12-23

-- Drop the old UNIQUE KEY that doesn't include rarity and titan_bonus
-- Note: This will error if the index doesn't exist, which is safe to ignore
ALTER TABLE player_inventory DROP INDEX unique_fish_per_user;

-- Add new UNIQUE KEY that includes rarity and titan_bonus (rounded to 2 decimals)
-- This ensures fish with different titan values are stored separately
ALTER TABLE player_inventory
ADD UNIQUE KEY unique_fish_rarity_titan (user_id, fish_name, rarity, titan_bonus);

-- Verify the change
SHOW INDEX FROM player_inventory WHERE Key_name = 'unique_fish_rarity_titan';
