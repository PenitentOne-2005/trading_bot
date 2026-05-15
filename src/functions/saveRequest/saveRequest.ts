import { pool } from "@/exports.js";
import { ISaveRequest } from "./interface.js";

const saveRequest: ISaveRequest = async (props) => {
  const { orderType, username, chatId, crypto, amount, price } = props;

  const type = orderType === "buy" ? "buy" : "sell";

  try {
    await pool.query(
      `INSERT INTO orders (username, chat_id, crypto, amount, price, type) VALUES ($1, $2, $3, $4, $5, $6)`,
      [username, chatId, crypto, amount, price, type],
    );
  } catch (error) {
    console.error(
      `❌ Ошибка при сохранении заявки на ${
        orderType === "buy" ? "покупку" : "продажу"
      }:`,
      error,
    );
  }
};

export default saveRequest;
