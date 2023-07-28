import express, { Application, Request, Response } from "express";
import { uid } from "uid";
import cors from "cors";
import mysql from "mysql2";

const app: Application = express();
const PORT = 3000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "HiKaRu!4215",
  database: "todolists",
});

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

// todoの一覧を返却するAPI
app.get("/", async (req: Request, res: Response) => {
  const sql = "SELECT * FROM todos";
  connection.query(sql, (error, result) => {
    if (error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(200).json(result);
    }
  });
});

// todoを作成するAPI
app.post("/add", async (req: Request, res: Response) => {
  console.log("add request", req.body.data.todo);
  const { todo } = req.body.data;
  const date = 1111111111;
  const sql = `INSERT INTO todos VALUES ("${uid()}", "${todo}", ${date}, 0)`;
  const result = connection.query(sql, (error) => (error ? false : true));
  return result ? res.status(200) : res.status(500);
});

// csvでtodoを作成する方法
app.post("/add-todos", async (req: Request, res: Response) => {
  console.log(req.body.data);
  return res.status(200);
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
});

// todoを削除する
app.delete("/delete", async (req: Request, res: Response) => {
  console.log(req.body.id);
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
