import { Message } from "node-telegram-bot-api";

export interface IprocessUserMessage {
  (msg: Message): void;
}
