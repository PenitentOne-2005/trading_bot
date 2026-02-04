import { Message } from "node-telegram-bot-api";
import { TronWeb } from "tronweb";

export interface SendCryptoTransaction {
  (chatId: number, orderId: string): Promise<Message | undefined>;
}

export interface SendTRX {
  (tronWeb: TronWeb, amount: number, chatId: number): Promise<Message>;
}

export interface SendTRC20 {
  (props: SendTRC20Props): Promise<Message | undefined>;
}

interface SendTRC20Props {
  tronWebUser: TronWeb;
  cryptoValidate: string;
  amountValidate: number;
  sumToPay: number | undefined;
  chatId: number;
}

export interface EscrowPayload {
  amountValidate: number;
  sumToPay: number | undefined;
  orderId: string | undefined;
  metadata: {
    IBAN: string;
    name: string;
    [key: string]: any;
  };
}

export interface ValidateUserState {
  (chatId: number): { cryptoValidate: string; amountValidate: number; sumToPay?: number };
}

export interface NormalizeCrypto {
  (cryptoRaw?: string): string | undefined;
}
