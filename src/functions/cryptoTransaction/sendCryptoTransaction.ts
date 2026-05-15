import { TronWeb } from "tronweb";
import dotenv from "dotenv";
import pool from "@/db.js";
import { SendCryptoTransaction } from "./interface.js";
import { CONTRACTS } from "./dataTokens.js";
import { getPrivateKeyFromDB } from "@/functions/index.js";
import validateUserState from "./validateUserState.js";
import sendTRC20 from "./sendTRC20.js";
import sendTRX from "./sendTRX.js";

dotenv.config();

const TRONGRID_API_KEY = process.env.TRONGRID_API_KEY!;

const sendCryptoTransaction: SendCryptoTransaction = async (orderId) => {
  try {
    const orderRes = await pool.query(`SELECT * FROM orders WHERE id = $1`, [
      orderId,
    ]);
    const order = orderRes.rows[0];
    if (!order) throw new Error("sendCryptoTransaction: Ордер не найден");

    let senderChatId: number;
    let receiverChatId: number;

    if (order.type === "sell") {
      // Ордер "sell": создатель ордера продаёт
      senderChatId = order.chat_id; // владелец средств
      receiverChatId = order.buyer_chat_id; // покупатель (тот, кто выбрал ордер)
    } else {
      // Ордер "buy": создатель ордера хочет купить, продавец отправляет крипту
      senderChatId = order.buyer_chat_id; // продавец (тот, кто выбрал ордер)
      receiverChatId = order.chat_id; // покупатель (создатель ордера)
    }

    const privateKey = await getPrivateKeyFromDB(senderChatId);
    if (!privateKey)
      throw new Error("sendCryptoTransaction: ❌ Приватный ключ не найден");

    const tronWebUser = new TronWeb({
      fullHost: "https://api.shasta.trongrid.io",
      headers: { "TRON-PRO-API-KEY": TRONGRID_API_KEY },
      privateKey,
    });

    const { cryptoValidate, amountValidate, sumToPay } =
      await validateUserState(orderId);

    if (cryptoValidate === "TRX") {
      return await sendTRX(tronWebUser, amountValidate, senderChatId);
    }

    if (!CONTRACTS[cryptoValidate])
      throw new Error("sendCryptoTransaction: ❌ Контракт токена не найден");

    return await sendTRC20({
      tronWebUser,
      cryptoValidate,
      amountValidate,
      sumToPay,
      chatId: senderChatId,
      orderId,
    });
  } catch (error: any) {
    console.error(
      "sendCryptoTransaction: ❌ Ошибка при отправке - ",
      error?.message || error,
    );
  }
};

export default sendCryptoTransaction;
