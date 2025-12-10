-- Migration: Fix fishpedia_stats duplicate records and add unique constraint
-- Purpose: Consolidate duplicate fish records and ensure unique constraint is in place
-- Date: 2025-12-10
--
-- IMPORTANT: Run these steps in order. If Step 5 fails with "Duplicate key name",
-- that means the constraint already exists - you can ignore that error.

-- Step 1: Create a temporary table with consolidated data
-- Sum up all total_caught for each (user_id, fish_name) combination
CREATE TEMPORARY TABLE temp_fishpedia_consolidated AS
SELECT
    user_id,
    fish_name,
    rarity,
    SUM(total_caught) as total_caught,
    MIN(first_caught_at) as first_caught_at,
    MAX(last_caught_at) as last_caught_at
FROM fishpedia_stats
GROUP BY user_id, fish_name, rarity;

-- Step 2: Delete all records from fishpedia_stats
DELETE FROM fishpedia_stats;

-- Step 3: Insert consolidated data back
INSERT INTO fishpedia_stats (user_id, fish_name, rarity, total_caught, first_caught_at, last_caught_at)
SELECT user_id, fish_name, rarity, total_caught, first_caught_at, last_caught_at
FROM temp_fishpedia_consolidated;

-- Step 4: Drop the temporary table
DROP TEMPORARY TABLE temp_fishpedia_consolidated;

-- Step 5: Add unique constraint
-- If this fails with "Duplicate key name 'unique_fishpedia_stat'",
-- the constraint already exists - that's fine, you can ignore the error
ALTER TABLE fishpedia_stats ADD UNIQUE KEY unique_fishpedia_stat (user_id, fish_name);

-- Verification query (run this after migration to verify)
-- SELECT user_id, fish_name, COUNT(*) as count
-- FROM fishpedia_stats
-- GROUP BY user_id, fish_name
-- HAVING count > 1;
-- This should return 0 rows if the fix worked
