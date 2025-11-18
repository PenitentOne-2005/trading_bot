import { TronWeb } from "tronweb";

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
