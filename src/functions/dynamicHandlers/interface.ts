import { Message } from "node-telegram-bot-api";

export interface Props {
  (
    action: string | undefined,
    chatId: number,
    orderId: string
  ): Promise<Message>;
}

export interface HandleConfirmFiat {
  (chatId: number, orderId: string): Promise<Message | void>;
}
