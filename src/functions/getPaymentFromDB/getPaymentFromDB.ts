import pool from "../../db.js";
import { IgetPaymentFromDB } from "./interface.js";

const getPaymentFromDB: IgetPaymentFromDB = async (chatId) => {
  try {
    const { rows } = await pool.query(
      `SELECT metadata FROM payments WHERE telegram_id = $1`,
      [chatId]
    );

    if (rows.length > 0) {
      const payments = JSON.parse(rows[0].metadata);

      return payments.name ? "IBAN" : "Картка";
    }

    return null;
  } catch (error) {
    console.error("❌ Ошибка при получении payment метода:", error);
    return null;
  }
};

export default getPaymentFromDB;
