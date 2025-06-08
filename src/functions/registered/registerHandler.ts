import { Iregister } from "./interface.js";
import createWallet from "../createWallet/createWallet.js";
import { saveEncryptedPrivateKey } from "../encrypt/encryptPrivateKey.js";
import saveUser from "../saveUser/saveUser.js";
import sendMessage from "../sendMessage/sendMessage.js";
import isUserRegistered from "../isUserRegistered/isUserRegistered.js";

const registerHandler: Iregister = async (chatId, username) => {
  if (await isUserRegistered(chatId)) {
    return "Кошелек уже создан";
  }

  try {
    const result = await createWallet();
    if (!result) throw new Error("Ошибка создания кошелька.");

    const { privateKey, address } = result;
    const encryptedPrivateKey = saveEncryptedPrivateKey(privateKey);

    await saveUser({ chatId, username, address, encryptedPrivateKey });
  } catch (error) {
    console.error("❌ Ошибка при создании кошелька:", error);
    sendMessage(chatId, "Не удалось создать кошелек. Попробуй позже.");
  }
};

export default registerHandler;
