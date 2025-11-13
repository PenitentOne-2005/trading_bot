import { IWaitingForAmount } from "./interface.js";
import { menuBack } from "./menu.js";
import { getWalletBalance, sendMessage } from "@/functions/index.js";

const waitingForAmount: IWaitingForAmount = async (props) => {
  const { userState, chatId, text } = props;

  const { crypto, orderType } = userState[chatId];

  const amount = parseFloat(text);

  if (orderType === "sell") {
    const currentCrypto = crypto
      ?.replace("buy_", "")
      .replace("(TRC-20)", "")
      .trim();

    const balance = await getWalletBalance(chatId);

    sendMessage(chatId, `balance: ${balance?.TRX}`);

    if (!balance) {
      return sendMessage(chatId, "❌ Не вдалося отримати баланс.");
    }

    const currentCryptoBalance =
      balance[currentCrypto as "TRX" | "USDT" | "USDC" | "TUSD"];

    sendMessage(chatId, `crypto: ${currentCrypto}`);
    sendMessage(chatId, `currentCryptoBalance: ${currentCryptoBalance}`);

    if (currentCryptoBalance !== amount) {
      return sendMessage(chatId, "❌ Недостатньо коштів.", menuBack);
    }
  }

  if (isNaN(amount) || amount <= 0) {
    return sendMessage(chatId, "❌ Введіть коректну суму.");
  }

  userState[chatId] = {
    ...userState[chatId],
    step: "waitingForPrice",
    amount,
  };

  return sendMessage(
    chatId,
    `💸 Встановіть ціну в UAH за 1 ${crypto}:`,
    menuBack
  );
};

export default waitingForAmount;
