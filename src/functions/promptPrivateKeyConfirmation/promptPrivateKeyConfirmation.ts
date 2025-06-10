import MESSAGE_TEXT from "../../contentText.js";
import sendMessage from "../sendMessage/sendMessage.js";
import { Props } from "./interface.js";
import { menu } from "./menu.js";

const promptPrivateKeyConfirmation: Props = (chatId) => {
  return sendMessage(chatId, MESSAGE_TEXT.privateKeyText, menu);
};

export default promptPrivateKeyConfirmation;
