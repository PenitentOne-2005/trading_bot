import dotenv from "dotenv";
import axios from "axios";
import getWalletAddress from "../address/getWalletAddress.js";
dotenv.config();
const getWalletBalance = async () => {
    try {
        const walletAddress = await getWalletAddress();
        if (!process.env.QUICKNODE_RPC) {
            throw new Error("QUICKNODE_RPC не задан в переменных окружения");
        }
        const response = await axios.post(process.env.QUICKNODE_RPC, {
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: [walletAddress, "latest"],
            id: 1,
        });
        if (response.data && response.data.result !== undefined) {
            const balanceInSun = response.data.result;
            const balanceInTRX = balanceInSun / 1e6;
            return balanceInTRX;
        }
        else {
            throw new Error("Ошибка получения данных о балансе.");
        }
    }
    catch (error) {
        console.error("❌ Ошибка при получении баланса:", error.message);
    }
};
export default getWalletBalance;
