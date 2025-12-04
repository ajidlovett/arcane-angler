-- Complete database fix for all missing columns
-- Date: 2025-12-03

-- 1. Add base_gold and titan_bonus to player_inventory
ALTER TABLE player_inventory
ADD COLUMN IF NOT EXISTS base_gold INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS titan_bonus DECIMAL(5,2) DEFAULT 1.0;

-- 2. Ensure discovered_fish exists in player_data
ALTER TABLE player_data
ADD COLUMN IF NOT EXISTS discovered_fish JSON;

-- 3. Ensure unlocked_biomes exists in player_data
ALTER TABLE player_data
ADD COLUMN IF NOT EXISTS unlocked_biomes JSON;

-- 4. Set default values for existing records
UPDATE player_data
SET discovered_fish = '[]'
WHERE discovered_fish IS NULL;

UPDATE player_data
SET unlocked_biomes = '[1]'
WHERE unlocked_biomes IS NULL;

-- 5. Fix any existing inventory items (set base_gold to 0 if NULL)
UPDATE player_inventory
SET base_gold = 0
WHERE base_gold IS NULL;

UPDATE player_inventory
SET titan_bonus = 1.0
WHERE titan_bonus IS NULL;

-- Verify columns exist
SELECT
    'player_inventory' as table_name,
    COLUMN_NAME,
    DATA_TYPE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'arcane_angler'
  AND TABLE_NAME = 'player_inventory'
  AND COLUMN_NAME IN ('base_gold', 'titan_bonus');

SELECT
    'player_data' as table_name,
    COLUMN_NAME,
    DATA_TYPE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'arcane_angler'
  AND TABLE_NAME = 'player_data'
  AND COLUMN_NAME IN ('discovered_fish', 'unlocked_biomes');
