import React, {useEffect, useRef, useState} from "react";
import { Todo } from "../model";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdDone } from "react-icons/md";
import "./styles.css"
import { deleteTodo, toggleTodo, updateTodo } from "../services/todoService";

interface TodoItemProps {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoItem: React.FC<TodoItemProps> = ({todo, todos, setTodos}:TodoItemProps) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.title);

    const handleDone = async (id: number) => {
        try {
            const updatedTodo = await toggleTodo(id, !todo.completed);
            setTodos((currentTodos) => 
                currentTodos.map((todo) => 
                (todo.id === id? {...todo, completed: updatedTodo.completed} : todo
              ))
            );
        } catch(error) {
            console.error("Failed to toggle todo", error);
        }
    };

    const handleDelete = async(id: number) => {
        try{
            await deleteTodo(id);
            setTodos(
                todos.filter((todo)=> todo.id !== id)
            );
        }catch (error) {
            console.error("Failed to delete todo", error);
        }
    };

    const handleEdit = async (e:React.FormEvent, id: number) => {
        e.preventDefault();
        try{
            const updatedTodo = await updateTodo(id, editTodo);
            setTodos((currentTodos) => 
                currentTodos.map((todo) =>
                todo.id === id? {...todo, title: updatedTodo.title} : todo
            ))
            setEdit(false);
        } catch(error){
            console.error("Failed to edit todo", error)
        }
    }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=> {
        inputRef.current?.focus();
    }, [edit]);

    return (<form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
        {edit ? (
            <input
                ref={inputRef}
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
                className='todos__single--text'
            />
        ) : (todo.completed ? (
            <s className="todos__single--text">{todo.title}</s>
        ) : (
            <span className="todos__single--text">{todo.title}</span>
        ))
    }
    <div>
        <span className="icon" onClick={()=> {
            if(!edit && !todo.completed) {
                setEdit(!edit);
            }
        }}>
            <FaEdit/>
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
            <MdDelete/>
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
            <MdDone/>
        </span>
    </div>
    </form>);
};

export default TodoItem;