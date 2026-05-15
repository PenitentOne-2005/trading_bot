import { Iregister } from "./interface.js";
import {
  sendMessage,
  saveUser,
  encryptPrivateKey,
  createWallet,
} from "@/functions/index.js";

const registerHandler: Iregister = async (chatId, username) => {
  try {
    const result = await createWallet();
    if (!result) throw new Error("registerHandler: Ошибка создания кошелька.");

    const { privateKey, address } = result;
    const { encryptedKey, iv } = encryptPrivateKey(privateKey);

    await saveUser({ chatId, username, address, encryptedKey, iv });
  } catch (error) {
    console.error("registerHandler: ❌ Ошибка при создании кошелька:", error);
    sendMessage(chatId, "Не удалось создать кошелек. Попробуй позже.");
  }
};

export default registerHandler;
