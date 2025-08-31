import { TronWeb } from "tronweb";

export interface IgetWalletBalance {
  (chatId: number): Promise<{
    trx: number;
    usdt: number;
    usdc: number;
    tusd: number;
  } | null>;
}

interface Props {
  chatId: number;
  tronWeb: TronWeb;
  walletAddress: string | undefined;
  tokenAddress: string;
  decimals: number;
}

export interface GetTokenBalance {
  (props: Props): Promise<number>;
}
