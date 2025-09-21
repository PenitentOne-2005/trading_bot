import { UserState } from "@/userState";
import { Message, SendMessageOptions } from "node-telegram-bot-api";

interface Props {
  userState: Record<number, UserState>;
  chatId: number;
  text: string;
}

export interface HandleWalletAddressInput {
  (props: Props): Promise<Message>;
}

interface TokenBalanceArgs {
  tokens: readonly { key: string; label: string }[];
  balance: Record<string, number> | null;
}

export interface FormatBalancesToString {
  (args: TokenBalanceArgs): string;
}

export interface GetAvailableUserTokens {
  (args: TokenBalanceArgs): { key: string; label: string }[];
}

export interface initMenu {
  (tokenButtons: { text: string; callback_data: string }[]): SendMessageOptions;
}
