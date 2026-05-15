import dotenv from "dotenv";
import { TronWeb } from "tronweb";
import { SendingCrypto } from "./interface.js";
import { handleConfirmFiatMenu } from "./menu";
import { agreeGetKeyBoard } from "@/exports.js";
import {
  getWalletAddress,
  sendMessage,
  waitForConfirmation,
} from "@/functions/index.js";
import sendFromEscrowTRX from "./sendFromEscrowTRX";
import sendFromEscrowTRC20 from "./sendFromEscrowTRC20";

dotenv.config();

const tronWebEscrow = new TronWeb({
  fullHost: "https://api.shasta.trongrid.io",
  headers: { "TRON-PRO-API-KEY": process.env.TRONGRID_API_KEY },
  privateKey: process.env.ESCROW_KEY || "",
});

const sendingCrypto: SendingCrypto = async (props) => {
  let { client, orderId, orderData, chatId } = props;

  try {
    const { buyer_chat_id, chat_id, amount, price, crypto, type } = orderData;

    const sumToPay = Number(amount) * Number(price);

    let receiverChatId;

    if (type === "sell") {
      // продают → получатель покупатель
      receiverChatId = buyer_chat_id;
    } else {
      // покупают → получатель создатель ордера
      receiverChatId = chat_id;
    }

    const receiverWallet = await getWalletAddress(receiverChatId);

    if (!receiverWallet) {
      throw new Error("sendingCrypto: Кошелек не найден");
    }

    const cryptoWithoutPrefix = crypto.replace(/\s*\(.*\)/, "");

    let txid;

    if (cryptoWithoutPrefix === "TRX") {
      txid = await sendFromEscrowTRX(amount, receiverWallet, tronWebEscrow);
    } else {
      txid = await sendFromEscrowTRC20(
        cryptoWithoutPrefix,
        amount,
        receiverWallet,
        tronWebEscrow,
      );
    }

    await client.query(
      `
      UPDATE orders
      SET txid = $1
      WHERE id = $2
      AND txid IS NULL
      `,
      [txid, orderId],
    );

    await waitForConfirmation(tronWebEscrow, txid);

    await client.query(
      `
      UPDATE orders
      SET status = 'completed'
      WHERE id = $1 AND status = 'processing'
      `,
      [orderId],
    );

    // уведомления
    await sendMessage(
      receiverChatId,
      `✅ Успiшно! Продавец пiдтвердив отримання фiатного платежу.

Оголошення #${orderId}
Куплено: ${amount}
Сума: ${sumToPay}
Комісія за послугу: 1 ${crypto} (0.5%)
Статус: Завершено
Кошти успiшно переведенi на ваш гаманець!
Що далi?`,
      handleConfirmFiatMenu,
    );

    await sendMessage(
      chatId,
      `Успiшно! Ескроу вiдправив криптовалюту покупцевi.

Оголошення #${orderId}
Продано: ${amount} ${crypto}
Сума: ${sumToPay}
Комiсiя за послугу: 1 ${crypto} (0.5%)
Статус: Завершено
Що далi?`,
      agreeGetKeyBoard,
    );
  } catch (error) {
    console.error(
      "sendingCrypto: Сталася помилка при відправці криптовалюти:",
      error,
    );

    // если отправка не удалась — возвращаем статус
    await client.query(
      `
      UPDATE orders
      SET status = 'waiting'
      WHERE id = $1 AND status = 'processing'
      `,
      [orderId],
    );

    return sendMessage(
      chatId,
      "❌ Сталася помилка при відправці криптовалюти. Спробуйте пізніше.",
    );
  }
};

export default sendingCrypto;
