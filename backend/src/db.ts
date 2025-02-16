import { Pool } from 'pg';

const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
        rejectUnauthorized: false
    }
});

// Test the connection
const testConnection = async (): Promise<void> => {
    try {
        const client = await pool.connect();
        console.log('Database connection config:', {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            hasPassword: !!process.env.DB_PASSWORD
        });

        const result = await client.query('SELECT NOW()');
        console.log('Database connected successfully:', result.rows[0]);
        client.release();
    } catch (err) {
        console.error('Error testing database connection:', err);
    }
};

testConnection();

export default pool;