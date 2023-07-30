import {
  Container,
  Typography,
  Button,
  TextField,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import "./App.css";
import { useForm } from "react-hook-form";
import useTodoAPI from "./api/useTodoAPI";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
        <Button sx={{ ml: 2 }} type="submit" variant="contained">
          Add
        </Button>
      </form>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Todo name</TableCell>
              <TableCell>Created date</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell>{todo.todo}</TableCell>
                <TableCell>{changeUnixToDate(todo.created_at)}</TableCell>
                <TableCell>
                  <Button variant="contained" color="success">
                    <EditIcon />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => deleteTodo(todo.id)}
                    variant="contained"
                    color="error"
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;

function changeUnixToDate(date: number) {
  const daysSinceEpoch = new Date(date * 24 * 60 * 60 * 1000);
  const formattedDate =
    (daysSinceEpoch.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    daysSinceEpoch.getDate().toString().padStart(2, "0") +
    "/" +
    daysSinceEpoch.getFullYear().toString();
  return formattedDate;
}

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
