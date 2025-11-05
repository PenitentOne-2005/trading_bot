import { IhandleCryptoSelection } from "./interface.js";
import { sellMenu } from "./sellMenu.js";
import { sendMessage } from "@/functions/index.js";

const handleCryptoSelection: IhandleCryptoSelection = (obj) => {
  const { chatId, text, CRYPTOS, userState } = obj;

  const action = userState[chatId].orderType === "buy" ? "купити" : "продати";

  if (!CRYPTOS.includes(text)) {
    return sendMessage(
      chatId,
      `Виберіть криптовалюту, яку хочете ${action}:`,
      sellMenu
    );
  }

  userState[chatId] = {
    ...userState[chatId],
    step: "waitingForPrice",
    crypto: text,
  };

  return sendMessage(
    chatId,
    `💰 pum Вкажіть суму в ${text}, яку хочете ${action}:`,
    {
      reply_markup: {
        inline_keyboard: [[{ text: "Назад", callback_data: "back" }]],
      },
    }
  );
};

export default handleCryptoSelection;
