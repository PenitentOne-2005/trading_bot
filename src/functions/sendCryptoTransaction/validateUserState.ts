import { allowedKeys, CryptoKey } from "./interface.js";
import { userState } from "../../userState.js";

const validateUserState = (chatId: number) => {
  const { crypto, amount, sumToPay } = userState[chatId] ?? {};

  const toLowerCrypto = crypto?.toLowerCase();
  if (!toLowerCrypto || !allowedKeys.includes(toLowerCrypto as CryptoKey)) {
    throw new Error(
      `❌ Неверная или неуказанная криптовалюта. ${toLowerCrypto}, ${amount} ${sumToPay}`
    );
  }

  if (!amount || isNaN(amount) || amount <= 0) {
    throw new Error("❌ Неверная или неуказанная сумма.");
  }

  return { crypto: toLowerCrypto, amount, sumToPay };
};

export default validateUserState;
