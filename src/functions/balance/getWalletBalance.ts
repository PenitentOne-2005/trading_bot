import dotenv from "dotenv";
import axios from "axios";
import { IgetWalletBalance } from "./interface.js";
import { getWalletAddress } from "@/functions/index.js";

dotenv.config();

const USDT_CONTRACT = "0x55d398326f99059fF775485246999027B3197955";
const USDC_CONTRACT = "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d";
const TUSD_CONTRACT = "0x14016e85a25aeb13065688cafb43044c2ef86784";
const DAI_CONTRACT = "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3";

const getWalletBalance: IgetWalletBalance = async (chatId) => {
  try {
    const walletAddress = await getWalletAddress(chatId);

    if (!process.env.QUICKNODE_RPC) {
      throw new Error("QUICKNODE_RPC не задан в переменных окружения");
    }

    const provider = process.env.QUICKNODE_RPC;

    // Получаем TRX (BNB в случае BSC)
    const trxResponse = await axios.post(provider, {
      jsonrpc: "2.0",
      method: "eth_getBalance",
      params: [walletAddress, "latest"],
      id: 1,
    });

    const trxHex = trxResponse.data?.result;
    const trxBalance = trxHex ? parseInt(trxHex, 16) / 1e18 : 0;

    // Формируем data для balanceOf(address)
    const makeBalanceCall = async (tokenAddress: string, decimals: number) => {
      const data =
        "0x70a08231000000000000000000000000" + walletAddress?.slice(2);
      const response = await axios.post(provider, {
        jsonrpc: "2.0",
        method: "eth_call",
        params: [
          {
            to: tokenAddress,
            data: data,
          },
          "latest",
        ],
        id: 2,
      });
      const hex = response.data?.result;
      return hex ? parseInt(hex, 16) / Math.pow(10, decimals) : 0;
    };

    const [usdt, usdc, tusd, dai] = await Promise.all([
      makeBalanceCall(USDT_CONTRACT, 6),
      makeBalanceCall(USDC_CONTRACT, 6),
      makeBalanceCall(TUSD_CONTRACT, 18),
      makeBalanceCall(DAI_CONTRACT, 18),
    ]);

    return {
      trx: trxBalance,
      usdt,
      usdc,
      tusd,
      dai,
    };
  } catch (error: any) {
    console.error("❌ Ошибка при получении баланса:", error.message);
    return null;
  }
};

export default getWalletBalance;
