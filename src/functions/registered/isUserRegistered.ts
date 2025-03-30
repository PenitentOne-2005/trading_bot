import { Pool } from "pg";
import dotenv from "dotenv";
import { IisUserRegistered } from "./interface";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const isUserRegistered: IisUserRegistered = async (telegramId) => {
  try {
    const result = await pool.query(
      `SELECT wallet_address FROM users WHERE telegram_id = $1`,
      [telegramId]
    );
    return result.rows.length > 0; // Если есть запись, возвращаем true
  } catch (error) {
    console.error("❌ Ошибка при проверке пользователя:", error);
    return false;
  }
};

export default isUserRegistered;
