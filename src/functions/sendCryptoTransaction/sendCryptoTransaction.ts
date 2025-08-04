import { TronWeb } from "tronweb";
import dotenv from "dotenv";
import sendMessage from "../sendMessage/sendMessage.js";
import { userState } from "../../userState.js";
import getWalletBalance from "../balance/getWalletBalance.js";
import { getPrivateKeyFromDB } from "../encrypt/encryptPrivateKey.js";
import { SendMessageOptions } from "node-telegram-bot-api";

dotenv.config();

const ESCROW_ADDRESS = process.env.ESCROW_ADDRESS || "";
const TRONGRID_API_KEY = process.env.TRONGRID_API_KEY!;

const allowedKeys = ["trx", "usdt", "usdc", "tusd", "dai"] as const;
type CryptoKey = (typeof allowedKeys)[number];

const menu: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "📃 Пiдтвердити отримання грошей",
          callback_data: "agree_get",
        },
      ],
      [{ text: "ℹ️ Моï замовлення", callback_data: "myOrders" }],
    ],
  },
};

const sendCryptoTransaction = async (chatId: number) => {
  try {
    const privateKey = await getPrivateKeyFromDB(chatId); // достаешь приватник из БД

    if (!privateKey) {
      throw new Error("❌ Приватный ключ не найден в базе данных.");
    }

    const tronWebUser = new TronWeb({
      fullHost: "https://api.trongrid.io",
      headers: { "TRON-PRO-API-KEY": TRONGRID_API_KEY },
      privateKey,
    });

    const balance = await getWalletBalance(chatId);
    if (!balance) {
      throw new Error("❌ Не удалось получить баланс.");
    }

    const { crypto, amount, sumToPay } = userState[chatId] ?? {};
    const toLowerCrypto = crypto?.toLowerCase();

    if (!toLowerCrypto || !allowedKeys.includes(toLowerCrypto as CryptoKey)) {
      throw new Error("❌ Неверная или неуказанная криптовалюта.");
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      throw new Error("❌ Неверная или неуказанная сумма.");
    }

    const balanceAmount = balance[toLowerCrypto as CryptoKey];
    if (balanceAmount < amount) {
      return sendMessage(
        chatId,
        `❌ Недостаточно средств. Доступно: ${balanceAmount}`
      );
    }

    // отправляем TRX
    if (toLowerCrypto === "trx") {
      const sunAmount = new BigNumber(tronWebUser.toSun(amount));
      const result = await tronWebUser.trx.sendTransaction(
        ESCROW_ADDRESS,
        sunAmount.toNumber()
      );

      console.log("✅ Транзакция TRX отправлена:", result);
      return sendMessage(chatId, `✅ Отправлено ${amount} TRX на эскроу.`);
    }

    // карта контрактов токенов TRC-20
    const CONTRACTS: Record<string, string> = {
      usdt: "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj",
      usdc: "TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8",
      tusd: "TMwFHYXLJaRUPeW6421aqXL4ZEzPRFGkGT",
      dai: "TCFLL5dx5ZJdKnWuesXxi1VPwjLVmWZZy9",
    };

    const TOKEN_DECIMALS: Record<string, number> = {
      usdt: 6,
      usdc: 6,
      tusd: 18,
      dai: 18,
    };

    const tokenAddress = CONTRACTS[toLowerCrypto];
    const decimals = TOKEN_DECIMALS[toLowerCrypto];

    if (!tokenAddress) {
      throw new Error("❌ Контракт токена не найден.");
    }

    const contract = await tronWebUser.contract().at(tokenAddress);
    const amountWithDecimals = new BigNumber(amount).multipliedBy(
      10 ** decimals
    );

    const transferTx = await contract.methods
      .transfer(ESCROW_ADDRESS, amountWithDecimals.toFixed())
      .send();

    return sendMessage(
      chatId,
      `✅ Успiшно! Криптовалюта перемещiна в ескроу. Очiкує підтвердження вiд покупця про вiдправку коштiв.\n
      
      Оголошення #1001
      Продали: ${amount}
      Сума: ${sumToPay}
      Статус: Виконується
      Реквiзити для оплати переданi покупцевi.
      Термін дiï: 30хв
      ! На цьому етапi угоду скасувати неможливо, вона проходить через блокчейн.`,
      menu
    );
  } catch (error: any) {
    console.error("❌ Ошибка при отправке:", error?.message || error);
    return sendMessage(
      chatId,
      `❌ Ошибка при отправке: ${error?.message || error}`
    );
  }
};

export default sendCryptoTransaction;
