import dotenv from "dotenv";
import { TronWeb } from "tronweb";
import { IgetWalletBalance } from "./interface.js";
import CONTRACTS from "./CONTRACTS.js";
import { getTokenBalance } from "./index.js";
import { getWalletAddress, sendMessage } from "@/functions/index.js";

dotenv.config();

const tronWeb = new TronWeb({
  fullHost: "https://api.trongrid.io",
});

const getWalletBalance: IgetWalletBalance = async (chatId) => {
  try {
    const walletAddress = await getWalletAddress(chatId);

    const trxBalance = (await tronWeb.trx.getBalance(walletAddress)) / 1e6; // 1 TRX = 1_000_000 SUN

    const [USDT, USDC, TUSD] = await Promise.all([
      getTokenBalance({
        chatId,
        tronWeb,
        walletAddress,
        tokenAddress: CONTRACTS.USDT,
        decimals: 6,
      }),
      getTokenBalance({
        chatId,
        tronWeb,
        walletAddress,
        tokenAddress: CONTRACTS.USDC,
        decimals: 6,
      }),
      getTokenBalance({
        chatId,
        tronWeb,
        walletAddress,
        tokenAddress: CONTRACTS.TUSD,
        decimals: 6,
      }),
    ]);

    return {
      TRX: trxBalance,
      USDT,
      USDC,
      TUSD,
    };
  } catch (error: any) {
    console.error("❌ Ошибка при получении баланса:", error.message);
    sendMessage(chatId, "❌ Ошибка при получении баланса");
    return null;
  }
};

export default getWalletBalance;
