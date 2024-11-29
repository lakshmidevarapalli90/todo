import { Request, Response } from "express";
import { getTodos, addTodo, updateTodo, deleteTodo, completeTodo } from "../models/todoModel";
import { StatusCodes } from "http-status-codes";

export const fetchTodos = async(req: Request, res: Response) => {
    try {
        const todos = await getTodos();
        res.status(StatusCodes.OK).json(todos);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}

export const createTodo = async (req: Request, res: Response) => {
    const { title, completed } = req.body;
    try {
        const todo = await addTodo({title, completed});
        res.status(StatusCodes.CREATED).json(todo);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}

export const editTodo = async (req:Request, res:Response) => {
    const {id} = req.params;
    const {title, completed } = req.body;
    try{
        const todo = await updateTodo(Number(id), {title, completed});
        res.status(StatusCodes.OK).json(todo);
    } catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}

export const toggleTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { completed } = req.body;

    try {
        const todo = await completeTodo(Number(id), completed);
        res.status(StatusCodes.OK).json(todo);
    } catch (err) {
        console.error('Error updating todo:', err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update todo' });
    }
};

export const removeTodo = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        await deleteTodo(Number(id));
        res.status(StatusCodes.OK).json({message: 'Todo Deleted'});
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}