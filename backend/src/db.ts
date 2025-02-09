import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Add logging to debug connection issues
console.log('Database connection config:', {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    // Don't log the actual password
    hasPassword: !!process.env.DB_PASSWORD
});

const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

// Test the connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error testing database connection:', err);
    } else {
        console.log('Database connection test successful:', res.rows[0]);
    }
});

export default pool;