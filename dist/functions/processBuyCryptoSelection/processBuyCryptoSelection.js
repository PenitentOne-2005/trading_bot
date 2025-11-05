import { menu } from "./menu.js";
import { sendMessage } from "../../functions/index.js";
const processBuyCryptoSelection = (data, chatId, userState) => {
    const crypto = data?.replace("buy_", "") + " (TRC-20)";
    const action = userState[chatId].orderType === "buy" ? "купити" : "продати";
    userState[chatId] = {
        ...userState[chatId],
        step: "waitingForAmount",
        crypto,
    };
    return sendMessage(chatId, `💰 Вкажіть суму в ${crypto}, яку хочете ${action}:`, menu);
};
export default processBuyCryptoSelection;
