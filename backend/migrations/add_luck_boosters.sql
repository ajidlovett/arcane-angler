-- Add new Luck boosters and update existing STR boosters
-- Date: 2025-12-23

-- Step 1: Add new booster types to ENUM
ALTER TABLE player_boosters MODIFY COLUMN booster_type
  ENUM('knowledge_scroll', 'ancient_tome', 'giants_potion', 'titans_elixir', 'fortune_charm', 'fate_elixir') NOT NULL;

-- Step 2: Add new effect types to ENUM
ALTER TABLE player_boosters MODIFY COLUMN effect_type
  ENUM('xp_bonus', 'stat_bonus', 'strength_bonus', 'luck_bonus') NOT NULL;

-- Step 3: Update existing stat_bonus records to strength_bonus
-- This changes existing Giant's Potion and Titan's Elixir to be STR-only boosters
UPDATE player_boosters
SET effect_type = 'strength_bonus'
WHERE effect_type = 'stat_bonus' AND (booster_type = 'giants_potion' OR booster_type = 'titans_elixir');

-- Verify changes
SELECT 'Updated booster types and effect types successfully' AS status;
