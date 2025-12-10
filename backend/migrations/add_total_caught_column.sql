-- Migration: Create fishpedia_stats table for persistent fish catch tracking
-- Purpose: Track total catches per fish species separately from inventory (which can be sold/deleted)
-- Date: 2025-12-09

-- Create fishpedia_stats table
CREATE TABLE IF NOT EXISTS fishpedia_stats (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    fish_name VARCHAR(100) NOT NULL,
    rarity VARCHAR(50) NOT NULL,
    total_caught INT DEFAULT 0,
    first_caught_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_caught_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_fishpedia_stat (user_id, fish_name),
    INDEX idx_user_fish_stats (user_id, fish_name)
);

-- Migrate existing data from player_inventory
-- Initialize fishpedia_stats with current inventory counts as minimum total caught
INSERT INTO fishpedia_stats (user_id, fish_name, rarity, total_caught, first_caught_at)
SELECT pi.user_id, pi.fish_name, pi.rarity, pi.count, CURRENT_TIMESTAMP
FROM player_inventory pi
WHERE pi.count > 0
ON DUPLICATE KEY UPDATE
  total_caught = GREATEST(total_caught, VALUES(total_caught));

-- Remove total_caught column from player_inventory if it exists (cleanup from previous migration)
ALTER TABLE player_inventory DROP COLUMN IF EXISTS total_caught;
