/**
 * Migration Script: Fix Default Stats
 *
 * This script updates existing users who have 0 stats to proper defaults.
 * Run this once after deploying the database schema changes.
 *
 * Usage: node run-migration.js
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
        console.log('🔄 Starting migration: Fix Default Stats...');

        connection = await db.getConnection();
        await connection.beginTransaction();

        // Read migration SQL
        const migrationPath = path.join(__dirname, 'migrations', '001_fix_default_stats.sql');
        const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

        // Split by semicolons and filter out empty statements and comments
        const statements = migrationSQL
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt && !stmt.startsWith('--'));

        // Execute UPDATE statement (first non-comment statement)
        const updateStmt = statements[0];
        const [result] = await connection.query(updateStmt);

        console.log(`✅ Updated ${result.affectedRows} users with corrected stats`);

        // Execute verification SELECT (second statement)
        if (statements.length > 1) {
            const [verification] = await connection.query(statements[1]);
            console.log('\n📊 Verification Results:');
            console.log(verification[0]);
        }

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
