import { Message } from "node-telegram-bot-api";
import { UserState } from "@/exports.js";

export interface BaseProps {
  userState: Record<number, UserState>;
  chatId: number;
  text: string;
}

export interface IWaitingForPriceProps extends BaseProps {
  currentState: UserState;
}

export interface StepHandlersProps extends BaseProps, IWaitingForPriceProps {}

export type StepHandler<T = IWaitingForPriceProps> = (
  props: T
) => Promise<Message | undefined>;

export type IWaitingForPrice = StepHandler;
export type IWaitingForAmount = StepHandler;
export type IWaitingForCard = StepHandler;
export type IWaitingForIBAN = StepHandler;
export type IWaitingForIPN = StepHandler;
export type IWaitingForName = StepHandler;

export type IBANStep = "waitingForIBAN" | "waitingForIPN";
export type IBANField = "IBAN" | "IPN";

export interface StepConfig {
  step: IBANStep;
  nextStep: IBANStep | "waitingForName";
  field: IBANField;
  label: string;
  regExp: RegExp;
  errorMsg: string;
}
