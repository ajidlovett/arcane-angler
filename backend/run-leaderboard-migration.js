/**
 * Migration Script: Add Leaderboard Columns
 *
 * This script adds all necessary columns for comprehensive leaderboard tracking.
 * Run this once to update the database schema.
 *
 * Usage: node run-leaderboard-migration.js
 */

import db from './db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
    let connection;

    try {
        console.log('🔄 Starting migration: Add Leaderboard Columns...');

        connection = await db.getConnection();
        await connection.beginTransaction();

        // Read migration SQL
        const migrationPath = path.join(__dirname, 'migrations', 'add_leaderboard_columns.sql');
        const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

        // Split by semicolons and filter out empty statements, comments, and USE statements
        const statements = migrationSQL
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt =>
                stmt &&
                !stmt.startsWith('--') &&
                !stmt.toUpperCase().startsWith('USE')
            );

        console.log(`📝 Executing ${statements.length} SQL statements...`);

        // Execute each statement
        for (let i = 0; i < statements.length; i++) {
            const stmt = statements[i];
            try {
                await connection.query(stmt);
                console.log(`✅ Statement ${i + 1}/${statements.length} completed`);
            } catch (error) {
                // Some ALTER TABLE IF NOT EXISTS might fail if column exists, that's okay
                if (error.code === 'ER_DUP_FIELDNAME') {
                    console.log(`⚠️  Column already exists, skipping (statement ${i + 1})`);
                } else {
                    throw error;
                }
            }
        }

        // Verify the changes
        const [columns] = await connection.query(`
            SELECT COLUMN_NAME
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_SCHEMA = 'arcane_angler'
            AND TABLE_NAME = 'leaderboard_stats'
            ORDER BY COLUMN_NAME
        `);

        console.log('\n📊 Current leaderboard_stats columns:');
        columns.forEach(col => console.log(`  - ${col.COLUMN_NAME}`));

        await connection.commit();
        console.log('\n✅ Migration completed successfully!');

    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
        console.error('❌ Migration failed:', error);
        process.exit(1);
    } finally {
        if (connection) {
            connection.release();
        }
        await db.end();
    }
}

runMigration();
