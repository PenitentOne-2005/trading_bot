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

const saveSellRequest = async (
  userId: number,
  crypto: string,
  amount: number
) => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS sell_requests (
      id SERIAL PRIMARY KEY,
      user_id BIGINT NOT NULL,
      crypto TEXT NOT NULL,
      amount NUMERIC NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(
    `INSERT INTO sell_requests (user_id, crypto, amount) VALUES ($1, $2, $3)`,
    [userId, crypto, amount]
  );
};

export default saveSellRequest;
