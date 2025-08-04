import dotenv from "dotenv";
import { SendTRX } from "./interface.js";
import sendMessage from "../sendMessage/sendMessage.js";

dotenv.config();

const ESCROW_ADDRESS = process.env.ESCROW_ADDRESS || "";

const sendTRX: SendTRX = async (tronWeb, amount, chatId) => {
  const sunAmount = new BigNumber(tronWeb.toSun(amount));
  const result = await tronWeb.trx.sendTransaction(
    ESCROW_ADDRESS,
    sunAmount.toNumber()
  );

  return sendMessage(chatId, `✅ Отправлено ${amount} TRX на эскроу.`);
};

export default sendTRX;
