import axios from 'axios';

const API_URL = 'http://localhost:5000/todo';

export const getTodos = async () => {
    const { data } = await axios.get(API_URL);
    return data;
}

export const createTodo = async (title:string) => {
    const { data } = await axios.post(API_URL, {title, completed:false});
    return data;
}

export const deleteTodo = async (id:number) => {
    await axios.delete(`${API_URL}/${id}`);
};

export const toggleTodo = async (id: number, completed: boolean) => {
  const { data } = await axios.patch(`${API_URL}/${id}/toggle`, { completed });
  return data;
};

export const updateTodo = async (id: number, newText: string) => {
  const { data } = await axios.put(`${API_URL}/${id}`, { title: newText, completed:false });
  return data;
};