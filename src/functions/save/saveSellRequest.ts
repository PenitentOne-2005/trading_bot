import pool from "../../db.js";

const saveSellRequest = async (
  username: string,
  crypto: string,
  amount: number
) => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS sell_requests (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL,
      crypto TEXT NOT NULL,
      amount NUMERIC NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(
    `INSERT INTO sell_requests (username, crypto, amount) VALUES ($1, $2, $3)`,
    [username, crypto, amount]
  );
};

export default saveSellRequest;
