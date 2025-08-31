import dotenv from "dotenv";
import { TronWeb } from "tronweb";
import { IgetWalletBalance } from "./interface.js";
import CONTRACTS from "./CONTRACTS.js";
import { getWalletAddress, sendMessage } from "@/functions/index.js";

dotenv.config();

const tronWeb = new TronWeb({
  fullHost: "https://api.trongrid.io",
});

const getWalletBalance: IgetWalletBalance = async (chatId) => {
  try {
    const walletAddress = await getWalletAddress(chatId);

    // Баланс TRX
    const trxBalanceSun = await tronWeb.trx.getBalance(walletAddress);
    const trxBalance = trxBalanceSun / 1e6; // 1 TRX = 1_000_000 SUN

    // Баланс TRC20 токенов
    const getTokenBalance = async (tokenAddress: string, decimals: number) => {
      try {
        const contract = await tronWeb.contract().at(tokenAddress);
        const balance = await contract.balanceOf(walletAddress).call({
          from: walletAddress,
        });
        return Number(balance.toString()) / Math.pow(10, decimals);
      } catch (e: any) {
        console.error(
          `Ошибка при получении токена ${tokenAddress}:`,
          e.message
        );
        sendMessage(chatId, `❌ Ошибка при получении токена ${tokenAddress}`);
        return 0;
      }
    };

    const [usdt, usdc, tusd] = await Promise.all([
      getTokenBalance(CONTRACTS.USDT, 6),
      getTokenBalance(CONTRACTS.USDC, 6),
      getTokenBalance(CONTRACTS.TUSD, 6),
    ]);

    return {
      trx: trxBalance,
      usdt,
      usdc,
      tusd,
    };
  } catch (error: any) {
    console.error("❌ Ошибка при получении баланса:", error.message);
    sendMessage(chatId, "❌ Ошибка при получении баланса");
    return null;
  }
};

export default getWalletBalance;
