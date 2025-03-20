const { TronWeb } = require("tronweb");
import dotenv from "dotenv";
import { getWalletAddress } from "./getWalletAddress";

dotenv.config();

const tronWeb = new TronWeb({
  fullHost: process.env.QUICKNODE_RPC,
});

export async function getWalletBalance() {
  try {
    const walletAddress = await getWalletAddress();
    console.log(walletAddress);

    const balanceInSun = await tronWeb.trx.getBalance(walletAddress);
    const balanceInTRX = tronWeb.fromSun(balanceInSun);

    return balanceInTRX;
  } catch (error) {
    console.error("❌ Ошибка при получении баланса:", error);
  }
}
