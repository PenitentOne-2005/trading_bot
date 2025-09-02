import { CryptoWithdraw } from "./interface.js";
import { sendMessage } from "@/functions/index.js";

const cryptoWithdraw: CryptoWithdraw = async (props) => {
  const { userState, chatId, text } = props;

  userState[chatId] = { step: "idle" };

  return sendMessage(chatId, "Успешно выведенно");
};

export default cryptoWithdraw;
