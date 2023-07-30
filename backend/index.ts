import express, { Application, Request, Response } from "express";

import cors from "cors";
import { connection } from "./db/connection";
import { getTodoRouter } from "./router/getTodoRouter";
import { postTodoRouter } from "./router/postTodoRouter";
import { updateTodoRouter } from "./router/updateTodoRouter";
import { deleteTodoRouter } from "./router/deleteTodoRouter";

const app: Application = express();
const PORT = 3000;

connection.connect((error) => {
  if (error) throw new Error();
  console.log("connect to MySQL");
});

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", getTodoRouter());
app.use("/add", postTodoRouter());
app.use("/update", updateTodoRouter());
app.use("/delete", deleteTodoRouter());

// csvでtodoを作成する方法
app.post("/add-todos", async (req: Request, res: Response) => {
  console.log(req.body.data);
  return res.status(200);
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
});

try {
  app.listen(PORT, () => {
    console.log(`server running at://localhost:${PORT}`);
  });
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);
  }
}
