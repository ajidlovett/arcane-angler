-- Migration: Add rod levels system and convert equipment to IDs
-- Date: 2025-12-18
-- Description: Adds rod_levels JSON field and converts equipment references from names to IDs

USE arcane_angler;

-- 1. Add rod_levels column to player_data if it doesn't exist
ALTER TABLE player_data ADD COLUMN IF NOT EXISTS rod_levels JSON AFTER equipped_bait;

-- 2. Initialize rod_levels for ALL existing players
-- Set rod_default to level 1 for everyone
UPDATE player_data
SET rod_levels = JSON_OBJECT('rod_default', 1)
WHERE rod_levels IS NULL OR rod_levels = '';

-- 3. Update equipped_rod to use IDs for existing players
UPDATE player_data
SET equipped_rod = CASE equipped_rod
    WHEN 'Willow Branch' THEN 'rod_default'
    WHEN 'Bamboo Pole' THEN 'rod_default'
    WHEN 'Ironwood Caster' THEN 'rod_strength'
    WHEN 'Fortune\'s Whim' THEN 'rod_luck'
    WHEN 'Archaeologist\'s Rod' THEN 'rod_relic'
    WHEN 'Gilded Seeker' THEN 'rod_treasure'
    ELSE 'rod_default'
END
WHERE equipped_rod NOT LIKE 'rod_%';

-- 4. Update equipped_bait to use IDs for existing players
UPDATE player_data
SET equipped_bait = CASE equipped_bait
    WHEN 'Stale Bread Crust' THEN 'bait_default'
    WHEN 'None' THEN 'bait_default'
    WHEN 'Bread Crumbs' THEN 'bait_default'
    ELSE COALESCE(equipped_bait, 'bait_default')
END
WHERE equipped_bait NOT LIKE 'bait_%' OR equipped_bait IS NULL;

-- 5. Update owned_rods to use IDs
UPDATE owned_rods
SET rod_name = CASE rod_name
    WHEN 'Willow Branch' THEN 'rod_default'
    WHEN 'Bamboo Pole' THEN 'rod_default'
    WHEN 'Ironwood Caster' THEN 'rod_strength'
    WHEN 'Fortune\'s Whim' THEN 'rod_luck'
    WHEN 'Archaeologist\'s Rod' THEN 'rod_relic'
    WHEN 'Gilded Seeker' THEN 'rod_treasure'
    ELSE rod_name
END
WHERE rod_name NOT LIKE 'rod_%';

-- 6. Ensure all players have rod_default in owned_rods
INSERT IGNORE INTO owned_rods (user_id, rod_name)
SELECT DISTINCT user_id, 'rod_default'
FROM player_data
WHERE user_id NOT IN (
    SELECT user_id FROM owned_rods WHERE rod_name = 'rod_default'
);

-- 7. Update bait_inventory to use IDs
UPDATE bait_inventory
SET bait_name = CASE bait_name
    WHEN 'Stale Bread Crust' THEN 'bait_default'
    WHEN 'Bread Crumbs' THEN 'bait_default'
    ELSE bait_name
END
WHERE bait_name NOT LIKE 'bait_%';

-- 8. Ensure all players have bait_default in bait_inventory
INSERT INTO bait_inventory (user_id, bait_name, quantity)
SELECT DISTINCT pd.user_id, 'bait_default', 999999
FROM player_data pd
WHERE pd.user_id NOT IN (
    SELECT user_id FROM bait_inventory WHERE bait_name = 'bait_default'
)
ON DUPLICATE KEY UPDATE quantity = GREATEST(quantity, 999999);

-- 9. Verify migration
SELECT
    COUNT(*) as total_players,
    COUNT(CASE WHEN rod_levels IS NOT NULL THEN 1 END) as players_with_rod_levels,
    COUNT(CASE WHEN equipped_rod LIKE 'rod_%' THEN 1 END) as players_with_rod_ids,
    COUNT(CASE WHEN equipped_bait LIKE 'bait_%' THEN 1 END) as players_with_bait_ids
FROM player_data;

-- Migration complete!
-- Note: Biome-specific rods will be auto-unlocked when players visit each biome
