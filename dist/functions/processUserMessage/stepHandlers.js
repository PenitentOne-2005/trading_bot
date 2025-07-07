import waitingForAmount from "./waitingForAmount.js";
import waitingForCard from "./waitingForCard.js";
import handleIBANandIPNstep from "./handleIBANandIPNstep.js";
import waitingForName from "./waitingForName.js";
import waitingForPrice from "./waitingForPrice.js";
const stepHandlers = {
    waitingForPrice: waitingForPrice,
    waitingForAmount: waitingForAmount,
    waitingForCard: waitingForCard,
    waitingForIBAN: handleIBANandIPNstep,
    waitingForIPN: handleIBANandIPNstep,
    waitingForName: waitingForName,
};
export default stepHandlers;
