import dotenv from "dotenv";
import sendMessage from "./sendMessage.js";
dotenv.config();
const ESCROW_ADDRESS = process.env.ESCROW_ADDRESS;
const sendCryptoTransaction = async (tronWebUser, amount, chatId) => {
    try {
        const sunAmount = new BigNumber(tronWebUser.toSun(amount));
        const result = await tronWebUser.trx.sendTransaction(ESCROW_ADDRESS, sunAmount.toNumber());
        console.log("✅ Транзакция отправлена:", result);
        sendMessage(chatId, `✅ Продано ${amount} TRX. Транзакция отправлена.`);
    }
    catch (error) {
        console.error("❌ Ошибка при отправке:", error?.response?.data || error.message);
        sendMessage(chatId, `❌ Ошибка при продаже: ${JSON.stringify(error?.response?.data || error.message)}`);
    }
};
export default sendCryptoTransaction;
