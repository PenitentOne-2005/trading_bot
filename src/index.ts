import dotenv from "dotenv";

dotenv.config();

import express, { Request, Response } from "express";
import pkg from "pg";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const createUsersTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        telegram_id BIGINT UNIQUE NOT NULL,
        username TEXT,
        wallet_address TEXT NOT NULL,
        private_key TEXT NOT NULL
      )
    `);
    console.log("✅ Таблица users проверена/создана");
  } catch (error) {
    console.error("❌ Ошибка при создании таблицы:", error);
  }
};

createUsersTable();

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "База работает!", time: result.rows[0].now });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка подключения к БД" });
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

app.listen(port, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${port}`);
});
