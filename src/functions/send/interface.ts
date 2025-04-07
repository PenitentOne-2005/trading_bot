import { Message, SendMessageOptions } from "node-telegram-bot-api";

export interface IsendMessage {
  (id: number, text: string, menu?: SendMessageOptions): Promise<Message>;
}

export interface IprocessUserMessage {
  (msg: Message): void;
}
