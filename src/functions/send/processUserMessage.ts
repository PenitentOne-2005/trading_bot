import { IprocessUserMessage } from "./interface";
import sendMessage from "./sendMessage";

const processUserMessage: IprocessUserMessage = (msg) => {
  const { chat, text } = msg;
  if (!text?.startsWith("/")) sendMessage(chat.id, `Ты написал: ${text}`);
};

export default processUserMessage;
