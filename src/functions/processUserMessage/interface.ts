import { Message } from "node-telegram-bot-api";
import { UserState } from "../../userState.js";

interface BaseProps {
  userState: Record<number, UserState>;
  chatId: number;
  text: string;
}

export type IWaitingForPrice = (props: BaseProps) => Promise<Message>;

export type IWaitingForAmount = (props: BaseProps) => Promise<Message>;

export type IProcessUserMessage = (msg: Message) => void;
