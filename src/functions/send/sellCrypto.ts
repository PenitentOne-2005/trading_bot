import { TronWeb } from "tronweb";
import dotenv from "dotenv";
import BigNumber from "bignumber.js";
import getPrivateKey from "../encrypt/encryptPrivateKey.js";
import getWalletBalance from "../balance/getWalletBalance.js";
import sendMessage from "./sendMessage.js";
import sendCryptoTransaction from "./sendCryptoTransaction.js";

dotenv.config();

const TRONGRID_API_KEY = process.env.TRONGRID_API_KEY!;

const sellCrypto = async (amount: number, chatId: number) => {
  try {
    const privateKey = getPrivateKey();
    if (!privateKey) {
      return sendMessage(chatId, "❌ Приватный ключ не найден");
    }

    const tronWebUser = new TronWeb({
      fullHost: "https://api.trongrid.io",
      headers: { "TRON-PRO-API-KEY": TRONGRID_API_KEY },
      privateKey,
    });

    const balanceRaw = await getWalletBalance();
    if (balanceRaw == null) return;

    const balanceInSun = new BigNumber(tronWebUser.toSun(balanceRaw));
    if (balanceInSun.isLessThan(new BigNumber(tronWebUser.toSun(amount)))) {
      return sendMessage(chatId, "❌ Недостаточно средств на кошельке.");
    }

    await sendCryptoTransaction(tronWebUser, amount, chatId);
  } catch (error: any) {
    console.error(
      "❌ Ошибка при отправке:",
      error?.response?.data || error.message
    );
    sendMessage(
      chatId,
      `❌ Ошибка при продаже: ${JSON.stringify(
        error?.response?.data || error.message
      )}`
    );
  }
};

export default sellCrypto;
