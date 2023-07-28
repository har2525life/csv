import { useState, useEffect } from "react";
import axios from "axios";

export default function useTodoAPI() {
  const [todos, setTodos] = useState<Todos[]>([]);

  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:3000");
    const { data } = response;
    return data;
  };

  const addTodo = async (event: AddTask) => {
    const { todo } = event;
    const response = await axios.post("http://localhost:3000/add", {
      data: {
        todo,
      },
    });
    console.log(response);
    return response;
  };

  const updateTodo = (id: string, todo: string) => {
    console.log(id);
    axios.delete("http://localhost:3000/edit", {
      data: {
        id: id,
      },
    });
  };

  const deleteTodo = (id: string) => {
    console.log(id);
    axios.delete("http://localhost:3000/delete", {
      data: {
        id: id,
      },
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
