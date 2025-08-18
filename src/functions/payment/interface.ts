import { Message } from "node-telegram-bot-api";
import { UserState } from "@/exports.js";

export interface FuncInfoProps {
  (
    userState: Record<number, UserState>,
    chatId: number,
    orderId?: string
  ): Promise<Message | undefined>;
}

export interface SetPaymentMethod {
  (chatId: number, method: string, text: string): void;
}

interface Props {
  chatId: number;
  savedPayment: string | null;
  userState: Record<number, UserState>;
}

export interface payMethodProps {
  (props: Props): Promise<Message | undefined>;
}
