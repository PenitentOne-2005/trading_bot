import { Message } from "node-telegram-bot-api";

export interface Props {
  (chatId: number): Promise<Message>;
}
