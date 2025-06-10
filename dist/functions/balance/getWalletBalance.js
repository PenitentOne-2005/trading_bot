import dotenv from "dotenv";
import axios from "axios";
import getWalletAddress from "../address/getWalletAddress.js";
dotenv.config();
const USDT_CONTRACT = "0x55d398326f99059fF775485246999027B3197955"; // замените на TRON-совместимый, если нужно
const getWalletBalance = async () => {
    try {
        const walletAddress = await getWalletAddress();
        if (!process.env.QUICKNODE_RPC) {
            throw new Error("QUICKNODE_RPC не задан в переменных окружения");
        }
        const trxResponse = await axios.post(process.env.QUICKNODE_RPC, {
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: [walletAddress, "latest"],
            id: 1,
        });
        const trxHex = trxResponse.data?.result;
        const trxBalance = trxHex ? parseInt(trxHex, 16) / 1e18 : 0;
        const data = "0x70a08231000000000000000000000000" + walletAddress?.slice(2);
        const usdtResponse = await axios.post(process.env.QUICKNODE_RPC, {
            jsonrpc: "2.0",
            method: "eth_call",
            params: [
                {
                    to: USDT_CONTRACT,
                    data: data,
                },
                "latest",
            ],
            id: 2,
        });
        const usdtHex = usdtResponse.data?.result;
        const usdtBalance = usdtHex ? parseInt(usdtHex, 16) / 1e6 : 0;
        return {
            trx: trxBalance,
            usdt: usdtBalance,
        };
    }
    catch (error) {
        console.error("❌ Ошибка при получении баланса:", error.message);
        return null;
    }
};
export default getWalletBalance;
