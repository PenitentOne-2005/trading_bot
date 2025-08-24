import { sendMessage, saveUser, encryptPrivateKey, createWallet, } from "../../functions";
const registerHandler = async (chatId, username) => {
    try {
        const result = await createWallet();
        if (!result)
            throw new Error("Ошибка создания кошелька.");
        const { privateKey, address } = result;
        const { encryptedKey, iv } = encryptPrivateKey(privateKey);
        await saveUser({ chatId, username, address, encryptedKey, iv });
    }
    catch (error) {
        console.error("❌ Ошибка при создании кошелька:", error);
        sendMessage(chatId, "Не удалось создать кошелек. Попробуй позже.");
    }
};
export default registerHandler;
