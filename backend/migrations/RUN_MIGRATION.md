# Anomaly System Database Migration

## How to Run the Migration

### Option 1: Using MySQL Command Line
```bash
cd backend/migrations
mysql -u root -p arcane_angler < add_anomaly_system.sql
```

### Option 2: Using Node.js Script
```bash
cd backend
node -e "
const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config();

(async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
  });

  const sql = fs.readFileSync('./migrations/add_anomaly_system.sql', 'utf8');
  await connection.query(sql);
  console.log('✅ Migration completed successfully!');
  await connection.end();
})();
"
```

### Option 3: phpMyAdmin or Database GUI
1. Open phpMyAdmin or your preferred database GUI
2. Select the `arcane_angler` database
3. Go to SQL tab
4. Copy and paste contents of `add_anomaly_system.sql`
5. Click "Execute"

## What This Migration Does

### New Tables Created:
1. **anomalies** - Boss definitions (20 bosses pre-populated)
2. **anomaly_events** - Active and historical boss events
3. **anomaly_participation** - Player damage tracking per event
4. **global_xp_booster_queue** - Global XP booster queue system
5. **fragment_shop_purchases** - Purchase history for avatars/boosters
6. **anomaly_attack_stats** - Analytics for attack patterns

### Player Data Modifications:
- Added `anomaly_fragments` column (INT, default 0)
- Added `active_xp_booster_personal` column (JSON, for personal booster tracking)

## Verification

After running the migration, verify with:

```sql
-- Check if tables were created
SHOW TABLES LIKE '%anomaly%';
SHOW TABLES LIKE '%global_xp%';

-- Check if player_data columns were added
DESCRIBE player_data;

-- Verify bosses were inserted
SELECT COUNT(*) FROM anomalies;  -- Should return 20

-- Check first boss
SELECT name, primary_weakness, resistant_stat FROM anomalies LIMIT 1;
```

## Rollback (if needed)

If you need to undo the migration:

```sql
-- Remove tables
DROP TABLE IF EXISTS anomaly_attack_stats;
DROP TABLE IF EXISTS fragment_shop_purchases;
DROP TABLE IF EXISTS global_xp_booster_queue;
DROP TABLE IF EXISTS anomaly_participation;
DROP TABLE IF EXISTS anomaly_events;
DROP TABLE IF EXISTS anomalies;

-- Remove columns from player_data
ALTER TABLE player_data DROP COLUMN IF EXISTS anomaly_fragments;
ALTER TABLE player_data DROP COLUMN IF EXISTS active_xp_booster_personal;
```

## Next Steps

After migration:
1. Restart the backend server (`npm start` or `pm2 restart`)
2. The anomaly scheduler will automatically spawn the first boss
3. Check server logs for "🎣 Anomaly Scheduler starting..."
4. Verify with: `curl https://arcaneangler.com/api/anomalies/current`
