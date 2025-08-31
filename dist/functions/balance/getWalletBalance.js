import dotenv from "dotenv";
import { TronWeb } from "tronweb";
import { getWalletAddress, sendMessage } from "../../functions/index.js";
dotenv.config();
const tronWeb = new TronWeb({
    fullHost: "https://api.trongrid.io",
});
const USDT_CONTRACT = "TLa2f6VPqDgRE67v1736s7bJ8Ray5wYjU7";
const USDC_CONTRACT = "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj";
const TUSD_CONTRACT = "TUpMhErZL2fhh4sVNULAbNKLokS4GjC1F4";
const getWalletBalance = async (chatId) => {
    try {
        const walletAddress = await getWalletAddress(chatId);
        // Баланс TRX
        const trxBalanceSun = await tronWeb.trx.getBalance(walletAddress);
        const trxBalance = trxBalanceSun / 1e6; // 1 TRX = 1_000_000 SUN
        // Баланс TRC20 токенов
        const getTokenBalance = async (tokenAddress, decimals) => {
            const contract = await tronWeb.contract().at(tokenAddress); // без toHex
            const balance = await contract.balanceOf(walletAddress).call();
            return Number(balance.toString()) / Math.pow(10, decimals);
        };
        const [usdt, usdc, tusd] = await Promise.all([
            getTokenBalance(USDT_CONTRACT, 6),
            getTokenBalance(USDC_CONTRACT, 6),
            getTokenBalance(TUSD_CONTRACT, 18), // TUSD тоже 6 знаков
        ]);
        return {
            trx: trxBalance,
            usdt,
            usdc,
            tusd,
        };
    }
    catch (error) {
        console.error("❌ Ошибка при получении баланса:", error.message);
        sendMessage(chatId, "❌ Ошибка при получении баланса");
        return null;
    }
};
export default getWalletBalance;
