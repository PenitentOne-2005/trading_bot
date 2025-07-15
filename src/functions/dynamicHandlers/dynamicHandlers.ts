import { Message } from "node-telegram-bot-api";
import pool from "../../db.js";
import { CallbackProps } from "../../interface.js";
import { userState } from "../../userState.js";
import processBuyCryptoSelection from "../processBuyCryptoSelection/processBuyCryptoSelection.js";
import sendMessage from "../sendMessage/sendMessage.js";

const dynamicHandlers: {
  [key: string]: (
    data: string,
    props: CallbackProps
  ) => void | Promise<void | Message>;
} = {
  buy_: (data, props) => {
    processBuyCryptoSelection(data, props.chatId, userState);
  },

  select_order_: async (data, { chatId }) => {
    const orderId = data.replace("select_order_", "");
    const action = userState[chatId]?.currentDb;

    if (!action) {
      return sendMessage(chatId, "⚠️ Невідома таблиця заявок.");
    }

    const query = `SELECT * FROM ${action} WHERE id = $1`;
    const result = await pool.query(query, [orderId]);

    if (result.rows.length === 0) {
      return sendMessage(chatId, "⚠️ Заявку не знайдено.");
    }

    const { amount, crypto, price } = result.rows[0];

    const sumToPay = amount * price;

    const actionText =
      action === "buy_requests"
        ? `🟢 Пiдтвердження\nВи збираєтесь *купити* ${amount} ${crypto} за ${sumToPay} UAH`
        : `🔴 Пiдтвердження\nВи збираєтесь *продати* ${amount} ${crypto} за ${sumToPay} UAH`;

    await sendMessage(chatId, `📝 ${actionText} #${orderId}`);
  },
};

export default dynamicHandlers;
