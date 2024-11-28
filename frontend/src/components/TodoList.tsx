import React from "react";
import TodoItem from "./TodoItem";
import { Todo } from "../model";

interface TodoListProps {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList:React.FC<TodoListProps> = ({todos, setTodos}: TodoListProps) => {
    return <div className="todos">
        {
            todos.map((todo) => (
                <TodoItem todo={todo} key={todo.id} 
                    todos={todos} 
                    setTodos={setTodos}/>
            ))
        }
    </div>
};

export default TodoList;