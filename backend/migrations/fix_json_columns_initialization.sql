-- Fix JSON column initialization for player_data
-- This ensures unlocked_biomes and achievements are properly initialized

-- First, ensure the columns exist (safe to run even if they exist)
ALTER TABLE player_data ADD COLUMN IF NOT EXISTS unlocked_biomes JSON;
ALTER TABLE player_data ADD COLUMN IF NOT EXISTS achievements JSON;
ALTER TABLE player_data ADD COLUMN IF NOT EXISTS discovered_fish JSON;

-- Fix NULL values in unlocked_biomes (should always have biome 1)
UPDATE player_data
SET unlocked_biomes = JSON_ARRAY(1)
WHERE unlocked_biomes IS NULL OR unlocked_biomes = 'null' OR unlocked_biomes = '[]';

-- Fix NULL values in achievements (should be empty array)
UPDATE player_data
SET achievements = JSON_ARRAY()
WHERE achievements IS NULL OR achievements = 'null';

-- Note: discovered_fish is deprecated - we now use the locked_fish table
-- But we'll keep it as empty array for backwards compatibility
UPDATE player_data
SET discovered_fish = JSON_ARRAY()
WHERE discovered_fish IS NULL OR discovered_fish = 'null';

-- Now update the trigger to properly initialize these columns for new users
DROP TRIGGER IF EXISTS after_user_insert;

DELIMITER $$
CREATE TRIGGER after_user_insert
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    -- Create player data with proper JSON initialization
    INSERT INTO player_data (
        user_id,
        unlocked_biomes,
        achievements,
        discovered_fish
    ) VALUES (
        NEW.id,
        JSON_ARRAY(1),      -- Start with biome 1 unlocked
        JSON_ARRAY(),       -- Empty achievements array
        JSON_ARRAY()        -- Empty discovered fish array (deprecated but kept for compatibility)
    );

    -- Create player stats
    INSERT INTO player_stats (user_id) VALUES (NEW.id);

    -- Add default rod
    INSERT INTO owned_rods (user_id, rod_name) VALUES (NEW.id, 'Willow Branch');

    -- Add infinite starter bait
    INSERT INTO bait_inventory (user_id, bait_name, quantity)
    VALUES (NEW.id, 'Stale Bread Crust', 999999);

    -- Initialize leaderboard stats with profile_username
    INSERT INTO leaderboard_stats (user_id, profile_username)
    VALUES (NEW.id, NEW.profile_username);
END$$
DELIMITER ;
