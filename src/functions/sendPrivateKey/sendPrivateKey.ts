import { Props } from "./interface.js";
import { menu } from "./menu.js";
import { sendMessage, getPrivateKeyFromDB } from "@/functions";

const sendPrivateKey: Props = async (chatId) => {
  const privateKey = await getPrivateKeyFromDB(chatId);

  if (!privateKey) {
    return sendMessage(chatId, "❌ Ключ не найден.");
  }

  return sendMessage(
    chatId,
    `Надання приватного ключа\n Ваш приватний ключ: ${privateKey}\n Збережіть цей ключ у надійному місці!\n Телеграм бот не є сховищем ключів та не відповідає за їх зберігання.\n Що далі?`,
    menu
  );
};

export default sendPrivateKey;
