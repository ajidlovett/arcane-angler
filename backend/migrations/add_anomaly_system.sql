-- =====================================================
-- ANOMALY SYSTEM DATABASE SCHEMA
-- World Boss / Anomaly Events System
-- Created: 2025-12-25
-- =====================================================

-- 1. Add anomaly fragments and booster tracking to player_data
ALTER TABLE player_data
ADD COLUMN anomaly_fragments INT DEFAULT 0,
ADD COLUMN active_xp_booster_personal JSON NULL COMMENT 'Personal XP booster: {multiplier, expires_at}';

-- 2. Anomaly definitions (static boss data)
CREATE TABLE IF NOT EXISTS anomalies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  max_hp BIGINT NOT NULL COMMENT 'Base HP (scales with active players)',
  primary_weakness ENUM('strength', 'intelligence', 'luck', 'stamina') NOT NULL,
  secondary_weakness ENUM('strength', 'intelligence', 'luck', 'stamina') NULL,
  resistant_stat ENUM('strength', 'intelligence', 'luck', 'stamina') NOT NULL,
  image_url VARCHAR(255) NULL,
  base_fragment_reward INT DEFAULT 3,
  primary_multiplier DECIMAL(3,2) DEFAULT 2.50 COMMENT 'Damage multiplier for primary weakness',
  secondary_multiplier DECIMAL(3,2) DEFAULT 1.50 COMMENT 'Damage multiplier for secondary weakness',
  resistant_multiplier DECIMAL(3,2) DEFAULT 0.50 COMMENT 'Damage multiplier for resistant stat',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Anomaly events (active and historical)
