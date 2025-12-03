-- Migration: Add discovered_fish column to player_data table
-- Date: 2025-12-03

USE arcane_angler;

-- Add discovered_fish column to track which fish the player has caught
ALTER TABLE player_data
ADD COLUMN IF NOT EXISTS discovered_fish JSON DEFAULT '[]';

-- Update any existing rows to have empty array as default
UPDATE player_data
SET discovered_fish = '[]'
WHERE discovered_fish IS NULL;
