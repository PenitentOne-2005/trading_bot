import {
  allowedKeys,
  CryptoKey,
  NormalizeCrypto,
  ValidateUserState,
} from "./interface.js";
import { userState } from "@/exports.js";

const normalizeCrypto: NormalizeCrypto = (cryptoRaw) => {
  return cryptoRaw?.toLowerCase().split(" ")[0].trim();
};

const validateUserState: ValidateUserState = (chatId) => {
  const { crypto, amount, sumToPay } = userState[chatId] ?? {};
  const toLowerCrypto = normalizeCrypto(crypto);

  if (!toLowerCrypto || !allowedKeys.includes(toLowerCrypto as CryptoKey)) {
    throw new Error(
      `❌ Неверная или неуказанная криптовалюта. ${toLowerCrypto}, ${amount} ${sumToPay}`
    );
  }

  if (!amount || isNaN(amount) || amount <= 0) {
    throw new Error("❌ Неверная или неуказанная сумма.");
  }

  return { cryptoValidate: toLowerCrypto, amountValidate: amount, sumToPay };
};

export default validateUserState;
