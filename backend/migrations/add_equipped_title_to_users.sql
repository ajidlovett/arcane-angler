-- Migration: Add equipped_title and profile columns to users table
-- This fixes the global chat message sending issue by adding required columns
-- Run this on your database to add the missing columns

-- Note: Some of these columns may already exist if you ran add_profile_features.sql
-- If you get "Duplicate column name" errors, that's expected - just ignore them

-- Add profile-related columns
ALTER TABLE users ADD COLUMN bio TEXT DEFAULT NULL;
ALTER TABLE users ADD COLUMN equipped_title VARCHAR(255) DEFAULT NULL;
ALTER TABLE users ADD COLUMN nationality VARCHAR(10) DEFAULT NULL COMMENT 'ISO 3166-1 alpha-2 country code';
ALTER TABLE users ADD COLUMN profile_name_changes INT DEFAULT 0;
ALTER TABLE users ADD COLUMN achievement_showcase_limit INT DEFAULT 6;
ALTER TABLE users ADD COLUMN favorite_fish_limit INT DEFAULT 3;
ALTER TABLE users ADD COLUMN profile_privacy ENUM('public', 'friends', 'private') DEFAULT 'public';
ALTER TABLE users ADD COLUMN allow_comments BOOLEAN DEFAULT TRUE;
ALTER TABLE users ADD COLUMN profile_views INT DEFAULT 0;
ALTER TABLE users ADD COLUMN badges JSON DEFAULT NULL;
ALTER TABLE users ADD COLUMN registration_date DATETIME DEFAULT CURRENT_TIMESTAMP;

-- Set registration_date to created_at for existing users with NULL value
UPDATE users SET registration_date = created_at WHERE registration_date IS NULL;
