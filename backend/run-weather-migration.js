/**
 * Migration Script: Add Weather Channel to chat_messages
 *
 * This script adds 'weather' to the channel ENUM in chat_messages table.
 *
 * Usage: node run-weather-migration.js
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
        console.log('🔄 Starting migration: Add Weather Channel...');

        connection = await db.getConnection();

        // Read migration SQL
        const migrationPath = path.join(__dirname, 'migrations', 'add_weather_channel.sql');
        const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

        // Execute ALTER TABLE statement
        await connection.query(migrationSQL);

        console.log('✅ Successfully added \'weather\' to chat_messages channel ENUM');

        // Verify the change
        const [result] = await connection.query(`
            SHOW COLUMNS FROM chat_messages LIKE 'channel'
        `);

        console.log('\n📊 Verification:');
        console.log('Column Type:', result[0].Type);

        console.log('\n✅ Migration completed successfully!');

    } catch (error) {
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
