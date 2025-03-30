import { Message } from "node-telegram-bot-api";

export interface IshowWalletBalance {
  (msg: Message): Promise<void>;
}

export interface IgetWalletBalance {
  (): Promise<number | undefined>;
}
