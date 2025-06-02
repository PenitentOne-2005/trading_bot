import { Props } from "./interface.js";
import sendMessage from "../sendMessage/sendMessage.js";

const processBuyCryptoSelection: Props = (data, chatId, userState) => {
  const crypto = data?.replace("buy_", "") + " (TRC-20)";

  userState[chatId] = {
    ...userState[chatId],
    step: "waitingForAmount",
    crypto,
  };

  sendMessage(chatId, `💰 Вкажіть суму в ${crypto}, яку хочете купити:`, {
    reply_markup: {
      inline_keyboard: [[{ text: "Назад", callback_data: "back" }]],
    },
  });
};

export default processBuyCryptoSelection;
