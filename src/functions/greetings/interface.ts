import { Message } from "node-telegram-bot-api";

export interface IgreetingsMessage {
  (msg: Message): void;
}
