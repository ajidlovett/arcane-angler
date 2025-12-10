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

-- Fishpedia statistics (persistent fish catch tracking for Fishpedia)
CREATE TABLE IF NOT EXISTS fishpedia_stats (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    fish_name VARCHAR(100) NOT NULL,
    rarity VARCHAR(50) NOT NULL,
    total_caught INT DEFAULT 0,
    first_caught_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_caught_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_fishpedia_stat (user_id, fish_name),
    INDEX idx_user_fish_stats (user_id, fish_name)
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
    nationality VARCHAR(10) DEFAULT NULL,

    -- Core stats
    level INT DEFAULT 1,
    total_gold INT DEFAULT 0,
    total_relics INT DEFAULT 0,

    -- Gameplay tracking
    total_fish_caught INT DEFAULT 0,
    total_casts BIGINT DEFAULT 0,
    fish_sold BIGINT DEFAULT 0,
    gold_earned BIGINT DEFAULT 0,
    relics_earned INT DEFAULT 0,

    -- Rarity-specific catches
    common_caught INT DEFAULT 0,
    uncommon_caught INT DEFAULT 0,
    fine_caught INT DEFAULT 0,
    rare_caught INT DEFAULT 0,
    epic_caught INT DEFAULT 0,
    treasure_caught INT DEFAULT 0,
    legendary_fish_count INT DEFAULT 0,
    mythic_fish_count INT DEFAULT 0,
    exotic_caught INT DEFAULT 0,
    arcane_caught INT DEFAULT 0,

    -- Character stats
    total_stats_upgraded INT DEFAULT 0,
    strength INT DEFAULT 1,
    intelligence INT DEFAULT 1,
    luck INT DEFAULT 1,
    stamina INT DEFAULT 100,

    -- Other
    highest_biome INT DEFAULT 1,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,

    -- Indexes for all leaderboard categories
    INDEX idx_level_rank (level DESC),
    INDEX idx_gold_rank (total_gold DESC),
    INDEX idx_relics_rank (total_relics DESC),
    INDEX idx_fish_rank (total_fish_caught DESC),
    INDEX idx_casts_rank (total_casts DESC),
    INDEX idx_fish_sold_rank (fish_sold DESC),
    INDEX idx_gold_earned_rank (gold_earned DESC),
    INDEX idx_relics_earned_rank (relics_earned DESC),
    INDEX idx_treasure_rank (treasure_caught DESC),
    INDEX idx_stats_upgraded_rank (total_stats_upgraded DESC),
    INDEX idx_strength_rank (strength DESC),
    INDEX idx_intelligence_rank (intelligence DESC),
    INDEX idx_luck_rank (luck DESC),
    INDEX idx_stamina_rank (stamina DESC),
    INDEX idx_nationality (nationality)
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

    -- Initialize leaderboard stats with profile_username and nationality
    INSERT INTO leaderboard_stats (user_id, profile_username, nationality)
    VALUES (NEW.id, NEW.profile_username, NEW.nationality);
END$$
DELIMITER ;

-- Trigger to update leaderboard when player_data changes
DELIMITER $$
CREATE TRIGGER after_player_data_update
AFTER UPDATE ON player_data
FOR EACH ROW
BEGIN
    UPDATE leaderboard_stats
    SET
        level = NEW.level,
        total_gold = NEW.gold,
        total_relics = NEW.relics,
        highest_biome = NEW.current_biome,
        total_fish_caught = COALESCE(NEW.total_fish_caught, 0),
        total_casts = COALESCE(NEW.total_casts, 0),
        fish_sold = COALESCE(NEW.total_fish_sold, 0),
        gold_earned = COALESCE(NEW.total_gold_earned, 0),
        relics_earned = COALESCE(NEW.total_relics_earned, 0),
        common_caught = COALESCE(NEW.commons_caught, 0),
        uncommon_caught = COALESCE(NEW.uncommons_caught, 0),
        fine_caught = COALESCE(NEW.fines_caught, 0),
        rare_caught = COALESCE(NEW.rares_caught, 0),
        epic_caught = COALESCE(NEW.epics_caught, 0),
        legendary_fish_count = COALESCE(NEW.legendaries_caught, 0),
        mythic_fish_count = COALESCE(NEW.mythics_caught, 0),
        exotic_caught = COALESCE(NEW.exotics_caught, 0),
        arcane_caught = COALESCE(NEW.arcanes_caught, 0),
        treasure_caught = COALESCE(NEW.treasure_chests_found, 0),
        total_stats_upgraded = COALESCE(NEW.stats_upgraded, 0)
    WHERE user_id = NEW.user_id;
END$$
DELIMITER ;

-- Trigger to update leaderboard when player_stats changes
DELIMITER $$
CREATE TRIGGER after_player_stats_update
AFTER UPDATE ON player_stats
FOR EACH ROW
BEGIN
    UPDATE leaderboard_stats
    SET
        strength = NEW.strength,
        intelligence = NEW.intelligence,
        luck = NEW.luck,
        stamina = NEW.stamina
    WHERE user_id = NEW.user_id;
END$$
DELIMITER ;

-- Trigger to sync nationality from users table
DELIMITER $$
CREATE TRIGGER after_user_update_nationality
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    IF NEW.nationality != OLD.nationality OR (NEW.nationality IS NOT NULL AND OLD.nationality IS NULL) OR (NEW.nationality IS NULL AND OLD.nationality IS NOT NULL) THEN
        UPDATE leaderboard_stats
        SET nationality = NEW.nationality
        WHERE user_id = NEW.id;
    END IF;
END$$
DELIMITER ;

-- Trigger to sync profile_username from users table
DELIMITER $$
CREATE TRIGGER after_user_update_profile
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    IF NEW.profile_username != OLD.profile_username THEN
        UPDATE leaderboard_stats
        SET profile_username = NEW.profile_username
        WHERE user_id = NEW.id;
    END IF;
END$$
DELIMITER ;

-- Trigger to update fish counts when fishpedia_stats changes
DELIMITER $$
CREATE TRIGGER after_fishpedia_stats_update
AFTER UPDATE ON fishpedia_stats
FOR EACH ROW
BEGIN
    DECLARE total_fish INT;
    DECLARE common_count INT;
    DECLARE uncommon_count INT;
    DECLARE fine_count INT;
    DECLARE rare_count INT;
    DECLARE epic_count INT;
    DECLARE treasure_count INT;
    DECLARE legendary_count INT;
    DECLARE mythic_count INT;
    DECLARE exotic_count INT;
    DECLARE arcane_count INT;

    -- Calculate totals for this user
    SELECT
        COALESCE(SUM(total_caught), 0),
        COALESCE(SUM(CASE WHEN rarity = 'Common' THEN total_caught ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN rarity = 'Uncommon' THEN total_caught ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN rarity = 'Fine' THEN total_caught ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN rarity = 'Rare' THEN total_caught ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN rarity = 'Epic' THEN total_caught ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN rarity = 'Treasure Chest' THEN total_caught ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN rarity = 'Legendary' THEN total_caught ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN rarity = 'Mythic' THEN total_caught ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN rarity = 'Exotic' THEN total_caught ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN rarity = 'Arcane' THEN total_caught ELSE 0 END), 0)
    INTO
        total_fish,
        common_count,
        uncommon_count,
        fine_count,
        rare_count,
        epic_count,
        treasure_count,
        legendary_count,
        mythic_count,
        exotic_count,
        arcane_count
    FROM fishpedia_stats
    WHERE user_id = NEW.user_id;

    -- Update leaderboard stats
    UPDATE leaderboard_stats
    SET
        total_fish_caught = total_fish,
        common_caught = common_count,
        uncommon_caught = uncommon_count,
        fine_caught = fine_count,
        rare_caught = rare_count,
        epic_caught = epic_count,
        treasure_caught = treasure_count,
        legendary_fish_count = legendary_count,
        mythic_fish_count = mythic_count,
        exotic_caught = exotic_count,
        arcane_caught = arcane_count
    WHERE user_id = NEW.user_id;
END$$
DELIMITER ;

-- Trigger for new fishpedia_stats entries
DELIMITER $$
CREATE TRIGGER after_fishpedia_stats_insert
AFTER INSERT ON fishpedia_stats
FOR EACH ROW
BEGIN
    DECLARE total_fish INT;
    DECLARE common_count INT;
    DECLARE uncommon_count INT;
    DECLARE fine_count INT;
    DECLARE rare_count INT;
    DECLARE epic_count INT;
    DECLARE treasure_count INT;
    DECLARE legendary_count INT;
    DECLARE mythic_count INT;
    DECLARE exotic_count INT;
    DECLARE arcane_count INT;

    -- Calculate totals for this user
    SELECT
        COALESCE(SUM(total_caught), 0),
        COALESCE(SUM(CASE WHEN rarity = 'Common' THEN total_caught ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN rarity = 'Uncommon' THEN total_caught ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN rarity = 'Fine' THEN total_caught ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN rarity = 'Rare' THEN total_caught ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN rarity = 'Epic' THEN total_caught ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN rarity = 'Treasure Chest' THEN total_caught ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN rarity = 'Legendary' THEN total_caught ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN rarity = 'Mythic' THEN total_caught ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN rarity = 'Exotic' THEN total_caught ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN rarity = 'Arcane' THEN total_caught ELSE 0 END), 0)
    INTO
        total_fish,
        common_count,
        uncommon_count,
        fine_count,
        rare_count,
        epic_count,
        treasure_count,
        legendary_count,
        mythic_count,
        exotic_count,
        arcane_count
    FROM fishpedia_stats
    WHERE user_id = NEW.user_id;

    -- Update leaderboard stats
    UPDATE leaderboard_stats
    SET
        total_fish_caught = total_fish,
        common_caught = common_count,
        uncommon_caught = uncommon_count,
        fine_caught = fine_count,
        rare_caught = rare_count,
        epic_caught = epic_count,
        treasure_caught = treasure_count,
        legendary_fish_count = legendary_count,
        mythic_fish_count = mythic_count,
        exotic_caught = exotic_count,
        arcane_caught = arcane_count
    WHERE user_id = NEW.user_id;
END$$
DELIMITER ;
