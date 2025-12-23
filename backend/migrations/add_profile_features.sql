-- Migration: Add profile features (avatars, fish showcase, achievement showcase, bio, nationality, etc.)
-- Date: 2025-12-23
-- Updated: 2025-12-23 - Added all missing profile columns

-- Check if columns exist before adding them (MySQL 5.7+ syntax)
-- Note: If you're on older MySQL, you may need to run each ALTER statement separately

-- Add basic profile columns to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS bio TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS equipped_title VARCHAR(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS nationality VARCHAR(10) DEFAULT NULL COMMENT 'ISO 3166-1 alpha-2 country code',
ADD COLUMN IF NOT EXISTS profile_name_changes INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS achievement_showcase_limit INT DEFAULT 6,
ADD COLUMN IF NOT EXISTS favorite_fish_limit INT DEFAULT 3,
ADD COLUMN IF NOT EXISTS profile_privacy ENUM('public', 'friends', 'private') DEFAULT 'public',
ADD COLUMN IF NOT EXISTS allow_comments BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS profile_views INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS badges JSON DEFAULT NULL,
ADD COLUMN IF NOT EXISTS registration_date DATETIME DEFAULT CURRENT_TIMESTAMP;

-- Add avatar columns to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS owned_avatars JSON DEFAULT NULL COMMENT 'Array of owned avatar IDs (e.g., ["avatar_001", "avatar_002"])',
ADD COLUMN IF NOT EXISTS profile_avatar VARCHAR(50) DEFAULT 'avatar_001' COMMENT 'Currently selected avatar ID';

-- Add showcase columns to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS fish_showcase JSON DEFAULT NULL COMMENT 'Array of showcased fish objects (e.g., [{"name": "Golden Koi", "rarity": "Legendary"}])',
ADD COLUMN IF NOT EXISTS achievement_showcase JSON DEFAULT NULL COMMENT 'Array of showcased achievement IDs (e.g., ["catch_1000_fish", "level_50"])';

-- Initialize default avatars for all existing users (give them all 20 default avatars)
UPDATE users SET owned_avatars = JSON_ARRAY('avatar_001', 'avatar_002', 'avatar_003', 'avatar_004', 'avatar_005', 'avatar_006', 'avatar_007', 'avatar_008', 'avatar_009', 'avatar_010', 'avatar_011', 'avatar_012', 'avatar_013', 'avatar_014', 'avatar_015', 'avatar_016', 'avatar_017', 'avatar_018', 'avatar_019', 'avatar_020') WHERE owned_avatars IS NULL;

-- Ensure all users have a default avatar selected
UPDATE users SET profile_avatar = 'avatar_001' WHERE profile_avatar IS NULL OR profile_avatar = '';

-- Set registration_date to created_at for existing users who don't have it
UPDATE users SET registration_date = created_at WHERE registration_date IS NULL;

-- Create profile_views_log table if it doesn't exist (optional, for tracking who viewed whose profile)
CREATE TABLE IF NOT EXISTS profile_views_log (
    id INT PRIMARY KEY AUTO_INCREMENT,
    profile_user_id INT NOT NULL,
    viewer_id INT NOT NULL,
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (profile_user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (viewer_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_profile_user (profile_user_id),
    INDEX idx_viewer (viewer_id),
    INDEX idx_viewed_at (viewed_at)
);

-- Add indexes for commonly queried columns
ALTER TABLE users ADD INDEX IF NOT EXISTS idx_profile_avatar (profile_avatar);
ALTER TABLE users ADD INDEX IF NOT EXISTS idx_nationality (nationality);
ALTER TABLE users ADD INDEX IF NOT EXISTS idx_profile_privacy (profile_privacy);

-- Success message
SELECT 'Profile features migration completed successfully! All profile columns have been added.' AS message;
