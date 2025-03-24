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
  username: string,
  walletAddress: string,
  privateKey: string
) => {
  try {
    await pool.query(
      `INSERT INTO users (telegram_id, username, wallet_address, private_key)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (telegram_id) DO UPDATE 
       SET wallet_address = EXCLUDED.wallet_address, 
           private_key = EXCLUDED.private_key, 
           username = EXCLUDED.username;`,
      [telegramId, username, walletAddress, privateKey]
    );
    console.log(`✅ Пользователь ${telegramId} сохранен`);
  } catch (error) {
    console.error("❌ Ошибка при сохранении пользователя:", error);
  }
};
