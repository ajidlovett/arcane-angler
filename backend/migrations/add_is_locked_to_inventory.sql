-- Add is_locked column to player_inventory to track manually locked fish
-- This is separate from locked_fish table which tracks discovered fish for fishpedia

ALTER TABLE player_inventory
ADD COLUMN IF NOT EXISTS is_locked BOOLEAN DEFAULT FALSE;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_user_locked ON player_inventory(user_id, is_locked);
