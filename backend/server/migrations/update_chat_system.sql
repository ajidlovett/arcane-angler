-- ========================================
-- Update Chat System Migration
-- Run this if you already created the chat_messages table
-- This makes user_id nullable for system messages
-- ========================================

-- Make user_id nullable (for system messages)
ALTER TABLE chat_messages MODIFY user_id INT DEFAULT NULL COMMENT 'NULL for system messages';

-- ========================================
-- Migration Complete
-- ========================================
-- The chat system will now accept NULL for user_id in system messages
-- (e.g., global catch notifications)
