-- ========================================
-- Fix Nationality Sync Trigger
-- This ensures the leaderboard_stats table stays in sync when nationality changes in users table
-- Run this migration to fix the leaderboard nationality sync issue
-- ========================================

-- Drop the trigger if it exists (to recreate it)
DROP TRIGGER IF EXISTS after_user_update_nationality;

-- Recreate the trigger to sync nationality from users to leaderboard_stats
DELIMITER $$
CREATE TRIGGER after_user_update_nationality
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    -- Check if nationality was changed
    IF NEW.nationality != OLD.nationality
       OR (NEW.nationality IS NOT NULL AND OLD.nationality IS NULL)
       OR (NEW.nationality IS NULL AND OLD.nationality IS NOT NULL) THEN
        -- Sync the new nationality value to leaderboard_stats
        UPDATE leaderboard_stats
        SET nationality = NEW.nationality
        WHERE user_id = NEW.id;
    END IF;
END$$
DELIMITER ;

-- ========================================
-- Fix existing data (sync current nationality values)
-- This ensures all existing users have their nationality synced to leaderboard_stats
-- ========================================

UPDATE leaderboard_stats ls
JOIN users u ON ls.user_id = u.id
SET ls.nationality = u.nationality;

-- Verify the fix
SELECT
    'Nationality Sync Status' as info,
    COUNT(*) as total_users,
    SUM(CASE WHEN u.nationality = ls.nationality OR (u.nationality IS NULL AND ls.nationality IS NULL) THEN 1 ELSE 0 END) as synced_users,
    SUM(CASE WHEN u.nationality != ls.nationality OR (u.nationality IS NOT NULL AND ls.nationality IS NULL) OR (u.nationality IS NULL AND ls.nationality IS NOT NULL) THEN 1 ELSE 0 END) as unsynced_users
FROM users u
JOIN leaderboard_stats ls ON u.id = ls.user_id;
