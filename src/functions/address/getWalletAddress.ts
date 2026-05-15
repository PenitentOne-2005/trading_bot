import { pool } from "@/exports.js";
import { IgetWalletAddress } from "./interface.js";

const getWalletAddress: IgetWalletAddress = async (chatId) => {
  try {
    const res = await pool.query(
      "SELECT wallet_address FROM users WHERE telegram_id = $1",
      [chatId]
    );

    if (res.rows.length > 0) {
      return res.rows[0].wallet_address;
    } else {
      throw new Error("❌ Кошелек не найден в базе");
    }
  } catch (error) {
    console.error("❌ Ошибка при получении кошелька:", error);
  }
};

export default getWalletAddress;
