import { Message } from "node-telegram-bot-api";

export interface GetActiveOrders {
  (chatId: number): Promise<Message | undefined>;
}
