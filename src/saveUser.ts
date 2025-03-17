import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const saveUser = async (
  telegramId: number,
  walletAddress: string,
  privateKey: string
) => {
  try {
    await pool.query(
      `
      INSERT INTO users (telegram_id, wallet_address, private_key)
      VALUES ($1, $2, $3)
      ON CONFLICT (telegram_id) DO NOTHING
      `,
      [telegramId, walletAddress, privateKey]
    );
    console.log(`✅ Пользователь ${telegramId} сохранён`);
  } catch (error) {
    console.error("❌ Ошибка при сохранении пользователя:", error);
  }
};
