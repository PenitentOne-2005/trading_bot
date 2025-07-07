import { StepHandlersProps } from "./interface.js";
import waitingForAmount from "./waitingForAmount.js";
import waitingForCard from "./waitingForCard.js";
import handleIBANandIPNstep from "./handleIBANandIPNstep.js";
import waitingForName from "./waitingForName.js";
import waitingForPrice from "./waitingForPrice.js";

const stepHandlers: Record<string, (props: StepHandlersProps) => Promise<any>> =
  {
    waitingForPrice: waitingForPrice,
    waitingForAmount: waitingForAmount,
    waitingForCard: waitingForCard,
    waitingForIBAN: handleIBANandIPNstep,
    waitingForIPN: handleIBANandIPNstep,
    waitingForName: waitingForName,
  };

export default stepHandlers;
