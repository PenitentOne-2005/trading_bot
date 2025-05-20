import { Message } from "node-telegram-bot-api";

export interface Iregister {
  (msg: Message): Promise<Message | undefined>;
}
