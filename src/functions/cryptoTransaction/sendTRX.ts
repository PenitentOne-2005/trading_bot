import dotenv from "dotenv";
import { SendTRX } from "./interface.js";
import { sendMessage } from "@/functions/index.js";
import waitForConfirmation from "./waitForConfirmation.js";

dotenv.config();

const ESCROW_ADDRESS = process.env.ESCROW_ADDRESS || "";

const sendTRX: SendTRX = async (tronWeb, amount, chatId) => {
  if (!tronWeb.isAddress(ESCROW_ADDRESS)) {
    throw new Error("sendTRX: Invalid escrow address");
  }

  const sunAmount = tronWeb.toSun(Number(amount));

  const tx = await tronWeb.trx.sendTransaction(ESCROW_ADDRESS, sunAmount);

  if (!tx?.result || !tx?.txid) {
    throw new Error(`sendTRX: Transaction failed: ${JSON.stringify(tx)}`);
  }

  try {
    await waitForConfirmation(tronWeb, tx.txid);

    await sendMessage(chatId, `✅ Отправлено ${amount} TRX на эскроу.`);
  } catch (err) {
    await sendMessage(chatId, "❌ Ошибка подтверждения");
  }
};

export default sendTRX;
