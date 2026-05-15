import { pool } from "@/exports.js";
import { ISaveUser } from "./interface.js";
import { sendMessage } from "@/functions/index.js";

const saveUser: ISaveUser = async (data) => {
  const { chatId, username, address, encryptedKey, iv } = data;

  try {
    await pool.query(
      `
      INSERT INTO users (telegram_id, username, wallet_address, private_key, iv)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (telegram_id) DO UPDATE
      SET
        wallet_address = EXCLUDED.wallet_address,
        private_key = EXCLUDED.private_key,
        iv = EXCLUDED.iv,
        username = EXCLUDED.username
      `,
      [chatId, username, address, encryptedKey, iv],
    );

    console.log(`saveUser: ✅ Пользователь ${chatId} сохранен`);
  } catch (error) {
    console.error("saveUser: ❌ Ошибка при сохранении пользователя:", error);
    sendMessage(chatId, "❌ Ошибка при сохранении пользователя");
  }
};

export default saveUser;
