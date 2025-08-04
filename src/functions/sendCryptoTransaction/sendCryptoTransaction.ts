import { TronWeb } from "tronweb";
import dotenv from "dotenv";
import { CryptoKey, SendCryptoTransaction } from "./interface.js";
import sendMessage from "../sendMessage/sendMessage.js";
import getWalletBalance from "../balance/getWalletBalance.js";
import { getPrivateKeyFromDB } from "../encrypt/encryptPrivateKey.js";
import { CONTRACTS } from "./dataTokens.js";
import validateUserState from "./validateUserState.js";
import sendTRC20 from "./sendTRC20.js";
import sendTRX from "./sendTRX.js";

dotenv.config();

const TRONGRID_API_KEY = process.env.TRONGRID_API_KEY!;

const sendCryptoTransaction: SendCryptoTransaction = async (chatId) => {
  try {
    const privateKey = await getPrivateKeyFromDB(chatId);
    if (!privateKey)
      throw new Error("❌ Приватный ключ не найден в базе данных.");

    const tronWebUser = new TronWeb({
      fullHost: "https://api.trongrid.io",
      headers: { "TRON-PRO-API-KEY": TRONGRID_API_KEY },
      privateKey,
    });

    const balance = await getWalletBalance(chatId);
    if (!balance) throw new Error("❌ Не удалось получить баланс.");

    const { crypto, amount, sumToPay } = validateUserState(chatId);
    const balanceAmount = balance[crypto as CryptoKey];

    if (balanceAmount < amount) {
      return sendMessage(
        chatId,
        `❌ Недостаточно средств. Доступно: ${balanceAmount}`
      );
    }

    if (crypto === "trx") {
      return await sendTRX(tronWebUser, amount, chatId);
    }

    if (!CONTRACTS[crypto]) throw new Error("❌ Контракт токена не найден.");

    const sendTRC20Props = {
      tronWebUser,
      crypto,
      amount,
      sumToPay,
      chatId,
    };

    return await sendTRC20(sendTRC20Props);
  } catch (error: any) {
    console.error("❌ Ошибка при отправке:", error?.message || error);
    return sendMessage(
      chatId,
      `❌ Ошибка при отправке: ${error?.message || error}`
    );
  }
};

export default sendCryptoTransaction;
