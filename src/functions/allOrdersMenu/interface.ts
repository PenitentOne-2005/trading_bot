import { Message } from "node-telegram-bot-api";

export interface IAllOrdersMenu {
  (chatId: number): Promise<Message>;
}
