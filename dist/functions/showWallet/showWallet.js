import { menu } from "./menu.js";
import { getWalletAddress, getWalletBalance, sendMessage, } from "../../functions/index.js";
const showWallet = async (chatId) => {
    const balance = await getWalletBalance(chatId);
    const wallet = await getWalletAddress(chatId);
    return sendMessage(chatId, `Baш криптовалютний баланс
      Блокчейн: TRON (TRC-20)
      Ваші активи:
      * USDT: ${balance?.usdt} USDT
      * TRX (необхідний для комісій): ${balance?.trx} TRX
      * USDC: ${balance?.usdc} USDC
      * TUSD: ${balance?.tusd} TUSD
      * DAI: ${balance?.dai} 
     Адреса вашого гаманця:
     ${wallet}
    Доступні дії:`, menu);
};
export default showWallet;
