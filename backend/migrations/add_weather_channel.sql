-- Migration: Add 'weather' to chat_messages channel ENUM
-- Date: 2025-12-23
-- Description: Adds 'weather' as a valid channel value for chat messages

ALTER TABLE chat_messages
MODIFY COLUMN channel ENUM('global', 'guild', 'notification', 'weather')
NOT NULL DEFAULT 'global';
