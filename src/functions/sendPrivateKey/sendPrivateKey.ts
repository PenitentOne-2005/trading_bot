import { Props } from "./interface.js";
import { menu } from "./menu.js";
import { sendMessage, getPrivateKeyFromDB } from "@/functions/index.js";

const sendPrivateKey: Props = async (chatId) => {
  const privateKey = await getPrivateKeyFromDB(chatId);

  if (!privateKey) {
    return sendMessage(chatId, "❌ Ключ не найден.");
  }

  return sendMessage(
    chatId,
    `Надання приватного ключа
    Ваш приватний ключ: ${privateKey}
    Збережіть цей ключ у надійному місці!
    Телеграм бот не є сховищем ключів та не відповідає за їх зберігання.
    Що далі?`,
    menu
  );
};

export default sendPrivateKey;
