import TronWeb from "tronweb";
import crypto from "crypto";

const privateKey = crypto.randomBytes(32).toString("hex");
const fullNode = new TronWeb.providers.HttpProvider("https://api.trongrid.io");
const solidityNode = new TronWeb.providers.HttpProvider(
  "https://api.trongrid.io"
);
const eventServer = new TronWeb.providers.HttpProvider(
  "https://api.trongrid.io"
);
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

export const createWallet = async () => {
  const wallet = await tronWeb.createAccount();

  return { privateKey, wallet };
};
