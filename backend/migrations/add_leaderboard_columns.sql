-- Migration: Add comprehensive leaderboard tracking columns
-- Date: 2025-12-10
-- Description: Adds all required columns for comprehensive leaderboard tracking

USE arcane_angler;

-- Add nationality column (from users table)
ALTER TABLE leaderboard_stats
ADD COLUMN IF NOT EXISTS nationality VARCHAR(10) DEFAULT NULL COMMENT 'ISO 3166-1 alpha-2 country code';

-- Add gameplay tracking columns
ALTER TABLE leaderboard_stats
ADD COLUMN IF NOT EXISTS total_casts BIGINT DEFAULT 0 COMMENT 'Total cast line actions',
ADD COLUMN IF NOT EXISTS fish_sold BIGINT DEFAULT 0 COMMENT 'Total fish sold',
ADD COLUMN IF NOT EXISTS gold_earned BIGINT DEFAULT 0 COMMENT 'Total gold earned over time',
ADD COLUMN IF NOT EXISTS relics_earned INT DEFAULT 0 COMMENT 'Total relics earned over time';

-- Add rarity-specific fish counts (some already exist, adding missing ones)
ALTER TABLE leaderboard_stats
ADD COLUMN IF NOT EXISTS common_caught INT DEFAULT 0 COMMENT 'Total common fish caught',
ADD COLUMN IF NOT EXISTS uncommon_caught INT DEFAULT 0 COMMENT 'Total uncommon fish caught',
ADD COLUMN IF NOT EXISTS fine_caught INT DEFAULT 0 COMMENT 'Total fine fish caught',
ADD COLUMN IF NOT EXISTS rare_caught INT DEFAULT 0 COMMENT 'Total rare fish caught',
ADD COLUMN IF NOT EXISTS epic_caught INT DEFAULT 0 COMMENT 'Total epic fish caught',
ADD COLUMN IF NOT EXISTS treasure_caught INT DEFAULT 0 COMMENT 'Total treasure chests found',
ADD COLUMN IF NOT EXISTS exotic_caught INT DEFAULT 0 COMMENT 'Total exotic fish caught',
ADD COLUMN IF NOT EXISTS arcane_caught INT DEFAULT 0 COMMENT 'Total arcane fish caught';

-- legendary_caught and mythic_caught already exist in the table

-- Add stats tracking columns
ALTER TABLE leaderboard_stats
ADD COLUMN IF NOT EXISTS total_stats_upgraded INT DEFAULT 0 COMMENT 'Total stat upgrades purchased',
ADD COLUMN IF NOT EXISTS strength INT DEFAULT 1 COMMENT 'Current strength stat',
ADD COLUMN IF NOT EXISTS intelligence INT DEFAULT 1 COMMENT 'Current intelligence stat',
ADD COLUMN IF NOT EXISTS luck INT DEFAULT 1 COMMENT 'Current luck stat',
ADD COLUMN IF NOT EXISTS stamina INT DEFAULT 100 COMMENT 'Current max stamina';

-- Create indexes for new leaderboard categories
CREATE INDEX IF NOT EXISTS idx_casts_rank ON leaderboard_stats (total_casts DESC);
CREATE INDEX IF NOT EXISTS idx_fish_sold_rank ON leaderboard_stats (fish_sold DESC);
CREATE INDEX IF NOT EXISTS idx_gold_earned_rank ON leaderboard_stats (gold_earned DESC);
CREATE INDEX IF NOT EXISTS idx_relics_earned_rank ON leaderboard_stats (relics_earned DESC);
CREATE INDEX IF NOT EXISTS idx_treasure_rank ON leaderboard_stats (treasure_caught DESC);
CREATE INDEX IF NOT EXISTS idx_stats_upgraded_rank ON leaderboard_stats (total_stats_upgraded DESC);
CREATE INDEX IF NOT EXISTS idx_strength_rank ON leaderboard_stats (strength DESC);
CREATE INDEX IF NOT EXISTS idx_intelligence_rank ON leaderboard_stats (intelligence DESC);
CREATE INDEX IF NOT EXISTS idx_luck_rank ON leaderboard_stats (luck DESC);
CREATE INDEX IF NOT EXISTS idx_stamina_rank ON leaderboard_stats (stamina DESC);
CREATE INDEX IF NOT EXISTS idx_nationality ON leaderboard_stats (nationality);

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
