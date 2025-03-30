import sendMessage from "../send/sendMessage";
import getWalletBalance from "./getWalletBalance";
import { IshowWalletBalance } from "./interface";

const showWalletBalance: IshowWalletBalance = async (msg) => {
  const { chat } = msg;
  try {
    const balance = await getWalletBalance();
    sendMessage(chat.id, `Ваш баланс: ${balance} TRX`);
  } catch (error) {
    console.error("❌ Ошибка при получении баланса:", error);
    sendMessage(chat.id, "Не удалось получить баланс. Попробуй позже.");
  }
};

export default showWalletBalance;
