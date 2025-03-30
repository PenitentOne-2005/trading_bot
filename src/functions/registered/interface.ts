import { Message } from "node-telegram-bot-api";

export interface Iregister {
  (msg: Message): Promise<Message | undefined>;
}

export interface IisUserRegistered {
  (telegramId: number): Promise<boolean>;
}
