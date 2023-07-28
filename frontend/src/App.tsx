import { Container, Typography, Button, TextField, Box } from "@mui/material";
import "./App.css";
import { useForm } from "react-hook-form";
import useTodoAPI from "./api/useTodoAPI";

function App() {
  const { register, handleSubmit } = useForm<AddTask>();

  const { todos, addTodo, updateTodo, deleteTodo } = useTodoAPI();

  return (
    <Container>
      <Typography variant="h4" component="h1">
        Todo List
      </Typography>
      <form onSubmit={handleSubmit((event) => addTodo(event))}>
        <TextField {...register("todo")} type="text" size="small" />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>

      <Box>
        {
          todos.map((todo) => (
            <Box key={todo.id} sx={{ display: "flex" }}>
              <p>id: {todo.id}</p>
              <p>name: {todo.name}</p>
              <p>date: {todo.date}</p>
              <Button variant="contained">Edit</Button>
              {/* <Button onClick={() => deleteTodo(todo.id)} variant="contained">
                delete
              </Button> */}
            </Box>
          ))
        }
      </Box>
    </Container>
  );
}

export default App;

// const [file, setFile] = useState<File | null>(null);
{
  /* <TextField type="file" onChange={changeFile} />
      <Button onClick={uploadTodos} variant="contained">
        CSV Upload
      </Button> */
}
// const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const file = e.target.files;
//   console.log(file);
//   if (file && file[0]) {
//     setFile(file[0]);
//   }
// };

// const uploadTodos = async () => {
//   const formData = new FormData();
//   console.log(formData);
//   if (file === null) {
//     console.log("restet");
//     return;
//   }
//   console.log(formData);
//   await formData.append("file", file);
//   axios.post("http://localhost:3000/add-todos", formData);
// };
