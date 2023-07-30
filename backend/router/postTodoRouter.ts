import { Router, Request, Response } from "express";
import { connection } from "../db/connection";
import { uid } from "uid";

export const postTodoRouter = () => {
  const router = Router();
  router.post("/", async (req: Request, res: Response) => {
    console.log("add request", req.body.data.todo);
    const { todo } = req.body.data;
    const uidValue = uid();
    const JSTOffset = 1000 * 60 * 60 * 9;
    const created_at = Math.floor(
      (Date.now() + JSTOffset) / (1000 * 60 * 60 * 24)
    );
    const sql = `INSERT INTO todos VALUES ("${uidValue}", "${todo}", ${created_at}, 0)`;
    connection.query(sql, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to add todo" });
      }
      return res
        .status(200)
        .json({ id: uidValue, todo, created_at, compleated: 0 });
    });
  });
  return router;
};
