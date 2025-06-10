import { menu } from "./menu.js";
import getWalletAddress from "../address/getWalletAddress.js";
import getWalletBalance from "../balance/getWalletBalance.js";
import sendMessage from "../sendMessage/sendMessage.js";
const showWallet = async (chatId) => {
    const balance = await getWalletBalance();
    const wallet = await getWalletAddress();
    return sendMessage(chatId, `Baш криптовалютний баланс\n Блокчейн: TRON (TRC-20)\n Ваші активи:\n * USDT: ${balance?.usdt} USDT\n * TRX (необхідний для комісій): ${balance?.trx} TRX\n Адреса вашого гаманця:\n ${wallet}\n Доступні дії:`, menu);
};
export default showWallet;
