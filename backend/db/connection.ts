import mysql from "mysql2";

export const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "HiKaRu!4215",
    database: "todolists",
  });