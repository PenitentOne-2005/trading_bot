import { IShowBuyMenu } from "./interface.js";
import { showOrders } from "@/functions/index.js";

const showBuyMenu: IShowBuyMenu = async (userOffsets, chatId) => {
  const params = {
    userOffsets,
    chatId,
    type: "sell",
    text: "Доступні оголошення на продаж криптовалюти",
  };
  await showOrders(params);
};

export default showBuyMenu;
