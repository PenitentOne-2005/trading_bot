import { buyCryptoKeyboard } from "./buyCryptoKeyboard.js";
import sendMessage from "../sendMessage/sendMessage.js";
const buyCryptoMenu = async (msg) => {
    sendMessage(msg.chat.id, "Выберите опцию:", buyCryptoKeyboard);
};
export default buyCryptoMenu;
