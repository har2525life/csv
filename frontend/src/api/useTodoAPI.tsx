import { useState, useEffect } from "react";
import axios from "axios";

export default function useTodoAPI() {
  const [todos, setTodos] = useState<Todos[]>([]);

  const fetchTodos = async () => {
    const { data } = await axios.get<Todos[]>(
      import.meta.env.VITE_REACT_APP_URL
    );
    return data;
  };

  const addTodo = async (event: AddTask) => {
    const { todo } = event;
    if (!todo) return;
    try {
      const response = await axios.post<Todos>(
        `${import.meta.env.VITE_REACT_APP_URL}/add`,
        {
          data: {
            todo,
          },
        }
      );
      setTodos([...todos, response.data]);
    } catch (error) {
      setTodos(todos);
    }
  };

  const updateTodo = (id: string, todo: string) => {
    console.log(id);
    axios.delete(`${import.meta.env.VITE_REACT_APP_URL}/edit`, {
      data: {
        id: id,
      },
    });
  };

  const deleteTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    axios
      .delete(`${import.meta.env.VITE_REACT_APP_URL}/delete`, {
        data: {
          id: id,
        },
      })
      .catch((e) => {
        console.log(e.message);
        setTodos(todos);
      });
  };

  useEffect(() => {
    const getTodos = async () => {
      const todos = await fetchTodos();
      setTodos(todos);
    };
    getTodos();
  }, []);

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
  };
}
