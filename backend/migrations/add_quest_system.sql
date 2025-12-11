-- Migration: Add Quest System Tables
-- Created: 2025-12-11
-- Description: Creates tables for rotating daily/weekly/monthly quest system

-- Table: player_quests
-- Stores active quests for each player
CREATE TABLE IF NOT EXISTS player_quests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  quest_type ENUM('daily', 'weekly', 'monthly') NOT NULL,
  quest_template_id VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  target_amount INT NOT NULL,
  current_progress INT DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  reward_relics INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  rotation_date DATE NOT NULL,
  metadata JSON DEFAULT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_quest_type (user_id, quest_type),
  INDEX idx_user_active (user_id, completed, expires_at),
  INDEX idx_rotation (rotation_date, quest_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: quest_history
-- Tracks quest generation history to prevent duplicates
CREATE TABLE IF NOT EXISTS quest_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  quest_template_id VARCHAR(100) NOT NULL,
  quest_type ENUM('daily', 'weekly', 'monthly') NOT NULL,
  rotation_date DATE NOT NULL,
  completed_at TIMESTAMP NULL DEFAULT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_history (user_id, quest_type, rotation_date),
  INDEX idx_template_rotation (quest_template_id, rotation_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: quest_rotation_tracker
-- Tracks the last rotation date for each quest type to coordinate resets
CREATE TABLE IF NOT EXISTS quest_rotation_tracker (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quest_type ENUM('daily', 'weekly', 'monthly') NOT NULL UNIQUE,
  last_rotation_date DATE NOT NULL,
  next_rotation_date DATE NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_next_rotation (quest_type, next_rotation_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert initial rotation tracker records
INSERT INTO quest_rotation_tracker (quest_type, last_rotation_date, next_rotation_date)
VALUES
  ('daily', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 DAY)),
  ('weekly', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 WEEK)),
  ('monthly', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 MONTH))
ON DUPLICATE KEY UPDATE last_rotation_date = last_rotation_date;
