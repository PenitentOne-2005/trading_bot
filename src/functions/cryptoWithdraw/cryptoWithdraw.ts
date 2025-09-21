import { TronWeb } from "tronweb";
import { CryptoWithdraw } from "./interface.js";
import { menu } from "./menu.js";
import { withdrawHandlers } from "./withDrawToken.js";
import {
  sendMessage,
  getWalletAddress,
  getPrivateKeyFromDB,
} from "@/functions/index.js";

const cryptoWithdraw: CryptoWithdraw = async (props) => {
  const { userState, chatId, text } = props;
  const { crypto } = userState[chatId];

  if (!crypto) {
    sendMessage(chatId, "❌ Криптовалюта не выбрана", menu);
    return;
  }

  const cryptoKey = crypto as keyof typeof withdrawHandlers;

  const tronWeb = new TronWeb({
    fullHost: "https://api.trongrid.io",
    privateKey: await getPrivateKeyFromDB(chatId),
  });

  const fromAddress = await getWalletAddress(chatId);
  const amount = parseFloat(text);

  try {
    const handler = withdrawHandlers[cryptoKey];
    if (!handler) {
      sendMessage(
        chatId,
        "❌ Функція виводу для цієї криптовалюти не налаштована",
        menu
      );

      return;
    }

    const receipt = await handler({
      userState,
      chatId,
      text,
      tronWeb,
      fromAddress,
      amount,
    });

    receipt?.result
      ? sendMessage(chatId, `✅ Успешно отправлено ${amount} ${crypto}`, menu)
      : sendMessage(chatId, `❌ Ошибка при отправке ${crypto}`, menu);
  } catch (error) {
    console.error("Ошибка перевода:", error);
    sendMessage(chatId, "❌ Транзакция не удалась. Попробуйте позже.", menu);
  }
};

export default cryptoWithdraw;
