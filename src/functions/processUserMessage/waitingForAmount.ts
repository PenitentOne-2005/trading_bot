import sendMessage from "../sendMessage/sendMessage.js";
import { IWaitingForAmount } from "./interface.js";

const waitingForAmount: IWaitingForAmount = (props) => {
  const { userState, currentState, chatId, text } = props;

  const amount = parseFloat(text);
  if (isNaN(amount) || amount <= 0) {
    return sendMessage(chatId, "❌ Введіть коректну суму.");
  }
  userState[chatId] = {
    ...currentState,
    step: "waitingForPrice",
    amount,
  };
  return sendMessage(
    chatId,
    `💸 Встановіть ціну в UAH за 1 ${userState[chatId].crypto}:`,
    {
      reply_markup: {
        inline_keyboard: [[{ text: "Назад", callback_data: "back" }]],
      },
    }
  );
};

export default waitingForAmount;
