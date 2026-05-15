import dotenv from "dotenv";

dotenv.config({ path: "/root/trading_bot/.env" });

import { TronWeb } from "tronweb";
import { ICreateWallet } from "./interface.js";

const tronWeb = new TronWeb({
  fullHost: process.env.QUICKNODE_RPC,
});

const createWallet: ICreateWallet = async () => {
  try {
    const account = await tronWeb.createAccount();

    return { privateKey: account.privateKey, address: account.address.base58 };
  } catch (error) {
    console.error("Ошибка при создании кошелька:", error);
  }
};

export default createWallet;
