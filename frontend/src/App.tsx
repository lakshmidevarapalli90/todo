import React, { useEffect, useState } from 'react'
import AddTodo from './components/AddTodo';
import { getTodos } from './services/todoService';
import TodoItem from './components/TodoItem';
import { Todo } from './model';
import "./App.css"

const App: React.FC = () => {
    const [todo, setTodo] = useState<string>('');
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const fetchTodos = async () => {
            const data = await getTodos();
            setTodos(data);
        };
        fetchTodos();
    }, []);

    const handleAdd = async (newTodo: Todo) => {
        setTodos(prevTodos => [...prevTodos, newTodo]);
    };

    const todoTasks = todos.filter(todo => !todo.completed);
    const completedTasks = todos.filter(todo => todo.completed)

    return (
        <div className="App">
            <span className="heading">Todo Application</span>
            <AddTodo title={todo} setTodo={setTodo} handleAdd={handleAdd} />
            <div className="container">
                <div className="column">
                    <div className="column-title">Todo Tasks</div>
                    {
                        todoTasks.map(todo => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                todos={todos}
                                setTodos={setTodos} />
                        ))
                    }
                </div>
                <div className='column'>
                    <div className="column-title">Completed Tasks</div>
                    {
                        completedTasks.map(todo => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                todos={todos}
                                setTodos={setTodos}
                            />
                        ))}
                </div>
            </div>
        </div>
    )
}

export default App;