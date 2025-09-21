import { CONTRACTS } from "@/exports.js";
import { UserState } from "@/userState";
import { TronWeb } from "tronweb";

interface Props {
  userState: Record<number, UserState>;
  chatId: number;
  text: string;
}

export interface CryptoWithdraw {
  (props: Props): Promise<WithdrawResult | void>;
}

export interface PropsWithDrawTRX extends Props {
  tronWeb: TronWeb;
  fromAddress: string | undefined;
  amount: number;
}

export interface WithdrawResult {
  result: boolean;
  txid?: string;
}

export interface withDrawToken {
  (
    props: PropsWithDrawTRX,
    token: keyof typeof CONTRACTS
  ): Promise<WithdrawResult>;
}
