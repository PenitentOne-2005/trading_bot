import { CallbackProps } from "@/exports.js";
import { Message } from "node-telegram-bot-api";

export interface handleCallbackQuery {
  (data: string, props: CallbackProps): Promise<void | Message>;
}
