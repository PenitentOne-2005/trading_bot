import { CONTRACTS } from "@/exports.js";
import { PropsWithDrawTRX, withDrawToken } from "./interface.js";
import withDrawTRX from "./withDrawTRX.js";

const decimals = {
  USDT: 6,
  USDC: 6,
  TUSD: 18,
};

const withDrawToken: withDrawToken = async (props, token) => {
  const { userState, chatId, tronWeb, fromAddress, amount } = props;
  const { walletAddress } = userState[chatId];

  const tokenId = CONTRACTS[token];
  const amountToSend = amount * 10 ** decimals[token];

  try {
    const transaction = await tronWeb.transactionBuilder.sendToken(
      walletAddress!,
      amountToSend,
      tokenId,
      fromAddress
    );
    const signedTxn = await tronWeb.trx.sign(transaction);
    const result = await tronWeb.trx.sendRawTransaction(signedTxn);

    return { result: !!result, txid: result?.txid };
  } catch (error) {
    console.error(`Ошибка перевода ${token}:`, error);
    return { result: false };
  }
};

const withDrawUSDT = (props: PropsWithDrawTRX) => withDrawToken(props, "USDT");
const withDrawUSDC = (props: PropsWithDrawTRX) => withDrawToken(props, "USDC");
const withDrawTUSD = (props: PropsWithDrawTRX) => withDrawToken(props, "TUSD");

export const withdrawHandlers = {
  TRX: withDrawTRX,
  USDT: withDrawUSDT,
  USDC: withDrawUSDC,
  TUSD: withDrawTUSD,
} as const;
