import pool from '../db'

export interface Todo {
    id?: number;
    title: string;
    completed: boolean;
}

export const getTodos = async (): Promise<Todo[]> => {
    const result = await pool.query('SELECT * FROM todos ORDER BY id');
    return result.rows;
}

export const addTodo = async (todo: Todo): Promise<Todo> => {
    const result = await pool.query(
        'INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *',
        [todo.title, todo.completed]
    );
    return result.rows[0];
}

export const updateTodo = async (id:number, todo:Todo): Promise<Todo> => {
    const result = await pool.query(
        'UPDATE todos SET title = $1, completed = $2 WHERE id = $3 RETURNING *',
        [todo.title, todo.completed, id]
    );
    return result.rows[0];
}

export const deleteTodo = async (id:number): Promise<void> => {
    await pool.query('DELETE FROM todos WHERE id = $1', [id]);
}

export const completeTodo = async (id:number, completed: boolean): Promise<Todo> => {
    const result = await pool.query(
        'UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *',
        [completed, id]
    );
    return result.rows[0];
}