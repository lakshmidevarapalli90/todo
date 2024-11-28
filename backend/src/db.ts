import { Pool } from 'pg';

const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'todo_db',
    password: 'admin',
    port:5432,
});

(async () => {
    try{
        await pool.query('SELECT 1');
        console.log('Database connected successfully!')
    } catch (err) {
        console.error('Error connecting to the database:', err)
        process.exit(1);
    }
})();

export default pool
