-- ========================================
-- Profile System Database Migration
-- Run this in phpMyAdmin to add all profile features
-- ========================================

-- 1. Extend users table with profile fields
ALTER TABLE users
ADD COLUMN bio TEXT DEFAULT NULL,
ADD COLUMN equipped_title VARCHAR(255) DEFAULT NULL,
ADD COLUMN nationality VARCHAR(10) DEFAULT NULL COMMENT 'ISO 3166-1 alpha-2 country code',
ADD COLUMN profile_name_changes INT DEFAULT 0,
ADD COLUMN achievement_showcase_limit INT DEFAULT 6,
ADD COLUMN favorite_fish_limit INT DEFAULT 3,
ADD COLUMN profile_privacy ENUM('public', 'friends', 'private') DEFAULT 'public',
ADD COLUMN allow_comments BOOLEAN DEFAULT TRUE,
ADD COLUMN profile_views INT DEFAULT 0,
ADD COLUMN badges JSON DEFAULT NULL,
ADD COLUMN registration_date DATETIME DEFAULT CURRENT_TIMESTAMP;

-- Set registration_date to NOW for existing users with NULL value
UPDATE users SET registration_date = NOW() WHERE registration_date IS NULL;

-- ========================================
-- 2. Achievement Showcase Table
-- Stores which achievements users want to display on their profile
-- ========================================
CREATE TABLE IF NOT EXISTS achievement_showcase (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  achievement_id VARCHAR(255) NOT NULL,
  display_order INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_achievement (user_id, achievement_id),
  INDEX idx_user (user_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- 3. Favorite Fish Table
-- Stores users' favorite fish to display on profile
-- ========================================
CREATE TABLE IF NOT EXISTS favorite_fish (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  fish_name VARCHAR(255) NOT NULL,
  fish_rarity VARCHAR(50) NOT NULL,
  display_order INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_fish (user_id, fish_name),
  INDEX idx_user (user_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- 4. Friends Table
-- Manages friend relationships between users
-- ========================================
CREATE TABLE IF NOT EXISTS friends (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  friend_id INT NOT NULL,
  status ENUM('pending', 'accepted', 'declined') DEFAULT 'pending',
  requester_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_friendship (user_id, friend_id),
  INDEX idx_user_status (user_id, status),
  INDEX idx_friend_status (friend_id, status),
  INDEX idx_requester (requester_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (friend_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (requester_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- 5. Profile Comments Table
-- Stores comments left on user profiles
-- ========================================
CREATE TABLE IF NOT EXISTS profile_comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  profile_user_id INT NOT NULL,
  commenter_id INT NOT NULL,
  commenter_username VARCHAR(255) NOT NULL,
  commenter_title VARCHAR(255) DEFAULT NULL,
  comment_text TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_profile (profile_user_id, created_at),
  INDEX idx_commenter (commenter_id),
  FOREIGN KEY (profile_user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (commenter_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- 6. Profile Views Log Table
-- Tracks profile visits for analytics
-- ========================================
CREATE TABLE IF NOT EXISTS profile_views_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  profile_user_id INT NOT NULL,
  viewer_id INT DEFAULT NULL,
  viewed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_profile (profile_user_id, viewed_at),
  INDEX idx_viewer (viewer_id),
  FOREIGN KEY (profile_user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (viewer_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- 7. Activity Feed Table
-- Stores recent rare fish catches for activity feed
-- ========================================
CREATE TABLE IF NOT EXISTS activity_feed (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  activity_type ENUM('mythic_catch', 'exotic_catch', 'arcane_catch', 'legendary_catch') NOT NULL,
  fish_name VARCHAR(255) NOT NULL,
  fish_rarity VARCHAR(50) NOT NULL,
  biome_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_time (user_id, created_at),
  INDEX idx_type_time (activity_type, created_at),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- Migration Complete
-- ========================================
-- You can verify the changes by running:
-- DESCRIBE users;
-- SHOW TABLES;
