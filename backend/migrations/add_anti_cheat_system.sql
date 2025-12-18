-- Anti-Cheat System Migration
-- Creates table for tracking anti-cheat flags and adds cast timing tracking

-- Create anti-cheat flags table
CREATE TABLE IF NOT EXISTS anti_cheat_flags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    flagged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    reason VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    cast_count INT DEFAULT 1 COMMENT 'Number of times flagged (auto-increments on re-flag)',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_active (user_id, is_active, expires_at),
    INDEX idx_expires_at (expires_at)
);

-- Add cast timing tracking to player_data
ALTER TABLE player_data
ADD COLUMN last_cast_time BIGINT DEFAULT NULL COMMENT 'Timestamp (ms) of last cast',
ADD COLUMN recent_cast_timings JSON DEFAULT NULL COMMENT 'Array of last 20 cast intervals for pattern detection';

-- Create index for fast lookups
CREATE INDEX idx_last_cast_time ON player_data(user_id, last_cast_time);
