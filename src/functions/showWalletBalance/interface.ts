import { Message } from "node-telegram-bot-api";

export interface IShowWalletBalance {
  (msg: Message): Promise<void>;
}
