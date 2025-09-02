import { StepHandlersProps } from "./interface.js";
import { handleWalletAddressInput, cryptoWithdraw } from "@/functions/index.js";
import {
  waitingForAmount,
  waitingForCard,
  handleIBANandIPNstep,
  waitingForName,
  waitingForPrice,
} from "./index.js";

const stepHandlers: Record<string, (props: StepHandlersProps) => Promise<any>> =
  {
    waitingForPrice: waitingForPrice,
    waitingForAmount: waitingForAmount,
    waitingForCard: waitingForCard,
    waitingForIBAN: handleIBANandIPNstep,
    waitingForIPN: handleIBANandIPNstep,
    waitingForName: waitingForName,
    waitingForWalletAddress: handleWalletAddressInput,
    cryptoWithdraw: cryptoWithdraw,
  };

export default stepHandlers;
