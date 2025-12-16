-- Migration: Create quest_rewards_claimed table
-- Purpose: Track which quest rewards have been claimed to prevent duplicate rewards
-- Date: 2025-12-16

CREATE TABLE IF NOT EXISTS quest_rewards_claimed (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  quest_id INT NOT NULL,
  claimed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Foreign key constraints
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (quest_id) REFERENCES player_quests(id) ON DELETE CASCADE,

  -- Prevent duplicate claims
  UNIQUE KEY unique_user_quest (user_id, quest_id),

  -- Index for efficient lookups
  INDEX idx_user_id (user_id),
  INDEX idx_quest_id (quest_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
