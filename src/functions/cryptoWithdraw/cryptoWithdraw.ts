import { CryptoWithdraw } from "./interface.js";
import { sendMessage, getWalletAddress } from "@/functions/index.js";
import { menu } from "./menu.js";

const cryptoWithdraw: CryptoWithdraw = async (props) => {
  const { userState, chatId, text } = props;

  const { walletAddress } = userState[chatId];
  const addressInBot = await getWalletAddress(chatId);

  return sendMessage(
    chatId,
    `Успешно выведенно ${text} с ${addressInBot} на ${walletAddress}`,
    menu
  );
};

export default cryptoWithdraw;
