import { buyCryptoMenu } from "./buyCryptoKeyboard";
import sendMessage from "./sendMessage";
const buyCrypto = async (msg) => {
    sendMessage(msg.chat.id, "Выберите опцию:", buyCryptoMenu);
};
export default buyCrypto;
