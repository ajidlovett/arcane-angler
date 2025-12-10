-- Migration: Add comprehensive leaderboard tracking columns
-- Date: 2025-12-10
-- Description: Adds all required columns for comprehensive leaderboard tracking
-- Compatible with MySQL 5.7+

USE arcane_angler;

-- Check and add columns one by one (compatible with older MySQL)
-- We'll ignore errors if columns already exist

-- Add nationality column
SET @db_name = 'arcane_angler';
SET @table_name = 'leaderboard_stats';
SET @column_name = 'nationality';
SET @column_def = 'VARCHAR(10) DEFAULT NULL COMMENT "ISO 3166-1 alpha-2 country code"';

SET @sql = CONCAT('ALTER TABLE ', @table_name, ' ADD COLUMN ', @column_name, ' ', @column_def);
SET @column_exists = (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = @db_name AND TABLE_NAME = @table_name AND COLUMN_NAME = @column_name
);

SET @sql = IF(@column_exists = 0, @sql, 'SELECT "Column nationality already exists"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add total_casts
SET @column_name = 'total_casts';
SET @column_def = 'BIGINT DEFAULT 0 COMMENT "Total cast line actions"';
SET @sql = CONCAT('ALTER TABLE ', @table_name, ' ADD COLUMN ', @column_name, ' ', @column_def);
SET @column_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @db_name AND TABLE_NAME = @table_name AND COLUMN_NAME = @column_name);
SET @sql = IF(@column_exists = 0, @sql, 'SELECT "Column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Add fish_sold
SET @column_name = 'fish_sold';
SET @column_def = 'BIGINT DEFAULT 0 COMMENT "Total fish sold"';
SET @sql = CONCAT('ALTER TABLE ', @table_name, ' ADD COLUMN ', @column_name, ' ', @column_def);
SET @column_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @db_name AND TABLE_NAME = @table_name AND COLUMN_NAME = @column_name);
SET @sql = IF(@column_exists = 0, @sql, 'SELECT "Column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Add gold_earned
SET @column_name = 'gold_earned';
SET @column_def = 'BIGINT DEFAULT 0 COMMENT "Total gold earned over time"';
SET @sql = CONCAT('ALTER TABLE ', @table_name, ' ADD COLUMN ', @column_name, ' ', @column_def);
SET @column_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @db_name AND TABLE_NAME = @table_name AND COLUMN_NAME = @column_name);
SET @sql = IF(@column_exists = 0, @sql, 'SELECT "Column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Add relics_earned
SET @column_name = 'relics_earned';
SET @column_def = 'INT DEFAULT 0 COMMENT "Total relics earned over time"';
SET @sql = CONCAT('ALTER TABLE ', @table_name, ' ADD COLUMN ', @column_name, ' ', @column_def);
SET @column_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @db_name AND TABLE_NAME = @table_name AND COLUMN_NAME = @column_name);
SET @sql = IF(@column_exists = 0, @sql, 'SELECT "Column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Add common_caught
SET @column_name = 'common_caught';
SET @column_def = 'INT DEFAULT 0 COMMENT "Total common fish caught"';
SET @sql = CONCAT('ALTER TABLE ', @table_name, ' ADD COLUMN ', @column_name, ' ', @column_def);
SET @column_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @db_name AND TABLE_NAME = @table_name AND COLUMN_NAME = @column_name);
SET @sql = IF(@column_exists = 0, @sql, 'SELECT "Column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Add uncommon_caught
SET @column_name = 'uncommon_caught';
SET @column_def = 'INT DEFAULT 0 COMMENT "Total uncommon fish caught"';
SET @sql = CONCAT('ALTER TABLE ', @table_name, ' ADD COLUMN ', @column_name, ' ', @column_def);
SET @column_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @db_name AND TABLE_NAME = @table_name AND COLUMN_NAME = @column_name);
SET @sql = IF(@column_exists = 0, @sql, 'SELECT "Column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Add fine_caught
SET @column_name = 'fine_caught';
SET @column_def = 'INT DEFAULT 0 COMMENT "Total fine fish caught"';
SET @sql = CONCAT('ALTER TABLE ', @table_name, ' ADD COLUMN ', @column_name, ' ', @column_def);
SET @column_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @db_name AND TABLE_NAME = @table_name AND COLUMN_NAME = @column_name);
SET @sql = IF(@column_exists = 0, @sql, 'SELECT "Column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Add rare_caught
SET @column_name = 'rare_caught';
SET @column_def = 'INT DEFAULT 0 COMMENT "Total rare fish caught"';
SET @sql = CONCAT('ALTER TABLE ', @table_name, ' ADD COLUMN ', @column_name, ' ', @column_def);
SET @column_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @db_name AND TABLE_NAME = @table_name AND COLUMN_NAME = @column_name);
SET @sql = IF(@column_exists = 0, @sql, 'SELECT "Column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Add epic_caught
SET @column_name = 'epic_caught';
SET @column_def = 'INT DEFAULT 0 COMMENT "Total epic fish caught"';
SET @sql = CONCAT('ALTER TABLE ', @table_name, ' ADD COLUMN ', @column_name, ' ', @column_def);
SET @column_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @db_name AND TABLE_NAME = @table_name AND COLUMN_NAME = @column_name);
SET @sql = IF(@column_exists = 0, @sql, 'SELECT "Column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Add treasure_caught
SET @column_name = 'treasure_caught';
SET @column_def = 'INT DEFAULT 0 COMMENT "Total treasure chests found"';
SET @sql = CONCAT('ALTER TABLE ', @table_name, ' ADD COLUMN ', @column_name, ' ', @column_def);
SET @column_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @db_name AND TABLE_NAME = @table_name AND COLUMN_NAME = @column_name);
SET @sql = IF(@column_exists = 0, @sql, 'SELECT "Column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Add exotic_caught
SET @column_name = 'exotic_caught';
SET @column_def = 'INT DEFAULT 0 COMMENT "Total exotic fish caught"';
SET @sql = CONCAT('ALTER TABLE ', @table_name, ' ADD COLUMN ', @column_name, ' ', @column_def);
SET @column_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @db_name AND TABLE_NAME = @table_name AND COLUMN_NAME = @column_name);
SET @sql = IF(@column_exists = 0, @sql, 'SELECT "Column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Add arcane_caught
SET @column_name = 'arcane_caught';
SET @column_def = 'INT DEFAULT 0 COMMENT "Total arcane fish caught"';
SET @sql = CONCAT('ALTER TABLE ', @table_name, ' ADD COLUMN ', @column_name, ' ', @column_def);
SET @column_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @db_name AND TABLE_NAME = @table_name AND COLUMN_NAME = @column_name);
SET @sql = IF(@column_exists = 0, @sql, 'SELECT "Column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Add total_stats_upgraded
SET @column_name = 'total_stats_upgraded';
SET @column_def = 'INT DEFAULT 0 COMMENT "Total stat upgrades purchased"';
SET @sql = CONCAT('ALTER TABLE ', @table_name, ' ADD COLUMN ', @column_name, ' ', @column_def);
SET @column_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @db_name AND TABLE_NAME = @table_name AND COLUMN_NAME = @column_name);
SET @sql = IF(@column_exists = 0, @sql, 'SELECT "Column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Add strength
SET @column_name = 'strength';
SET @column_def = 'INT DEFAULT 1 COMMENT "Current strength stat"';
SET @sql = CONCAT('ALTER TABLE ', @table_name, ' ADD COLUMN ', @column_name, ' ', @column_def);
SET @column_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @db_name AND TABLE_NAME = @table_name AND COLUMN_NAME = @column_name);
SET @sql = IF(@column_exists = 0, @sql, 'SELECT "Column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Add intelligence
SET @column_name = 'intelligence';
SET @column_def = 'INT DEFAULT 1 COMMENT "Current intelligence stat"';
SET @sql = CONCAT('ALTER TABLE ', @table_name, ' ADD COLUMN ', @column_name, ' ', @column_def);
SET @column_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @db_name AND TABLE_NAME = @table_name AND COLUMN_NAME = @column_name);
SET @sql = IF(@column_exists = 0, @sql, 'SELECT "Column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Add luck
SET @column_name = 'luck';
SET @column_def = 'INT DEFAULT 1 COMMENT "Current luck stat"';
SET @sql = CONCAT('ALTER TABLE ', @table_name, ' ADD COLUMN ', @column_name, ' ', @column_def);
SET @column_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @db_name AND TABLE_NAME = @table_name AND COLUMN_NAME = @column_name);
SET @sql = IF(@column_exists = 0, @sql, 'SELECT "Column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Add stamina
SET @column_name = 'stamina';
SET @column_def = 'INT DEFAULT 100 COMMENT "Current max stamina"';
SET @sql = CONCAT('ALTER TABLE ', @table_name, ' ADD COLUMN ', @column_name, ' ', @column_def);
SET @column_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @db_name AND TABLE_NAME = @table_name AND COLUMN_NAME = @column_name);
SET @sql = IF(@column_exists = 0, @sql, 'SELECT "Column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Create indexes
-- Note: These may error if indexes already exist in your database
-- You can safely ignore "Duplicate key name" errors

CREATE INDEX idx_casts_rank ON leaderboard_stats (total_casts DESC);
CREATE INDEX idx_fish_sold_rank ON leaderboard_stats (fish_sold DESC);
CREATE INDEX idx_gold_earned_rank ON leaderboard_stats (gold_earned DESC);
CREATE INDEX idx_relics_earned_rank ON leaderboard_stats (relics_earned DESC);
CREATE INDEX idx_treasure_rank ON leaderboard_stats (treasure_caught DESC);
CREATE INDEX idx_stats_upgraded_rank ON leaderboard_stats (total_stats_upgraded DESC);
CREATE INDEX idx_strength_rank ON leaderboard_stats (strength DESC);
CREATE INDEX idx_intelligence_rank ON leaderboard_stats (intelligence DESC);
CREATE INDEX idx_luck_rank ON leaderboard_stats (luck DESC);
CREATE INDEX idx_stamina_rank ON leaderboard_stats (stamina DESC);
CREATE INDEX idx_nationality ON leaderboard_stats (nationality);

-- Populate nationality from users table
UPDATE leaderboard_stats ls
JOIN users u ON ls.user_id = u.id
SET ls.nationality = u.nationality
WHERE u.nationality IS NOT NULL;

-- Populate stats from player_stats table
UPDATE leaderboard_stats ls
JOIN player_stats ps ON ls.user_id = ps.user_id
SET
    ls.strength = ps.strength,
    ls.intelligence = ps.intelligence,
    ls.luck = ps.luck,
    ls.stamina = ps.stamina;

-- Note: Other columns will be populated by triggers on future updates
-- For existing players, you may need to run a one-time data migration script
