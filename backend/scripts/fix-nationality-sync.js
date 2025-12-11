#!/usr/bin/env node

/**
 * Fix Nationality Sync Issue
 *
 * This script:
 * 1. Checks if the nationality sync trigger exists
 * 2. Creates/recreates the trigger if needed
 * 3. Syncs existing nationality data from users to leaderboard_stats
 *
 * Run this with: node backend/scripts/fix-nationality-sync.js
 */

import db from '../db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fixNationalitySync() {
    try {
        console.log('='.repeat(50));
        console.log('Fixing Nationality Sync Issue');
        console.log('='.repeat(50));
        console.log('');

        // Step 1: Check if trigger exists
        console.log('Step 1: Checking for nationality sync trigger...');
        const [triggers] = await db.query(`
            SHOW TRIGGERS WHERE \`Trigger\` = 'after_user_update_nationality'
        `);

        if (triggers.length > 0) {
            console.log('✓ Trigger exists');
            console.log('  Dropping existing trigger to recreate it...');
            await db.query('DROP TRIGGER IF EXISTS after_user_update_nationality');
            console.log('  ✓ Old trigger dropped');
        } else {
            console.log('✗ Trigger does not exist');
        }
        console.log('');

        // Step 2: Create the trigger
        console.log('Step 2: Creating nationality sync trigger...');
        const createTriggerSQL = `
CREATE TRIGGER after_user_update_nationality
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    IF NEW.nationality != OLD.nationality
       OR (NEW.nationality IS NOT NULL AND OLD.nationality IS NULL)
       OR (NEW.nationality IS NULL AND OLD.nationality IS NOT NULL) THEN
        UPDATE leaderboard_stats
        SET nationality = NEW.nationality
        WHERE user_id = NEW.id;
    END IF;
END
        `;

        await db.query(createTriggerSQL);
        console.log('✓ Trigger created successfully');
        console.log('');

        // Step 3: Sync existing data
        console.log('Step 3: Syncing existing nationality data...');

        // First, check the current state
        const [beforeSync] = await db.query(`
            SELECT
                COUNT(*) as total_users,
                SUM(CASE
                    WHEN u.nationality = ls.nationality
                    OR (u.nationality IS NULL AND ls.nationality IS NULL)
                    THEN 1 ELSE 0
                END) as synced_users,
                SUM(CASE
                    WHEN (u.nationality != ls.nationality AND u.nationality IS NOT NULL AND ls.nationality IS NOT NULL)
                    OR (u.nationality IS NOT NULL AND ls.nationality IS NULL)
                    OR (u.nationality IS NULL AND ls.nationality IS NOT NULL)
                    THEN 1 ELSE 0
                END) as unsynced_users
            FROM users u
            JOIN leaderboard_stats ls ON u.id = ls.user_id
        `);

        const stats = beforeSync[0];
        console.log(`  Total users: ${stats.total_users}`);
        console.log(`  Already synced: ${stats.synced_users}`);
        console.log(`  Need syncing: ${stats.unsynced_users}`);
        console.log('');

        if (stats.unsynced_users > 0) {
            console.log('  Syncing nationality values...');
            const [result] = await db.query(`
                UPDATE leaderboard_stats ls
                JOIN users u ON ls.user_id = u.id
                SET ls.nationality = u.nationality
            `);

            console.log(`  ✓ Updated ${result.affectedRows} rows`);
            console.log('');

            // Verify the fix
            const [afterSync] = await db.query(`
                SELECT
                    COUNT(*) as total_users,
                    SUM(CASE
                        WHEN u.nationality = ls.nationality
                        OR (u.nationality IS NULL AND ls.nationality IS NULL)
                        THEN 1 ELSE 0
                    END) as synced_users,
                    SUM(CASE
                        WHEN (u.nationality != ls.nationality AND u.nationality IS NOT NULL AND ls.nationality IS NOT NULL)
                        OR (u.nationality IS NOT NULL AND ls.nationality IS NULL)
                        OR (u.nationality IS NULL AND ls.nationality IS NOT NULL)
                        THEN 1 ELSE 0
                    END) as unsynced_users
                FROM users u
                JOIN leaderboard_stats ls ON u.id = ls.user_id
            `);

            const afterStats = afterSync[0];
            console.log('Step 4: Verification');
            console.log(`  Total users: ${afterStats.total_users}`);
            console.log(`  Synced: ${afterStats.synced_users}`);
            console.log(`  Unsynced: ${afterStats.unsynced_users}`);
            console.log('');
        } else {
            console.log('  ✓ All nationalities already synced');
            console.log('');
        }

        // Show some sample data
        console.log('Step 5: Sample data verification');
        const [samples] = await db.query(`
            SELECT
                u.id,
                u.username,
                u.nationality as user_nationality,
                ls.nationality as leaderboard_nationality
            FROM users u
            JOIN leaderboard_stats ls ON u.id = ls.user_id
            WHERE u.nationality IS NOT NULL
            LIMIT 5
        `);

        if (samples.length > 0) {
            console.log('  Sample records:');
            samples.forEach(row => {
                const status = row.user_nationality === row.leaderboard_nationality ? '✓' : '✗';
                console.log(`  ${status} ${row.username}: users=${row.user_nationality}, leaderboard=${row.leaderboard_nationality}`);
            });
        } else {
            console.log('  No users with nationality set found');
        }
        console.log('');

        console.log('='.repeat(50));
        console.log('✅ Nationality sync fix completed successfully!');
        console.log('='.repeat(50));
        console.log('');
        console.log('The trigger is now active and will automatically sync');
        console.log('any future nationality changes from users to leaderboard_stats.');
        console.log('');

    } catch (error) {
        console.error('');
        console.error('='.repeat(50));
        console.error('❌ Error fixing nationality sync:');
        console.error('='.repeat(50));
        console.error(error);
        console.error('');
        process.exit(1);
    } finally {
        await db.end();
    }
}

// Run the fix
fixNationalitySync();
