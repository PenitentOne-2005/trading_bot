import { TronWeb } from "tronweb";
import dotenv from "dotenv";
import { CryptoKey } from "@/interface.js";
import { SendCryptoTransaction } from "./interface.js";
import { CONTRACTS } from "./dataTokens.js";
import validateUserState from "./validateUserState.js";
import { pool } from "@/exports.js";
import sendTRC20 from "./sendTRC20.js";
import sendTRX from "./sendTRX.js";
import sendEscrowMessages from "./sendEscrowMessages.js";
import {
  sendMessage,
  getWalletBalance,
  getPrivateKeyFromDB,
} from "@/functions/index.js";

dotenv.config();

const TRONGRID_API_KEY = process.env.TRONGRID_API_KEY!;

const sendCryptoTransaction: SendCryptoTransaction = async (
  chatId,
  orderId,
) => {
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

    const { cryptoValidate, amountValidate, sumToPay } =
      validateUserState(chatId);

    const balanceAmount = balance[cryptoValidate as CryptoKey];

    const sellerQuery = `SELECT chat_id FROM buy_requests WHERE id = $1`;
    const sellerResult = await pool.query(sellerQuery, [orderId]);

    const { chat_id } = sellerResult.rows[0];

    const query = `SELECT * FROM payments WHERE telegram_id = $1`;
    const result = await pool.query(query, [chatId]);

    const metadata = JSON.parse(result.rows[0].metadata);

    if (balanceAmount < amountValidate) {
      await sendEscrowMessages(chatId, chat_id, {
        amountValidate,
        sumToPay,
        orderId,
        metadata,
      });
      return;
    }

    if (cryptoValidate === "trx") {
      return await sendTRX(tronWebUser, amountValidate, chatId);
    }

    if (!CONTRACTS[cryptoValidate])
      throw new Error("❌ Контракт токена не найден.");

    return await sendTRC20({
      tronWebUser,
      cryptoValidate,
      amountValidate,
      sumToPay,
      chatId,
    });
  } catch (error: any) {
    console.error("❌ Ошибка при отправке:", error?.message || error);
    return sendMessage(
      chatId,
      `❌ Ошибка при отправке: ${error?.message || error}`,
    );
  }
};

export default sendCryptoTransaction;
