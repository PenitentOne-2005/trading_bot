import { CryptoKey } from "@/interface.js";
import { Message } from "node-telegram-bot-api";
import { PoolClient } from "pg";
import { TronWeb } from "tronweb";

export interface HandleConfirmFiat {
  (chatId: number, orderId: string): Promise<Message | void>;
}

type NonTRX = Exclude<CryptoKey, "TRX">;

export interface sendEscrow {
  (
    crypto: NonTRX,
    amount: number,
    buyerWallet: string | undefined,
    tronWebEscrow: TronWeb,
  ): Promise<string>;
}

export interface sendEscrowTRX {
  (
    amount: number,
    buyerWallet: string,
    tronWebEscrow: TronWeb,
  ): Promise<string>;
}

interface CryptoProps {
  client: PoolClient;
  orderId: string;
  orderData: any;
  chatId: number;
}

type CryptoPropsWithoutOrderData = Omit<CryptoProps, "orderData">;

export interface QuickBlocking {
  (
    props: CryptoPropsWithoutOrderData,
  ): Promise<
    | Message
    | { buyer_chat_id: number; amount: number; price: number; crypto: string }
  >;
}

export interface SendingCrypto {
  (props: CryptoProps): Promise<Message | undefined>;
}
