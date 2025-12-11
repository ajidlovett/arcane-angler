# Fix: Leaderboard Nationality Sync Issue

## Problem Description

The leaderboard was not syncing nationality changes from the profile page. When a user updated their nationality in their profile, the leaderboard continued showing the old nationality value.

## Root Cause

The database trigger `after_user_update_nationality` that should sync nationality changes from the `users` table to the `leaderboard_stats` table was either:
1. Never created in the production database, or
2. Was dropped/missing

## Solution

We've provided two ways to fix this issue:

### Option 1: SQL Migration (Recommended for direct database access)

Run the SQL migration file in your MySQL database:

```bash
mysql -u your_user -p arcane_angler < backend/server/migrations/fix_nationality_sync_trigger.sql
```

Or if using phpMyAdmin:
1. Open phpMyAdmin
2. Select the `arcane_angler` database
3. Go to the SQL tab
4. Copy and paste the contents of `fix_nationality_sync_trigger.sql`
5. Click "Go"

### Option 2: Node.js Script (Recommended for programmatic fix)

Run the Node.js script from the project root:

```bash
node backend/scripts/fix-nationality-sync.js
```

This script will:
1. Check if the trigger exists
2. Drop and recreate the trigger if needed
3. Sync all existing nationality data from `users` to `leaderboard_stats`
4. Verify the fix was successful
5. Show sample data to confirm

## What the Fix Does

1. **Creates/Recreates the Trigger**: Ensures the `after_user_update_nationality` trigger exists and is up-to-date
2. **Syncs Existing Data**: Updates all `leaderboard_stats` records to match the current nationality values in the `users` table
3. **Verifies Success**: Shows statistics about synced vs unsynced records

## After Running the Fix

After running either option, the following will work correctly:

1. ✅ Changing nationality on the profile page will immediately sync to the leaderboard
2. ✅ All existing nationality mismatches will be corrected
3. ✅ Future nationality changes will automatically sync via the trigger

## Technical Details

The trigger updates `leaderboard_stats.nationality` whenever:
- `users.nationality` is changed from one value to another
- `users.nationality` is set from NULL to a value
- `users.nationality` is changed from a value to NULL

This ensures the leaderboard always displays the current nationality for all users.

## Verification

To verify the fix worked, you can:

1. Check the trigger exists:
```sql
SHOW TRIGGERS WHERE `Trigger` = 'after_user_update_nationality';
```

2. Verify data is synced:
```sql
SELECT
    COUNT(*) as total_users,
    SUM(CASE WHEN u.nationality = ls.nationality OR (u.nationality IS NULL AND ls.nationality IS NULL) THEN 1 ELSE 0 END) as synced_users
FROM users u
JOIN leaderboard_stats ls ON u.id = ls.user_id;
```

3. Test changing nationality:
   - Log in to the game
   - Go to Profile → Edit Nationality
   - Change your nationality
   - Go to Leaderboard
   - Your new nationality should appear immediately

## Related Files

- `backend/database.sql` - Contains the trigger definition (lines 288-299)
- `backend/routes/profile.js` - Handles nationality updates (lines 224-245)
- `backend/routes/leaderboard.js` - Queries nationality for display (line 50)
- `backend/server/migrations/add_nationality.sql` - Initial nationality column migration
- `backend/server/migrations/fix_nationality_sync_trigger.sql` - This fix (SQL)
- `backend/scripts/fix-nationality-sync.js` - This fix (Node.js)

## Issue Reference

This fix resolves the issue where Ajid changed nationality from AU to AF but the leaderboard still showed AU.
