import { CryptoKey } from "@/interface.js";
import { Message } from "node-telegram-bot-api";

export interface HandleConfirmFiat {
  (chatId: number, orderId: string): Promise<Message | void>;
}

type NonTRX = Exclude<CryptoKey, "TRX">;

export interface sendEscrow {
  (
    crypto: NonTRX,
    amount: number,
    buyerWallet: string | undefined,
  ): Promise<void>;
}

export interface sendEscrowTRX {
  (amount: number, buyerWallet: string): Promise<void>;
}
