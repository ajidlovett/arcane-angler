# Profile Features Migration

## Problem

If you're seeing console errors like:
- `Failed to load resource: the server responded with a status of 500 () /api/profile/me:1`
- `API Error: Error: Failed to fetch profile`
- Errors when clicking on usernames in the leaderboard
- Errors when accessing Profile Settings

This is because your database is missing the new profile feature columns.

## Solution

Run the profile features migration to add all necessary database columns.

### Option 1: Using the Node.js Migration Script (Recommended)

```bash
cd backend
node run-profile-migration.js
```

This will:
- Add all missing profile columns to your `users` table
- Initialize default values for existing users
- Give all users 20 default avatars
- Create the `profile_views_log` table

### Option 2: Manual SQL Execution

If you prefer to run the SQL directly:

```bash
cd backend
mysql -u YOUR_USERNAME -p YOUR_DATABASE_NAME < migrations/add_profile_features.sql
```

Replace `YOUR_USERNAME` and `YOUR_DATABASE_NAME` with your MySQL credentials.

### Option 3: Using MySQL Workbench or phpMyAdmin

1. Open the file: `backend/migrations/add_profile_features.sql`
2. Copy all the SQL content
3. Paste and execute it in your MySQL client

## What Gets Added

This migration adds the following columns to the `users` table:

- `bio` - User profile bio (500 char limit)
- `equipped_title` - Currently equipped achievement title
- `nationality` - ISO country code (2 letters)
- `profile_name_changes` - Counter for profile name changes
- `achievement_showcase_limit` - Max achievements to showcase (default: 6)
- `favorite_fish_limit` - Max fish to showcase (default: 3)
- `profile_privacy` - Privacy setting (public/friends/private)
- `allow_comments` - Whether to allow profile comments
- `profile_views` - Total profile view count
- `badges` - JSON array of earned badges
- `owned_avatars` - JSON array of unlocked avatars
- `profile_avatar` - Currently selected avatar ID
- `fish_showcase` - JSON array of showcased fish
- `achievement_showcase` - JSON array of showcased achievements
- `registration_date` - Account creation date

It also creates the `profile_views_log` table for tracking who viewed whose profile.

## After Migration

1. Restart your backend server
2. Refresh your browser (hard refresh: Ctrl+Shift+R or Cmd+Shift+R)
3. Clear browser console errors
4. Try accessing profiles again - the errors should be gone!

## Verification

After running the migration, you can verify it worked by:

```bash
mysql -u YOUR_USERNAME -p
USE YOUR_DATABASE_NAME;
DESCRIBE users;
```

You should see all the new columns listed above.

## Troubleshooting

### "Column already exists" errors
This is safe to ignore - it means you already have some of the columns.

### "Duplicate key name" errors
This is safe to ignore - it means the indexes already exist.

### Migration fails with permission errors
Make sure your database user has ALTER TABLE privileges:

```sql
GRANT ALTER ON YOUR_DATABASE_NAME.* TO 'YOUR_USERNAME'@'localhost';
```

### Still getting 500 errors after migration
1. Check that the migration completed successfully
2. Restart your backend server
3. Check the backend console for the actual error message
4. Make sure all columns were added: `DESCRIBE users;`

## Need Help?

If you continue to have issues:
1. Check the backend console logs for specific error messages
2. Verify your database connection in `.env`
3. Make sure you're running MySQL 5.7+ for `IF NOT EXISTS` syntax
4. Try running the migration statements one at a time

## MySQL Version Compatibility

- MySQL 5.7+: Full support with `IF NOT EXISTS` syntax
- MySQL 5.6 or older: You may need to modify the migration to remove `IF NOT EXISTS` and handle duplicate column errors manually

---

**Date Created**: 2025-12-23
**Last Updated**: 2025-12-23
