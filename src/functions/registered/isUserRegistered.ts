import pool from "../../db.js";
import { IisUserRegistered } from "./interface.js";

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
