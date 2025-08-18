import { Message } from "node-telegram-bot-api";

export interface HandleConfirmFiat {
  (chatId: number, orderId: string): Promise<Message | void>;
}
