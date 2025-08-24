import { IhandleCryptoSelection } from "./interface.js";
import { sellMenu } from "./sellMenu.js";
import { sendMessage } from "@/functions/index.js";

const handleCryptoSelection: IhandleCryptoSelection = (obj) => {
  const { chatId, text, CRYPTOS, userState } = obj;

  if (!CRYPTOS.includes(text)) {
    return sendMessage(
      chatId,
      "Виберіть криптовалюту, яку хочете купити:",
      sellMenu
    );
  }

  userState[chatId] = {
    ...userState[chatId],
    step: "waitingForPrice",
    crypto: text,
  };

  return sendMessage(chatId, `💰 Вкажіть суму в ${text}, яку хочете купити:`, {
    reply_markup: {
      inline_keyboard: [[{ text: "Назад", callback_data: "back" }]],
    },
  });
};

export default handleCryptoSelection;
