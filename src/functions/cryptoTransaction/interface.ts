import { Message } from "node-telegram-bot-api";
import { TronWeb } from "tronweb";

export const allowedKeys = ["TRX", "USDT", "USDC", "TUSD"] as const;
export type CryptoKey = (typeof allowedKeys)[number];

export interface SendCryptoTransaction {
  (chatId: number): Promise<Message>;
}

export interface SendTRX {
  (tronWeb: TronWeb, amount: number, chatId: number): Promise<Message>;
}

export interface SendTRC20 {
  (props: SendTRC20Props): Promise<Message>;
}

interface SendTRC20Props {
  tronWebUser: TronWeb;
  crypto: string;
  amount: number;
  sumToPay: number | undefined;
  chatId: number;
}

export interface ValidateUserState {
  (chatId: number): { crypto: string; amount: number; sumToPay?: number };
}

export interface NormalizeCrypto {
  (cryptoRaw?: string): string | undefined;
}
