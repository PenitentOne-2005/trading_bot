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

export async function getWalletAddress() {
  try {
    const res = await pool.query("SELECT wallet_address FROM users LIMIT 1");
    if (res.rows.length > 0) {
      const wallet = JSON.parse(res.rows[0].wallet_address);

      return wallet.address.hex;
    } else {
      throw new Error("❌ Кошелек не найден в базе");
    }
  } catch (error) {
    console.error("❌ Ошибка при получении кошелька:", error);
  }
}
