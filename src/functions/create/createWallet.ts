const { TronWeb } = require("tronweb");
import dotenv from "dotenv";
import crypto from "crypto";
import { IcreateWallet } from "./interface";

dotenv.config();

const privateKey = crypto.randomBytes(32).toString("hex");

const tronWeb = new TronWeb({
  fullHost: process.env.QUICKNODE_RPC,
  privateKey: privateKey,
});

const createWallet: IcreateWallet = async () => {
  try {
    const { address } = await tronWeb.createAccount();
    return { privateKey, address };
  } catch (error) {
    console.error("Ошибка при создании кошелька:", error);
  }
};

export default createWallet;
