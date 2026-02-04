import { SendMessageOptions } from "node-telegram-bot-api";
import { UserState } from "@/exports.js";

export const allowedKeys = ["TRX", "USDT", "USDC", "TUSD"] as const;
export type CryptoKey = (typeof allowedKeys)[number];

export interface IAddress {
  base58: string;
  hex: string;
}

export type MenuButton = {
  text: string;
};

export interface CallbackProps {
  chatId: number;
  username: string;
  text: string;
  CRYPTOS: string[];
  userState: Record<number, UserState>;
  currentState: UserState;
  mainMenu: SendMessageOptions;
}
