import { Message } from "node-telegram-bot-api";

export interface ICreateExchange {
  (msg: Message): void;
}
