-- Migration: Add total_caught column to player_inventory
-- Purpose: Track total number of times each fish species has been caught (not just current inventory count)
-- Date: 2025-12-09

-- Add total_caught column if it doesn't exist
ALTER TABLE player_inventory
ADD COLUMN IF NOT EXISTS total_caught INT DEFAULT 0 AFTER count;

-- Initialize total_caught with current count values for existing records
-- This ensures existing fish show their current count as minimum total caught
UPDATE player_inventory
SET total_caught = count
WHERE total_caught = 0 AND count > 0;
