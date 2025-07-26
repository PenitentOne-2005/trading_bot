import { Message } from "node-telegram-bot-api";
import { UserState } from "../../userState.js";

interface Props {
  chatId: number;
  savedPayment: string | null;
  userState: Record<number, UserState>;
}

export interface payMethodProps {
  (props: Props): Promise<Message | undefined>;
}

export interface FuncInfoProps {
  (userState: Record<number, UserState>, chatId: number): Promise<
    Message | undefined
  >;
}

export interface CancelProps {
  (
    chatId: number,
    orderId: string,
    userState: Record<number, UserState>
  ): Promise<Message>;
}
