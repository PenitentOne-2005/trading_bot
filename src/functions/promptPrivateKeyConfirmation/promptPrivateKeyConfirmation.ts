import { MESSAGE_TEXT } from "@/exports.js";
import { Props } from "./interface.js";
import { menu } from "./menu.js";
import { sendMessage } from "@/functions/index.js";

const promptPrivateKeyConfirmation: Props = (chatId) => {
  return sendMessage(chatId, MESSAGE_TEXT.privateKeyText, menu);
};

export default promptPrivateKeyConfirmation;
