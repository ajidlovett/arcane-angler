-- Migration: Add rod levels system and convert equipment to IDs
-- Date: 2025-12-18
-- Description: Adds rod_levels JSON field and converts equipment references from names to IDs

USE arcane_angler;

-- 1. Add rod_levels column to player_data
ALTER TABLE player_data ADD COLUMN rod_levels JSON AFTER equipped_bait;

-- 2. Initialize rod_levels for existing players
-- Map old rod names to new IDs and set all to level 1
UPDATE player_data
SET rod_levels = JSON_OBJECT(
    -- Convert equipped rod name to ID (if owned)
    CASE equipped_rod
        WHEN 'Willow Branch' THEN 'rod_default'
        WHEN 'Bamboo Pole' THEN 'rod_default'
        WHEN 'Ironwood Caster' THEN 'rod_strength'
        WHEN 'Fortune\'s Whim' THEN 'rod_luck'
        WHEN 'Archaeologist\'s Rod' THEN 'rod_relic'
        WHEN 'Gilded Seeker' THEN 'rod_treasure'
        ELSE 'rod_default'
    END,
    1
);

-- 3. Update equipped_rod to use IDs
UPDATE player_data
SET equipped_rod = CASE equipped_rod
    WHEN 'Willow Branch' THEN 'rod_default'
    WHEN 'Bamboo Pole' THEN 'rod_default'
    WHEN 'Ironwood Caster' THEN 'rod_strength'
    WHEN 'Fortune\'s Whim' THEN 'rod_luck'
    WHEN 'Archaeologist\'s Rod' THEN 'rod_relic'
    WHEN 'Gilded Seeker' THEN 'rod_treasure'
    ELSE 'rod_default'
END;

-- 4. Update equipped_bait to use IDs
UPDATE player_data
SET equipped_bait = CASE equipped_bait
    WHEN 'Stale Bread Crust' THEN 'bait_default'
    WHEN 'None' THEN 'bait_default'
    WHEN 'Bread Crumbs' THEN 'bait_default'
    ELSE 'bait_default'
END;

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
END;

-- 6. Update bait_inventory to use IDs
UPDATE bait_inventory
SET bait_name = CASE bait_name
    WHEN 'Stale Bread Crust' THEN 'bait_default'
    WHEN 'Bread Crumbs' THEN 'bait_default'
    ELSE bait_name
END;

-- 7. Verify migration
SELECT
    COUNT(*) as total_players,
    COUNT(CASE WHEN rod_levels IS NOT NULL THEN 1 END) as players_with_rod_levels,
    COUNT(CASE WHEN equipped_rod LIKE 'rod_%' THEN 1 END) as players_with_rod_ids,
    COUNT(CASE WHEN equipped_bait LIKE 'bait_%' THEN 1 END) as players_with_bait_ids
FROM player_data;

-- Migration complete!
-- Note: Biome-specific rods will be auto-unlocked when players visit each biome
