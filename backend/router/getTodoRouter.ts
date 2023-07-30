import { Router, Request, Response } from "express";
import { connection } from "../db/connection";

export const getTodoRouter = () => {
  const router = Router(); 

  // todoの一覧を返却するAPI
  router.get("/", (req: Request, res: Response) => {
    const sql = "SELECT * FROM todos";
    connection.query(sql, (error, result) => {
      if (error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(200).json(result);
      }
    });
  });

  return router
};
