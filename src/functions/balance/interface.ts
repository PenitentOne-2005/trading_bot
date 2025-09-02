import { TronWeb } from "tronweb";

export interface IgetWalletBalance {
  (chatId: number): Promise<{
    TRX: number;
    USDT: number;
    USDC: number;
    TUSD: number;
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
