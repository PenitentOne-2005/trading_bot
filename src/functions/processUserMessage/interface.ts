import { Message } from "node-telegram-bot-api";
import { UserState } from "../../userState.js";

interface BaseProps {
  userState: Record<number, UserState>;
  chatId: number;
  text: string;
}

export interface IWaitingForPriceProps extends BaseProps {
  currentState: UserState;
}

export type IWaitingForPrice = (
  props: IWaitingForPriceProps
) => Promise<Message>;

export type IWaitingForAmount = (
  props: IWaitingForPriceProps
) => Promise<Message>;

export type IProcessUserMessage = (msg: Message) => void;
