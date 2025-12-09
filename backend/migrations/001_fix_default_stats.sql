-- Migration: Fix default stats from 0 to proper starting values
-- This migration updates existing users who have 0 stats to the proper defaults

-- Update all users with 0 stats to the new defaults
UPDATE player_stats
SET
    strength = GREATEST(strength, 1),
    intelligence = GREATEST(intelligence, 1),
    luck = GREATEST(luck, 1),
    stamina = CASE
        WHEN stamina = 0 THEN 100
        ELSE stamina
    END
WHERE
    strength = 0
    OR intelligence = 0
    OR luck = 0
    OR stamina = 0;

-- Verify the update
SELECT
    COUNT(*) as total_users,
    SUM(CASE WHEN strength >= 1 THEN 1 ELSE 0 END) as users_with_strength,
    SUM(CASE WHEN intelligence >= 1 THEN 1 ELSE 0 END) as users_with_intelligence,
    SUM(CASE WHEN luck >= 1 THEN 1 ELSE 0 END) as users_with_luck,
    SUM(CASE WHEN stamina >= 1 THEN 1 ELSE 0 END) as users_with_stamina
FROM player_stats;
