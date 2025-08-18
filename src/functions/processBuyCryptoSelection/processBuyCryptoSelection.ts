import { Props } from "./interface.js";
import { menu } from "./menu.js";
import { sendMessage } from "@/functions";

const processBuyCryptoSelection: Props = (data, chatId, userState) => {
  const crypto = data?.replace("buy_", "") + " (TRC-20)";

  userState[chatId] = {
    ...userState[chatId],
    step: "waitingForAmount",
    crypto,
  };

  return sendMessage(
    chatId,
    `💰 Вкажіть суму в ${crypto}, яку хочете купити:`,
    menu
  );
};

export default processBuyCryptoSelection;
