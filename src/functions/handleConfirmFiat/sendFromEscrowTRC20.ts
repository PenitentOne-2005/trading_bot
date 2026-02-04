import { TronWeb } from "tronweb";
import dotenv from "dotenv";
import { sendEscrow } from "./interface.js";
import CONTRACTS from "@/CONTRACTS.js";
import { TOKEN_DECIMALS } from "../cryptoTransaction/dataTokens.js";

dotenv.config();

const TRONGRID_API_KEY = process.env.TRONGRID_API_KEY!;

const sendFromEscrowTRC20: sendEscrow = async (crypto, amount, buyerWallet) => {
  try {
    const tronWebEscrow = new TronWeb({
      fullHost: "https://api.trongrid.io",
      headers: { "TRON-PRO-API-KEY": TRONGRID_API_KEY },
      privateKey: process.env.ESCROW_KEY || "",
    });

    const contract = await tronWebEscrow.contract().at(CONTRACTS[crypto]);

    const amountWithDecimals = new BigNumber(amount)
      .multipliedBy(10 ** TOKEN_DECIMALS[crypto])
      .toFixed();

    await contract.methods.transfer(buyerWallet, amountWithDecimals).send();
  } catch (error) {
    console.error("Error in sendFromEscrowTRC20:", error);
  }
};

export default sendFromEscrowTRC20;
