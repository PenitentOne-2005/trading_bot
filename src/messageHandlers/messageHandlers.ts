import { Message } from "node-telegram-bot-api";
import { selectLanguageBoard, MESSAGE_TEXT } from "@/exports.js";
import { sendMessage } from "@/functions/index.js";

const createMessageHandlers = (chatId: number) => {
  return {
    "/start": () =>
      sendMessage(chatId, MESSAGE_TEXT.selectLang, selectLanguageBoard),
  } satisfies Record<string, () => Promise<Message | void>>;
};

export default createMessageHandlers;
