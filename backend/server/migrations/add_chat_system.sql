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
-- NOTE: Requires event_scheduler to be enabled (see below)
-- ========================================
CREATE EVENT IF NOT EXISTS cleanup_old_chat_messages
ON SCHEDULE EVERY 1 DAY
STARTS (CURRENT_DATE + INTERVAL 1 DAY)
DO
  DELETE FROM chat_messages WHERE created_at < DATE_SUB(NOW(), INTERVAL 7 DAY);

-- ========================================
-- IMPORTANT: Enable Event Scheduler
-- ========================================
-- The event scheduler must be enabled for automatic cleanup.
--
-- If you have SUPER privileges, run this command:
--   SET GLOBAL event_scheduler = ON;
--
-- Otherwise, contact your hosting provider to enable event_scheduler
-- in your MySQL configuration file (my.cnf or my.ini):
--   [mysqld]
--   event_scheduler = ON
--
-- To verify if events are enabled:
--   SHOW VARIABLES LIKE 'event_scheduler';
--
-- To manually cleanup old messages (if event scheduler is not available):
--   DELETE FROM chat_messages WHERE created_at < DATE_SUB(NOW(), INTERVAL 7 DAY);

-- ========================================
-- Migration Complete
-- ========================================
