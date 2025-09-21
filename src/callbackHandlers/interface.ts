import { CallbackProps } from "@/exports.js";
import { Message } from "node-telegram-bot-api";

export interface CallbackHandlers {
  (props: CallbackProps): void | Promise<void | Message>;
}
