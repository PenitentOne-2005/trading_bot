import pool from "../../db";
import { IgetWalletAddress } from "./interface";

const getWalletAddress: IgetWalletAddress = async () => {
  try {
    const res = await pool.query("SELECT wallet_address FROM users LIMIT 1");

    if (res.rows.length > 0) {
      const wallet = JSON.parse(res.rows[0].wallet_address);

      return wallet.hex;
    } else {
      throw new Error("❌ Кошелек не найден в базе");
    }
  } catch (error) {
    console.error("❌ Ошибка при получении кошелька:", error);
  }
};

export default getWalletAddress;
