import React, {useRef} from "react";
import './styles.css';
import { createTodo } from "../services/todoService";

interface Props {
    title: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd:(newTodo: any) => void;
}

const AddTodo: React.FC<Props> = ({ title, setTodo, handleAdd}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleSubmit = async(e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        if(title){
            try {
                const newTitle = await createTodo(title);
                handleAdd(newTitle);
                setTodo('');
            } catch (error) {
                console.error('Failed to add todo', error);
            }
        }
        inputRef.current?.blur();
    };
    return (
        <form className="input" onSubmit={handleSubmit}>
            <input
                type="input"
                ref={inputRef}
                value={title}
                onChange={(e)=> setTodo(e.target.value)}
                placeholder="Enter a task"
                className="input__box"
            />
            <button className="input_submit" type="submit">Go</button>
        </form>
    )
}



export default AddTodo;