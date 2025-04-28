import { buyCryptoMenu } from "./buyCryptoKeyboard.js";
import sendMessage from "./sendMessage.js";
const buyCrypto = async (msg) => {
    sendMessage(msg.chat.id, "Выберите опцию:", buyCryptoMenu);
};
export default buyCrypto;
