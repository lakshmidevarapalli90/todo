import React, {useEffect, useState} from 'react'
import AddTodo from './components/AddTodo';
import { getTodos } from './services/todoService';
import TodoItem from './components/TodoItem';
import { Todo } from './model';
import "./App.css"

const App:React.FC = () => {
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

    return (
        <div className="App">
            <span className="heading">Todo Tasks</span>
            <AddTodo title={todo} setTodo={setTodo} handleAdd={handleAdd}/>
            <div className="todos">
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        todos={todos}
                        setTodos={setTodos}
                    />
                ))}
            </div>
         </div>
    )
}

export default App;