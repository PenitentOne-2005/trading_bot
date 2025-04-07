import { Message } from "node-telegram-bot-api";
import { IAddress } from "../../interface";

interface WalletData {
  privateKey: string;
  address: IAddress;
}

export interface IcreateWallet {
  (): Promise<WalletData | undefined>;
}

export interface IcreateExchange {
  (msg: Message): void;
}

export interface IsellCrypto {
  (msg: Message): void;
}
