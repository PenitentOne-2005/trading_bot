import { ISaveUser } from "./interface.js";
import pool from "../../db.js";

const saveUser: ISaveUser = async (data) => {
  const { chatId, username, address, encryptedKey, iv } = data;

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        telegram_id BIGINT UNIQUE,
        username TEXT,
        wallet_address TEXT,
        private_key TEXT,
        iv TEXT
      );
    `);

    await pool.query(
      `INSERT INTO users (telegram_id, username, wallet_address, private_key, iv)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (telegram_id) DO UPDATE 
       SET wallet_address = EXCLUDED.wallet_address, 
           private_key = EXCLUDED.private_key, 
           username = EXCLUDED.username,
           iv = EXCLUDED.iv;`,
      [chatId, username, address, encryptedKey, iv]
    );

    console.log(`✅ Пользователь ${chatId} сохранен`);
  } catch (error) {
    console.error("❌ Ошибка при сохранении пользователя:", error);
  }
};

export default saveUser;
