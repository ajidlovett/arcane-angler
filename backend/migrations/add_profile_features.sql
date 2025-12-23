-- Migration: Add profile features (avatars, fish showcase, achievement showcase)
-- Date: 2025-12-23


-- Add avatar columns to users table
ALTER TABLE users
ADD COLUMN owned_avatars JSON DEFAULT NULL COMMENT 'Array of owned avatar IDs (e.g., ["avatar_001", "avatar_002"])',
ADD COLUMN profile_avatar VARCHAR(50) DEFAULT 'avatar_001' COMMENT 'Currently selected avatar ID';

-- Add showcase columns to users table
ALTER TABLE users
ADD COLUMN fish_showcase JSON DEFAULT NULL COMMENT 'Array of showcased fish objects (e.g., [{"name": "Golden Koi", "rarity": "Legendary"}])',
ADD COLUMN achievement_showcase JSON DEFAULT NULL COMMENT 'Array of showcased achievement IDs (e.g., ["catch_1000_fish", "level_50"])';

-- Initialize default avatars for all existing users (give them avatar_001 and avatar_002)
UPDATE users SET owned_avatars = JSON_ARRAY('avatar_001', 'avatar_002', 'avatar_003', 'avatar_004', 'avatar_005', 'avatar_006', 'avatar_007', 'avatar_008', 'avatar_009', 'avatar_010', 'avatar_011', 'avatar_012', 'avatar_013', 'avatar_014', 'avatar_015', 'avatar_016', 'avatar_017', 'avatar_018', 'avatar_019', 'avatar_020') WHERE owned_avatars IS NULL;
UPDATE users SET profile_avatar = 'avatar_001' WHERE profile_avatar IS NULL OR profile_avatar = '';

-- Add index for avatar lookups
ALTER TABLE users ADD INDEX idx_profile_avatar (profile_avatar);
