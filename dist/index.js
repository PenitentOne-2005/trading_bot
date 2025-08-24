import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { pool } from "./exports.js";
const app = express();
app.use(express.json());
app.use(cors());
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const createUsersTable = async () => {
    let retries = 5;
    while (retries) {
        try {
            await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          telegram_id BIGINT UNIQUE NOT NULL,
          username TEXT,
          wallet_address TEXT NOT NULL,
          private_key TEXT NOT NULL,
          iv TEXT
        )
      `);
            console.log("✅ Таблица users проверена/создана");
            break;
        }
        catch (error) {
            console.error("❌ Ошибка при создании таблицы:", error);
            retries--;
            console.log(`⏳ Повторная попытка через 5 секунд... Осталось: ${retries}`);
            await wait(5000);
        }
    }
};
createUsersTable();
