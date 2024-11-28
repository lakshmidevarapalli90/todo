import { Router } from "express";
import { fetchTodos, createTodo, removeTodo, editTodo, toggleTodo } from "../controllers/todoController";

const router = Router();

router.get('/', fetchTodos);
router.post('/', createTodo);
router.patch('/:id/toggle', toggleTodo);
router.put('/:id', editTodo);
router.delete('/:id', removeTodo);

export default router;