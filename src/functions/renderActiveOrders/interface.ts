import { Message } from "node-telegram-bot-api";

export interface GetActiveOrders {
  (chatId: number, currentDb: string | undefined): Promise<Message | undefined>;
}
