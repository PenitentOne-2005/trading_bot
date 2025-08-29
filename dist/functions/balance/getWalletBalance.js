import dotenv from "dotenv";
import { TronWeb } from "tronweb";
import { getWalletAddress, sendMessage } from "../../functions/index.js";
dotenv.config();
const tronWeb = new TronWeb({
    fullHost: "https://api.trongrid.io",
});
const USDT_CONTRACT = "0x55d398326f99059fF775485246999027B3197955";
const USDC_CONTRACT = "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d";
const TUSD_CONTRACT = "0x14016e85a25aeb13065688cafb43044c2ef86784";
const DAI_CONTRACT = "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3";
const getWalletBalance = async (chatId) => {
    try {
        const walletAddress = await getWalletAddress(chatId);
        // Баланс TRX
        const trxBalanceSun = await tronWeb.trx.getBalance(walletAddress);
        const trxBalance = trxBalanceSun / 1e6; // 1 TRX = 1_000_000 SUN
        // Баланс TRC20 токенов
        const getTokenBalance = async (tokenAddress, decimals) => {
            const contract = await tronWeb.contract().at(tokenAddress);
            const balance = await contract.balanceOf(walletAddress).call();
            return Number(balance.toString()) / Math.pow(10, decimals);
        };
        const [usdt, usdc, tusd, dai] = await Promise.all([
            getTokenBalance(USDT_CONTRACT, 6),
            getTokenBalance(USDC_CONTRACT, 6),
            getTokenBalance(TUSD_CONTRACT, 18),
            getTokenBalance(DAI_CONTRACT, 18),
        ]);
        return {
            trx: trxBalance,
            usdt,
            usdc,
            tusd,
            dai,
        };
    }
    catch (error) {
        console.error("❌ Ошибка при получении баланса:", error.message);
        sendMessage(chatId, "❌ Ошибка при получении баланса");
        return null;
    }
};
export default getWalletBalance;
