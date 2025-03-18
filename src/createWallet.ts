const { TronWeb } = require("tronweb");
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

interface WalletData {
  privateKey: string;
  wallet: any;
}

const privateKey = crypto.randomBytes(32).toString("hex");

const tronWeb = new TronWeb({
  fullHost: process.env.QUICKNODE_RPC,
  privateKey: privateKey,
});

export const createWallet = async (): Promise<WalletData | undefined> => {
  try {
    const wallet = await tronWeb.createAccount();
    return { privateKey, wallet };
  } catch (error) {
    console.error("Ошибка при создании кошелька:", error);
  }
};
