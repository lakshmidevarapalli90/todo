import { Pool } from 'pg';

const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

// Test the connection
const testConnection = async (): Promise<void> => {
    console.log("test db connectio")
    try {
        console.log('Database connection config:', {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            hasPassword: !!process.env.DB_PASSWORD
        });

        const client = await pool.connect();
        const result = await client.query('SELECT NOW()');
        const todo_table = await client.query('CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY, title VARCHAR(225) NOT NULL, completed BOOLEAN DEFAULT FALSE); ')
        console.log('Database connected successfully:', result.rows[0]);
        client.release();
    } catch (err) {
        console.error('Error testing database connection:', err);
    }
};

testConnection();

export default pool;