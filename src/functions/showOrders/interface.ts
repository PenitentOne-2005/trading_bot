import { Message } from "node-telegram-bot-api";

interface IUserOffsetsAndChatId {
  userOffsets: Record<number, number>;
  chatId: number;
}

export interface IShowOrders {
  (params: IShowOrdersParams): Promise<Message | void>;
}

interface IShowOrdersParams extends IUserOffsetsAndChatId {
  dbName: string;
  text: string;
}
