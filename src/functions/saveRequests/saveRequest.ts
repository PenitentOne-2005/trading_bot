import pool from "../../db.js";
import { ISaveRequest } from "./interface.js";

const saveRequest: ISaveRequest = async (
  type,
  username,
  crypto,
  amount,
  price
) => {
  const tableName = type === "buy" ? "buy_requests" : "sell_requests";

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL,
        crypto TEXT NOT NULL,
        amount NUMERIC NOT NULL,
        price DECIMAL(20,8) NOT NULL,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(
      `INSERT INTO ${tableName} (username, crypto, amount, price) VALUES ($1, $2, $3, $4)`,
      [username, crypto, amount, price]
    );
  } catch (error) {
    console.error(
      `❌ Ошибка при сохранении заявки на ${
        type === "buy" ? "покупку" : "продажу"
      }:`,
      error
    );
  }
};

export default saveRequest;
