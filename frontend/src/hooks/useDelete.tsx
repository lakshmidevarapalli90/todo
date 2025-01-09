import { deleteTodo } from "../services/todoService";

// use promises instead of try catch

export const useDelete= () => {
    const handeDelete = async (id: number) => {
        await deleteTodo(id).catch(err => console.error("Failed to delete todo", err) )
    }
    return {deleteTodo: handeDelete};
}