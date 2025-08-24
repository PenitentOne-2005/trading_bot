import { MESSAGE_TEXT } from "../../exports.js";
import { menu } from "./menu.js";
import { sendMessage } from "../../functions";
const promptPrivateKeyConfirmation = (chatId) => {
    return sendMessage(chatId, MESSAGE_TEXT.privateKeyText, menu);
};
export default promptPrivateKeyConfirmation;
