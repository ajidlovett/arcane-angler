-- ========================================
-- Chat System Database Migration
-- Run this to add live chat functionality
-- ========================================

-- Chat Messages Table
-- Stores all chat messages with automatic 7-day expiration
CREATE TABLE IF NOT EXISTS chat_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  profile_username VARCHAR(50) NOT NULL,
  equipped_title VARCHAR(255) DEFAULT NULL,
  channel ENUM('global', 'guild', 'notification') NOT NULL DEFAULT 'global',
  message_text VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX idx_channel_time (channel, created_at DESC),
  INDEX idx_user (user_id),
  INDEX idx_created_at (created_at),

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- Automatic Cleanup Event (removes messages older than 7 days)
-- This runs daily at midnight
-- ========================================
CREATE EVENT IF NOT EXISTS cleanup_old_chat_messages
ON SCHEDULE EVERY 1 DAY
STARTS (CURRENT_DATE + INTERVAL 1 DAY)
DO
  DELETE FROM chat_messages WHERE created_at < DATE_SUB(NOW(), INTERVAL 7 DAY);

-- Enable the event scheduler (if not already enabled)
SET GLOBAL event_scheduler = ON;

-- ========================================
-- Migration Complete
-- ========================================
