import { Message, SendMessageOptions } from "node-telegram-bot-api";

export interface ISendMessage {
  (id: number, text: string, menu?: SendMessageOptions): Promise<Message>;
}
