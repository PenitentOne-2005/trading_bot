import express, { Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Подключение к PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Проверка подключения к базе данных
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "База работает!", time: result.rows[0].now });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка подключения к БД" });
  }
});

// Основной сервер (Простой рендеринг на "/")
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

// Запуск сервера на одном порту (3000)
app.listen(port, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${port}`);
});
