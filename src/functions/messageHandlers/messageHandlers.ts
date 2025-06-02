import { Message } from "node-telegram-bot-api";
import MESSAGE_TEXT from "../../contentText.js";
import { selectLanguageBoard } from "../../selectLanguageBoard.js";
import sendMessage from "../sendMessage/sendMessage.js";

const createMessageHandlers = (chatId: number) => {
  return {
    "/start": () =>
      sendMessage(chatId, MESSAGE_TEXT.selectLang, selectLanguageBoard),
  } satisfies Record<string, () => Promise<Message | void>>;
};

export default createMessageHandlers;

// case text === "/next": {
//     userOffsets[chatId] = (userOffsets[chatId] ?? 0) + 1;
//     // return showOrders(userOffsets, chatId);
//   }
