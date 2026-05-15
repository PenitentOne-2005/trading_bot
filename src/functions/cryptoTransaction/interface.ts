import { UserState } from "@/userState";
import { Message } from "node-telegram-bot-api";
import { TronWeb } from "tronweb";

export interface SendCryptoTransaction {
  (orderId: string): Promise<Message | void>;
}

export interface SendTRX {
  (tronWeb: TronWeb, amount: number, chatId: number): Promise<void>;
}

export interface SendTRC20 {
  (props: SendTRC20Props): Promise<Message | undefined>;
}

export interface SendEscrowMessages {
  (userState: Record<number, UserState>, chatId: number): Promise<Message>;
}

interface SendTRC20Props {
  tronWebUser: TronWeb;
  cryptoValidate: string;
  amountValidate: number;
  sumToPay: number | undefined;
  chatId: number;
  orderId: string | undefined;
}

export interface ValidateUserState {
  (orderId: string): Promise<{
    cryptoValidate: string;
    amountValidate: number;
    sumToPay: number;
  }>;
}

export interface NormalizeCrypto {
  (cryptoRaw?: string): string | undefined;
}

export type PaymentMetadata = {
  IBAN?: string;
  name?: string;
  text?: string;
};
