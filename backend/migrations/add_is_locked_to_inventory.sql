-- Add is_locked column to player_inventory to track manually locked fish
-- This is separate from locked_fish table which tracks discovered fish for fishpedia

-- Add the column (will error if it already exists - that's okay, just means it's already added)
ALTER TABLE player_inventory
ADD COLUMN is_locked BOOLEAN DEFAULT FALSE;

-- Add index for better query performance
ALTER TABLE player_inventory
ADD INDEX idx_user_locked (user_id, is_locked);
