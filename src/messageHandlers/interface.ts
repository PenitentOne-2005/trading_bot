import { Message } from "node-telegram-bot-api";

type Command = "/start";

type CommandHandler = () => Promise<Message | void>;

type MessageHandlers = Record<Command, CommandHandler>;

export interface CreateMessageHandlers {
  (chatId: number): MessageHandlers;
}
