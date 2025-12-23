/**
 * Migration Script: Add Profile Features
 *
 * This script adds all necessary columns for the new profile features including:
 * - Bio, equipped title, nationality
 * - Profile name changes tracking
 * - Achievement and fish showcases
 * - Avatar system
 * - Privacy settings
 * - Profile views
 *
 * Run this once to upgrade your database for the new profile features.
 *
 * Usage: node run-profile-migration.js
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
        console.log('🔄 Starting migration: Add Profile Features...');
        console.log('This will add all required columns for the new profile system.\n');

        connection = await db.getConnection();

        // Read migration SQL
        const migrationPath = path.join(__dirname, 'migrations', 'add_profile_features.sql');
        const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

        // Split by semicolons and filter out empty statements and comments
        const statements = migrationSQL
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt && !stmt.startsWith('--'));

        console.log(`📝 Found ${statements.length} SQL statements to execute...\n`);

        // Execute each statement
        for (let i = 0; i < statements.length; i++) {
            const stmt = statements[i];

            try {
                // Skip SELECT statements that are just for display
                if (stmt.trim().toUpperCase().startsWith('SELECT \'')) {
                    const [result] = await connection.query(stmt);
                    if (result && result[0] && result[0].message) {
                        console.log(`\n✅ ${result[0].message}`);
                    }
                    continue;
                }

                const [result] = await connection.query(stmt);

                // Log progress for ALTER and UPDATE statements
                if (stmt.toUpperCase().includes('ALTER TABLE')) {
                    console.log(`✓ Executed: ALTER TABLE (added columns)`);
                } else if (stmt.toUpperCase().includes('UPDATE')) {
                    console.log(`✓ Updated ${result.affectedRows || 0} rows`);
                } else if (stmt.toUpperCase().includes('CREATE TABLE')) {
                    console.log(`✓ Created table (if not exists)`);
                }
            } catch (stmtError) {
                // Some errors are acceptable (like column already exists)
                if (stmtError.code === 'ER_DUP_FIELDNAME' ||
                    stmtError.code === 'ER_CANT_DROP_FIELD_OR_KEY' ||
                    stmtError.message.includes('Duplicate column name')) {
                    console.log(`⚠ Skipped (column already exists)`);
                } else {
                    throw stmtError;
                }
            }
        }

        console.log('\n✅ Migration completed successfully!');
        console.log('\nThe following features are now available:');
        console.log('  • User profiles with bio and nationality');
        console.log('  • Avatar system (20 default avatars unlocked)');
        console.log('  • Fish and achievement showcases');
        console.log('  • Privacy settings (public/friends/private)');
        console.log('  • Profile view tracking');
        console.log('  • Equipped achievement titles');
        console.log('\n🎮 You can now use all profile features in the game!');

    } catch (error) {
        console.error('\n❌ Migration failed:', error.message);
        console.error('Full error:', error);
        process.exit(1);
    } finally {
        if (connection) {
            connection.release();
        }
        await db.end();
    }
}

runMigration();
