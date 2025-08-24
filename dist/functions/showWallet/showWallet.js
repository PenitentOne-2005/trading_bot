import { menu } from "./menu.js";
import { getWalletAddress, getWalletBalance, sendMessage, } from "../../functions/index.js";
const showWallet = async (chatId) => {
    const balance = await getWalletBalance(chatId);
    const wallet = await getWalletAddress(chatId);
    return sendMessage(chatId, `Baш криптовалютний баланс\n Блокчейн: TRON (TRC-20)\n Ваші активи:\n * USDT: ${balance?.usdt} USDT\n * TRX (необхідний для комісій): ${balance?.trx} TRX\n * USDC: ${balance?.usdc} \n * TUSD: ${balance?.tusd} \n DAI: ${balance?.dai} Адреса вашого гаманця:\n ${wallet}\n Доступні дії:`, menu);
};
export default showWallet;
