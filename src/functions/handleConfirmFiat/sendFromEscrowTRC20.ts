import { sendEscrow } from "./interface.js";
import CONTRACTS from "@/CONTRACTS.js";
import { TOKEN_DECIMALS } from "../cryptoTransaction/dataTokens.js";

const sendFromEscrowTRC20: sendEscrow = async (
  crypto,
  amount,
  buyerWallet,
  tronWebEscrow,
) => {
  try {
    const contract = await tronWebEscrow.contract().at(CONTRACTS[crypto]);

    const amountWithDecimals = new BigNumber(amount)
      .multipliedBy(10 ** TOKEN_DECIMALS[crypto])
      .toFixed();

    const txid = await contract.methods
      .transfer(buyerWallet, amountWithDecimals)
      .send({
        feeLimit: 100_000_000,
      });

    if (!txid) {
      throw new Error("sendFromEscrowTRC20: Transaction failed");
    }

    return txid;
  } catch (error) {
    console.error("Error in sendFromEscrowTRC20:", error);
    throw error;
  }
};

export default sendFromEscrowTRC20;
