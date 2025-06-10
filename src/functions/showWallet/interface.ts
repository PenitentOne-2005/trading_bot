import { Message } from "node-telegram-bot-api";

export interface IShowWallet {
  (chatId: number): Promise<Message>;
}
