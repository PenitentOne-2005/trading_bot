import { Message } from "node-telegram-bot-api";

export interface IsendMessage {
  (id: number, text: string): Promise<Message>;
}

export interface IprocessUserMessage {
  (msg: Message): void;
}
