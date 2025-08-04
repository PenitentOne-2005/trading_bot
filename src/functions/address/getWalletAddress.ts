import pool from "../../db.js";
import { IgetWalletAddress } from "./interface.js";

const getWalletAddress: IgetWalletAddress = async (chatId) => {
  try {
    const res = await pool.query(
      "SELECT wallet_address FROM users WHERE telegram_id = $1",
      [chatId]
    );

    if (res.rows.length > 0) {
      const wallet = JSON.parse(res.rows[0].wallet_address);
      return wallet.base58;
    } else {
      throw new Error("❌ Кошелек не найден в базе");
    }
  } catch (error) {
    console.error("❌ Ошибка при получении кошелька:", error);
  }
};

export default getWalletAddress;
