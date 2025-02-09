import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
});

(async () => {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('Database connected successfully!', result.rows[0]);
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
})();

export default pool;