CREATE TABLE IF NOT EXISTS anomaly_events (
  id INT PRIMARY KEY AUTO_INCREMENT,
  anomaly_id INT NOT NULL,
  spawn_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_time TIMESTAMP NULL COMMENT 'When boss becomes unavailable (5 min before next spawn)',
  next_spawn_time TIMESTAMP NULL COMMENT 'When next boss will spawn',
  current_hp BIGINT NOT NULL,
  max_hp BIGINT NOT NULL COMMENT 'Scaled HP based on active players',
  status ENUM('active', 'defeated', 'ended') DEFAULT 'active',
  total_participants INT DEFAULT 0,
  total_damage_dealt BIGINT DEFAULT 0,
  defeated_at TIMESTAMP NULL,
  last_hp_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (anomaly_id) REFERENCES anomalies(id),
  INDEX idx_status (status),
  INDEX idx_spawn_time (spawn_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Player participation in anomaly events
CREATE TABLE IF NOT EXISTS anomaly_participation (
  id INT PRIMARY KEY AUTO_INCREMENT,
  event_id INT NOT NULL,
  user_id INT NOT NULL,
  damage_dealt BIGINT DEFAULT 0,
  attacks_made INT DEFAULT 0,
  last_attack_time TIMESTAMP NULL COMMENT 'For anti-cheat cooldown check',
  gold_earned BIGINT DEFAULT 0,
  fragments_earned INT DEFAULT 0,
  rewards_claimed BOOLEAN DEFAULT FALSE,
  first_attack_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_attack_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES anomaly_events(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_participation (event_id, user_id),
  INDEX idx_user_event (user_id, event_id),
  INDEX idx_last_attack (last_attack_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Global XP booster queue system
CREATE TABLE IF NOT EXISTS global_xp_booster_queue (
  id INT PRIMARY KEY AUTO_INCREMENT,
  activated_by_user_id INT NOT NULL,
  multiplier DECIMAL(3,2) DEFAULT 1.25 COMMENT '1.25 = 25% boost',
  duration_hours INT DEFAULT 2,
  status ENUM('queued', 'active', 'expired') DEFAULT 'queued',
  queued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  activated_at TIMESTAMP NULL,
  expires_at TIMESTAMP NULL,
  FOREIGN KEY (activated_by_user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_status (status),
  INDEX idx_activated_at (activated_at),
  INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Fragment shop purchases (avatars + boosters)
CREATE TABLE IF NOT EXISTS fragment_shop_purchases (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  item_type ENUM('avatar', 'xp_booster_personal', 'xp_booster_global') NOT NULL,
  item_id VARCHAR(100) NULL COMMENT 'Avatar filename or booster type',
  cost INT NOT NULL,
  purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_item (user_id, item_type),
  INDEX idx_user_purchases (user_id, purchased_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Attack stat usage tracking (for analytics/balancing)
CREATE TABLE IF NOT EXISTS anomaly_attack_stats (
  id INT PRIMARY KEY AUTO_INCREMENT,
  event_id INT NOT NULL,
  user_id INT NOT NULL,
  stat_used ENUM('strength', 'intelligence', 'luck', 'stamina') NOT NULL,
  damage_dealt INT NOT NULL,
  multiplier_applied DECIMAL(3,2) NOT NULL,
  attacked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES anomaly_events(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_event_stat (event_id, stat_used),
  INDEX idx_user_attacks (user_id, attacked_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- INSERT INITIAL ANOMALY DEFINITIONS
-- =====================================================

INSERT INTO anomalies (name, description, max_hp, primary_weakness, secondary_weakness, resistant_stat, base_fragment_reward) VALUES
-- Elemental Anomalies
('Inferno Leviathan', 'A massive sea serpent wreathed in eternal flames, boiling the ocean around it.', 500000, 'intelligence', 'stamina', 'strength', 5),
('Frost Titan', 'An ancient giant of ice, frozen in the depths for millennia.', 500000, 'stamina', 'strength', 'luck', 5),
('Storm Serpent', 'A lightning-charged wyrm that rides the tempest waves.', 500000, 'luck', 'intelligence', 'stamina', 5),
('Terra Colossus', 'A living mountain of stone and coral from the ocean floor.', 500000, 'strength', 'luck', 'stamina', 5),

-- Void/Cosmic Anomalies
('Void Kraken', 'A nightmare from beyond reality, its tentacles dissolve matter itself.', 600000, 'intelligence', 'luck', 'strength', 6),
('Star Eater', 'A cosmic horror that consumes light and hope in equal measure.', 600000, 'luck', 'stamina', 'intelligence', 6),
('Eclipse Wyrm', 'Born from a solar eclipse, it hungers for celestial energy.', 600000, 'strength', 'intelligence', 'luck', 6),
('Nebula Hydra', 'A multi-headed beast from the cosmic depths, each head a different element.', 600000, 'stamina', 'strength', 'intelligence', 6),

-- Corrupted Anomalies
('Abyssal Phantom', 'The corrupted spirit of a legendary angler, forever cursed to haunt the deep.', 700000, 'intelligence', 'luck', 'stamina', 7),
('Crimson Maw', 'A blood-red beast that feeds on the life force of its prey.', 700000, 'strength', 'stamina', 'luck', 7),
('Plague Behemoth', 'A diseased titan that spreads corruption through the waters.', 700000, 'stamina', 'intelligence', 'strength', 7),
('Chaos Spawn', 'A constantly shifting mass of chaotic energy and malice.', 700000, 'luck', 'strength', 'intelligence', 7),

-- Mythic Anomalies
('Ancient Kraken', 'The first and eldest of all krakens, awakened from eons of slumber.', 800000, 'intelligence', 'stamina', 'strength', 8),
('Phoenix of the Deep', 'A legendary firebird reborn in the ocean''s heart, defying all natural law.', 800000, 'luck', 'intelligence', 'stamina', 8),
('Leviathan Prime', 'The progenitor of all sea monsters, a force of primordial destruction.', 800000, 'strength', 'stamina', 'luck', 8),
('Hydra of Ages', 'An immortal hydra that has witnessed the rise and fall of civilizations.', 800000, 'stamina', 'strength', 'intelligence', 8),

-- Legendary Anomalies
('Temporal Eel', 'A creature unstuck in time, existing in multiple moments simultaneously.', 900000, 'luck', 'intelligence', 'stamina', 9),
('Crystal Guardian', 'An elemental being of pure crystal, radiating arcane energy.', 900000, 'intelligence', 'luck', 'strength', 10),
('Blood Moon Serpent', 'A cursed serpent that only manifests during the blood moon, bringing omens of doom.', 900000, 'strength', 'luck', 'intelligence', 9),
('Prismatic Whale', 'The rarest anomaly, a whale that shifts through all elements, weak to everything yet resistant to nothing.', 1000000, 'intelligence', 'strength', 'luck', 15);

-- =====================================================
-- NOTES FOR DEVELOPERS
-- =====================================================
--
-- HP Scaling Formula (in backend code):
--   scaled_hp = base_hp × (1 + Math.log10(active_players_count))
--   where active_players = attacked in last 15 minutes
--
-- Damage Calculation:
--   base_damage = player_stat_value
--   if stat == primary_weakness: damage = base × 2.5
--   if stat == secondary_weakness: damage = base × 1.5
--   if stat == resistant_stat: damage = base × 0.5
--   else: damage = base × 1.0
--   + equipment bonuses from equipped rod
--
-- Reward Calculation:
--   base_gold = player_level × random(100, 200)
--   contribution_gold = (player_damage / total_damage) × 5000
--   total_gold = base_gold + contribution_gold
--
--   base_fragments = anomaly.base_fragment_reward
--   bonus_fragments = floor((player_damage / total_damage) × 100 / 2)
--   if damage% >= 10%: bonus += 5
--   if damage% >= 20%: bonus += 10
--
-- Global Booster Queue:
--   - Only 1 can be active at a time
--   - New activations go to 'queued' status
--   - Cron job checks every minute:
--     - If active booster expired, set to 'expired'
--     - Activate oldest 'queued' booster
--   - Players see queue list in UI
--
-- Anti-Cheat:
--   - Server enforces 6 second cooldown between attacks
--   - Check last_attack_time in anomaly_participation
--   - Rate limit: max 100 attacks per hour per player
--   - Validate damage calculation matches player stats
--
-- =====================================================
