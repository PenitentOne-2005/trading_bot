import { pool } from "@/exports.js";
import { HandleConfirmFiat } from "./interface.js";
import quickBlocking from "./quickBlocking.js";
import sendingCrypto from "./sendingCrypto.js";

const handleConfirmFiat: HandleConfirmFiat = async (chatId, orderId) => {
  const client = await pool.connect();

  const orderData = await quickBlocking({ client, orderId, chatId });

  if (!orderData) return;

  await sendingCrypto({ client, orderId, orderData, chatId });
};

export default handleConfirmFiat;
