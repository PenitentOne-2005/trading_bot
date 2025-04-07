import { mainMenu } from "./commandKeyboard";
import { IprocessUserMessage } from "./interface";
import sendMessage from "./sendMessage";

const processUserMessage: IprocessUserMessage = (msg) => {
  const { chat, text } = msg;
  if (!text?.startsWith("/")) sendMessage(chat.id, `Ты написал: ${text}`);

  if (text === "💸 Продать крипту") {
    sendMessage(chat.id, "Введи сумму и валюту, которую хочешь продать.");
  } else if (text === "💰 Купить крипту") {
    sendMessage(chat.id, "Введи сумму и валюту, которую хочешь купить.");
  } else if (text === "🔙 Назад") {
    sendMessage(chat.id, "Основное меню:", mainMenu);
  }
};

export default processUserMessage;
