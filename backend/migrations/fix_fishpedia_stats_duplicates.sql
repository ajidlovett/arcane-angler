-- Migration: Fix fishpedia_stats duplicate records and add unique constraint
-- Purpose: Consolidate duplicate fish records and ensure unique constraint is in place
-- Date: 2025-12-10

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
TRUNCATE TABLE fishpedia_stats;

-- Step 3: Insert consolidated data back
INSERT INTO fishpedia_stats (user_id, fish_name, rarity, total_caught, first_caught_at, last_caught_at)
SELECT user_id, fish_name, rarity, total_caught, first_caught_at, last_caught_at
FROM temp_fishpedia_consolidated;

-- Step 4: Drop the temporary table
DROP TEMPORARY TABLE temp_fishpedia_consolidated;

-- Step 5: Verify and add unique constraint if it doesn't exist
-- First, check if constraint exists and drop it if needed (to recreate)
ALTER TABLE fishpedia_stats DROP INDEX IF EXISTS unique_fishpedia_stat;

-- Add the unique constraint
ALTER TABLE fishpedia_stats ADD UNIQUE KEY unique_fishpedia_stat (user_id, fish_name);

-- Verification query (run this after migration to verify)
-- SELECT user_id, fish_name, COUNT(*) as count
-- FROM fishpedia_stats
-- GROUP BY user_id, fish_name
-- HAVING count > 1;
-- This should return 0 rows if the fix worked
