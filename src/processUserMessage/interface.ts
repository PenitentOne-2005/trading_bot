import { Message } from "node-telegram-bot-api";

export type IProcessUserMessage = (msg: Message) => void;
