import { Router, Request, Response } from "express";
import { connection } from "../db/connection";

export const deleteTodoRouter = () => {
  const router = Router();
  router.delete("/", async (req: Request, res: Response) => {
    console.log(req.body.id);
    const id = req.body.id;
    const sql = `DELETE FROM todos WHERE id = "${id}"`;
    connection.query(sql, (error) => {
      if (error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(200);
      }
    });
  });
  return router;
};
