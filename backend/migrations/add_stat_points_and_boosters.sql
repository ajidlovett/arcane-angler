-- Migration: Add Stat Points & Booster System
-- Date: 2025-12-16
-- Description: Add stat_points column and create player_boosters table

-- Add stat_points column to player_data
ALTER TABLE player_data
ADD COLUMN stat_points INT DEFAULT 0 AFTER relics;

-- Create player_boosters table for temporary stat/XP boosts
CREATE TABLE IF NOT EXISTS player_boosters (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    booster_type ENUM('knowledge_scroll', 'ancient_tome', 'giants_potion', 'titans_elixir') NOT NULL,
    effect_type ENUM('xp_bonus', 'stat_bonus') NOT NULL,
    bonus_percentage INT NOT NULL DEFAULT 20,
    expires_at DATETIME NOT NULL,
    activated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_active (user_id, expires_at)
);

-- Optional: Grant existing players some stat points based on their level
-- UPDATE player_data SET stat_points = (level - 1) * 3 WHERE level > 1;
