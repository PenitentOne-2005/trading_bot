import MESSAGE_TEXT from "../../contentText.js";
import sendMessage from "../sendMessage/sendMessage.js";
import { menu } from "./menu.js";
const promptPrivateKeyConfirmation = (chatId) => {
    return sendMessage(chatId, MESSAGE_TEXT.privateKeyText, menu);
};
export default promptPrivateKeyConfirmation;
