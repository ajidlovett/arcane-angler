# Fix for Global Chat Message Sending Error

## Problem
Users were unable to send messages in the global chat system. The error was:
```
Failed to load resource: the server responded with a status of 500
API Error: Error: Failed to send message
```

## Root Cause
The `backend/routes/chat.js` file attempts to query the `equipped_title` column from the `users` table:
```sql
SELECT profile_username, equipped_title FROM users WHERE id = ?
```

However, this column doesn't exist in the `users` table in the production database, causing the SQL query to fail with an error.

## Solution

### Option 1: Run the Full Profile Features Migration (Recommended)
If you haven't already, run the complete profile features migration:
```bash
mysql -u your_username -p arcane_angler < backend/server/migrations/add_profile_features.sql
```

This will add all profile-related columns including `equipped_title`.

### Option 2: Run the Minimal Migration
If you only want to fix the chat issue quickly:
```bash
mysql -u your_username -p arcane_angler < backend/migrations/add_equipped_title_to_users.sql
```

This adds the required columns to the `users` table.

### Option 3: Manual SQL Query
If you prefer to run SQL manually, execute this in your database:
```sql
ALTER TABLE users ADD COLUMN equipped_title VARCHAR(255) DEFAULT NULL;
```

## Verification
After running the migration, verify the column exists:
```sql
DESCRIBE users;
```

You should see `equipped_title` listed among the columns.

## Testing
1. Login to the game
2. Navigate to the Chat tab
3. Try sending a message in the global channel
4. The message should send successfully without errors

## Files Modified
- `backend/database.sql` - Added `equipped_title` and other profile columns to users table schema
- `backend/migrations/add_equipped_title_to_users.sql` - Created migration file for existing databases

## Related Issues
This same issue could affect other features that rely on profile columns:
- Friend requests (uses `equipped_title`)
- Profile comments (uses `equipped_title`)
- Leaderboards (uses `equipped_title`)

Running the migration will fix all of these issues.
