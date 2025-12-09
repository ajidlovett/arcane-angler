-- Arcane Angler Database Schema with Email Verification

CREATE DATABASE IF NOT EXISTS arcane_angler;
USE arcane_angler;

-- Users table with email verification
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    profile_username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255) NULL,
    verification_token_expires DATETIME NULL,
    reset_token VARCHAR(255) NULL,
    reset_token_expires DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_verification_token (verification_token),
    INDEX idx_reset_token (reset_token)
);

-- Player data table
CREATE TABLE IF NOT EXISTS player_data (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,
    level INT DEFAULT 1,
    xp INT DEFAULT 0,
    xp_to_next INT DEFAULT 150,
    gold INT DEFAULT 0,
    relics INT DEFAULT 0,
    current_biome INT DEFAULT 1,
    equipped_rod VARCHAR(100) DEFAULT 'Willow Branch',
    equipped_bait VARCHAR(100) DEFAULT 'Stale Bread Crust',
    unlocked_biomes JSON,
    achievements JSON,
    discovered_fish JSON,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_level (level),
    INDEX idx_gold (gold),
    INDEX idx_relics (relics)
);

-- Player stats table
CREATE TABLE IF NOT EXISTS player_stats (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,
    strength INT DEFAULT 1,
    intelligence INT DEFAULT 1,
    luck INT DEFAULT 1,
    stamina INT DEFAULT 100,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Player inventory (fish caught)
CREATE TABLE IF NOT EXISTS player_inventory (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    fish_name VARCHAR(100) NOT NULL,
    rarity VARCHAR(50) NOT NULL,
    count INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_fish_per_user (user_id, fish_name),
    INDEX idx_user_fish (user_id, fish_name)
);

-- Locked fish (fish that have been caught at least once)
CREATE TABLE IF NOT EXISTS locked_fish (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    fish_name VARCHAR(100) NOT NULL,
    first_caught_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_locked_fish (user_id, fish_name)
);

-- Owned rods
CREATE TABLE IF NOT EXISTS owned_rods (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    rod_name VARCHAR(100) NOT NULL,
    purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_rod_per_user (user_id, rod_name)
);

-- Bait inventory
CREATE TABLE IF NOT EXISTS bait_inventory (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    bait_name VARCHAR(100) NOT NULL,
    quantity INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_bait_per_user (user_id, bait_name),
    INDEX idx_user_bait (user_id, bait_name)
);

-- Leaderboard statistics (uses profile_username for display)
CREATE TABLE IF NOT EXISTS leaderboard_stats (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,
    profile_username VARCHAR(50) NOT NULL,
    level INT DEFAULT 1,
    total_gold INT DEFAULT 0,
    total_relics INT DEFAULT 0,
    total_fish_caught INT DEFAULT 0,
    legendary_fish_count INT DEFAULT 0,
    mythic_fish_count INT DEFAULT 0,
    highest_biome INT DEFAULT 1,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_level_rank (level DESC),
    INDEX idx_gold_rank (total_gold DESC),
    INDEX idx_relics_rank (total_relics DESC),
    INDEX idx_fish_rank (total_fish_caught DESC)
);

-- Achievement/milestone tracking
CREATE TABLE IF NOT EXISTS achievements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    achievement_type VARCHAR(100) NOT NULL,
    achievement_data JSON,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_achievements (user_id, achievement_type)
);

-- Insert default data for new users (trigger)
DELIMITER $$
CREATE TRIGGER after_user_insert
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    -- Create player data with proper JSON initialization
    INSERT INTO player_data (
        user_id,
        unlocked_biomes,
        achievements,
        discovered_fish
    ) VALUES (
        NEW.id,
        JSON_ARRAY(1),      -- Start with biome 1 unlocked
        JSON_ARRAY(),       -- Empty achievements array
        JSON_ARRAY()        -- Empty discovered fish array (deprecated but kept for compatibility)
    );

    -- Create player stats
    INSERT INTO player_stats (user_id) VALUES (NEW.id);

    -- Add default rod
    INSERT INTO owned_rods (user_id, rod_name) VALUES (NEW.id, 'Willow Branch');

    -- Add infinite starter bait
    INSERT INTO bait_inventory (user_id, bait_name, quantity)
    VALUES (NEW.id, 'Stale Bread Crust', 999999);

    -- Initialize leaderboard stats with profile_username
    INSERT INTO leaderboard_stats (user_id, profile_username)
    VALUES (NEW.id, NEW.profile_username);
END$$
DELIMITER ;
