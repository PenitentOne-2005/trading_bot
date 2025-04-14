import { TronWeb } from "tronweb";
import dotenv from "dotenv";
import BigNumber from "bignumber.js";
import getPrivateKey from "../encrypt/encryptPrivateKey";
import getWalletBalance from "../balance/getWalletBalance";
import sendMessage from "./sendMessage";

dotenv.config();

const ESCROW_ADDRESS = process.env.ESCROW_ADDRESS;
const TRONGRID_API_KEY = process.env.TRONGRID_API_KEY;
if (!ESCROW_ADDRESS) {
  console.error(
    "❌ BOT_TOKEN не найден! Убедитесь, что он задан в .env файле."
  );
  process.exit(1);
}

const sellCrypto = async (amount: number, chatId: number) => {
  try {
    const privateKey = getPrivateKey();
    if (!privateKey) return sendMessage(chatId, "❌ Приватный ключ не найден");

    const tronWebUser = new TronWeb({
      fullHost: "https://api.trongrid.io",
      headers: {
        "TRON-PRO-API-KEY": TRONGRID_API_KEY,
      },
      privateKey,
    });

    const sunAmount = new BigNumber(tronWebUser.toSun(amount));

    const balanceRaw = await getWalletBalance();
    if (balanceRaw == null) return;

    const balanceInSun = new BigNumber(tronWebUser.toSun(balanceRaw));
    if (balanceInSun.isLessThan(sunAmount)) {
      return sendMessage(chatId, "❌ Недостаточно средств на кошельке.");
    }

    const result = await tronWebUser.trx.sendTransaction(
      ESCROW_ADDRESS,
      sunAmount.toNumber()
    );

    console.log("✅ Транзакция отправлена:", result);
    sendMessage(chatId, `✅ Продано ${amount} TRX. Транзакция отправлена.`);
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
