-- Add is_locked column to player_inventory (safe version that checks first)
-- This is separate from locked_fish table which tracks discovered fish for fishpedia

-- Add the column only if it doesn't exist
SET @query = (
    SELECT IF(
        COUNT(*) = 0,
        'ALTER TABLE player_inventory ADD COLUMN is_locked BOOLEAN DEFAULT FALSE',
        'SELECT "Column already exists" AS message'
    )
    FROM information_schema.columns
    WHERE table_schema = DATABASE()
    AND table_name = 'player_inventory'
    AND column_name = 'is_locked'
);

PREPARE stmt FROM @query;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add index only if it doesn't exist
SET @query = (
    SELECT IF(
        COUNT(*) = 0,
        'ALTER TABLE player_inventory ADD INDEX idx_user_locked (user_id, is_locked)',
        'SELECT "Index already exists" AS message'
    )
    FROM information_schema.statistics
    WHERE table_schema = DATABASE()
    AND table_name = 'player_inventory'
    AND index_name = 'idx_user_locked'
);

PREPARE stmt FROM @query;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
