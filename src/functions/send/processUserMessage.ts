import { userState } from "../../userState";
import { mainMenu } from "./commandKeyboard";
import { IprocessUserMessage } from "./interface";
import sellCrypto from "./sellCrypto";
import sendMessage from "./sendMessage";

const processUserMessage: IprocessUserMessage = (msg) => {
  const { chat, text } = msg;
  const chatId = chat.id;

  if (userState[chatId] === "waitingForSellAmount") {
    const amount = parseFloat(text || "");
    if (isNaN(amount) || amount <= 0) {
      return sendMessage(chatId, "❌ Введи корректную сумму.");
    }

    sellCrypto(amount, chatId);
    userState[chatId] = "idle"; // Сброс состояния
    return;
  }

  if (!text?.startsWith("/")) {
    return sendMessage(chatId, `Ты написал: ${text}`);
  }

  if (text === "/sellCrypto") {
    userState[chatId] = "waitingForSellAmount";
    sendMessage(chatId, "💰 Введи сумму TRX, которую хочешь продать:");
  } else if (text === "/back") {
    userState[chatId] = "idle";
    sendMessage(chatId, "🔙 Главное меню:", mainMenu);
  }
};

export default processUserMessage;
