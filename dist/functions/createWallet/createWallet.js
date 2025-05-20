import dotenv from "dotenv";
dotenv.config({ path: "/root/trading_bot/.env" });
import { TronWeb } from "tronweb";
import crypto from "crypto";
const privateKey = crypto.randomBytes(32).toString("hex");
const tronWeb = new TronWeb({
    fullHost: process.env.QUICKNODE_RPC,
    privateKey: privateKey,
});
const createWallet = async () => {
    try {
        const { address } = await tronWeb.createAccount();
        return { privateKey, address };
    }
    catch (error) {
        console.error("Ошибка при создании кошелька:", error);
    }
};
export default createWallet;
