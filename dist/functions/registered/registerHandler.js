import createWallet from "../create/createWallet";
import { saveEncryptedPrivateKey } from "../encrypt/encryptPrivateKey";
import saveUser from "../save/saveUser";
import sendMessage from "../send/sendMessage";
import isUserRegistered from "./isUserRegistered";
const registerHandler = async (msg) => {
    const { chat, from } = msg;
    const username = from?.username || "Неизвестный";
    if (await isUserRegistered(chat.id)) {
        return sendMessage(chat.id, "Ты уже зарегистрирован! 🚀");
    }
    try {
        const result = await createWallet();
        if (!result)
            throw new Error("Ошибка создания кошелька.");
        const { privateKey, address } = result;
        const encryptedPrivateKey = saveEncryptedPrivateKey(privateKey);
        await saveUser({ chat, username, address, encryptedPrivateKey });
        sendMessage(chat.id, `Твой кошелек был создан: ${address.base58}`);
    }
    catch (error) {
        console.error("❌ Ошибка при создании кошелька:", error);
        sendMessage(chat.id, "Не удалось создать кошелек. Попробуй позже.");
    }
};
export default registerHandler;
