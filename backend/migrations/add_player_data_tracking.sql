-- Migration: Add tracking columns to player_data
-- Date: 2025-12-10
-- Description: Adds rarity count columns and total_casts for comprehensive tracking
-- Compatible with MySQL 5.7+

USE arcane_angler;

-- Check and add columns one by one
SET @db_name = 'arcane_angler';
SET @table_name = 'player_data';

-- Add commons_caught
SET @column_name = 'commons_caught';
SET @column_def = 'INT DEFAULT 0';
SET @sql = CONCAT('ALTER TABLE ', @table_name, ' ADD COLUMN ', @column_name, ' ', @column_def);
SET @column_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @db_name AND TABLE_NAME = @table_name AND COLUMN_NAME = @column_name);
SET @sql = IF(@column_exists = 0, @sql, 'SELECT "Column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Add uncommons_caught
SET @column_name = 'uncommons_caught';
SET @column_def = 'INT DEFAULT 0';
SET @sql = CONCAT('ALTER TABLE ', @table_name, ' ADD COLUMN ', @column_name, ' ', @column_def);
SET @column_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @db_name AND TABLE_NAME = @table_name AND COLUMN_NAME = @column_name);
SET @sql = IF(@column_exists = 0, @sql, 'SELECT "Column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Add fines_caught
SET @column_name = 'fines_caught';
SET @column_def = 'INT DEFAULT 0';
SET @sql = CONCAT('ALTER TABLE ', @table_name, ' ADD COLUMN ', @column_name, ' ', @column_def);
SET @column_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @db_name AND TABLE_NAME = @table_name AND COLUMN_NAME = @column_name);
SET @sql = IF(@column_exists = 0, @sql, 'SELECT "Column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Add rares_caught
SET @column_name = 'rares_caught';
SET @column_def = 'INT DEFAULT 0';
SET @sql = CONCAT('ALTER TABLE ', @table_name, ' ADD COLUMN ', @column_name, ' ', @column_def);
SET @column_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @db_name AND TABLE_NAME = @table_name AND COLUMN_NAME = @column_name);
SET @sql = IF(@column_exists = 0, @sql, 'SELECT "Column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Add epics_caught
SET @column_name = 'epics_caught';
SET @column_def = 'INT DEFAULT 0';
SET @sql = CONCAT('ALTER TABLE ', @table_name, ' ADD COLUMN ', @column_name, ' ', @column_def);
SET @column_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @db_name AND TABLE_NAME = @table_name AND COLUMN_NAME = @column_name);
SET @sql = IF(@column_exists = 0, @sql, 'SELECT "Column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Add total_casts
SET @column_name = 'total_casts';
SET @column_def = 'BIGINT DEFAULT 0';
SET @sql = CONCAT('ALTER TABLE ', @table_name, ' ADD COLUMN ', @column_name, ' ', @column_def);
SET @column_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @db_name AND TABLE_NAME = @table_name AND COLUMN_NAME = @column_name);
SET @sql = IF(@column_exists = 0, @sql, 'SELECT "Column already exists"');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Populate rarity counts from fishpedia_stats
UPDATE player_data pd
SET
    pd.commons_caught = (
        SELECT COALESCE(SUM(total_caught), 0)
        FROM fishpedia_stats
        WHERE user_id = pd.user_id AND rarity = 'Common'
    ),
    pd.uncommons_caught = (
        SELECT COALESCE(SUM(total_caught), 0)
        FROM fishpedia_stats
        WHERE user_id = pd.user_id AND rarity = 'Uncommon'
    ),
    pd.fines_caught = (
        SELECT COALESCE(SUM(total_caught), 0)
        FROM fishpedia_stats
        WHERE user_id = pd.user_id AND rarity = 'Fine'
    ),
    pd.rares_caught = (
        SELECT COALESCE(SUM(total_caught), 0)
        FROM fishpedia_stats
        WHERE user_id = pd.user_id AND rarity = 'Rare'
    ),
    pd.epics_caught = (
        SELECT COALESCE(SUM(total_caught), 0)
        FROM fishpedia_stats
        WHERE user_id = pd.user_id AND rarity = 'Epic'
    );

