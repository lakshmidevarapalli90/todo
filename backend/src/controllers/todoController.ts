import { Request, Response } from "express";
import { getTodos, addTodo, updateTodo, deleteTodo, completeTodo } from "../models/todoModel";

export const fetchTodos = async(req: Request, res: Response) => {
    try {
        const todos = await getTodos();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const createTodo = async (req: Request, res: Response) => {
    const { title, completed } = req.body;
    try {
        const todo = await addTodo({title, completed});
        res.status(201).json(todo);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const editTodo = async (req:Request, res:Response) => {
    const {id} = req.params;
    const {title, completed } = req.body;
    try{
        const todo = await updateTodo(Number(id), {title, completed});
        res.status(200).json(todo);
    } catch(err) {
        res.status(500).json(err);
    }
}

export const toggleTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { completed } = req.body;

    try {
        const todo = await completeTodo(Number(id), completed);
        res.status(200).json(todo);
    } catch (err) {
        console.error('Error updating todo:', err);
        res.status(500).json({ error: 'Failed to update todo' });
    }
};

export const removeTodo = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        await deleteTodo(Number(id));
        res.status(200).json({message: 'Todo Deleted'});
    } catch (err) {
        res.status(500).json(err);
    }
}