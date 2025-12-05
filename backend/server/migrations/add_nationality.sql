-- ========================================
-- Add Nationality Column to Users Table
-- Run this in phpMyAdmin if you've already run the main profile migration
-- ========================================

ALTER TABLE users
ADD COLUMN nationality VARCHAR(10) DEFAULT NULL COMMENT 'ISO 3166-1 alpha-2 country code (e.g., US, GB, JP)';
