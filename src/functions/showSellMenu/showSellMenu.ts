import { IShowSellMenu } from "./interface.js";
import { showOrders } from "@/functions/index.js";

const showSellMenu: IShowSellMenu = async (userOffsets, chatId) => {
  const params = {
    userOffsets,
    chatId,
    type: "buy",
    text: "Доступні оголошення на купівлю криптовалюти",
  };
  await showOrders(params);
};

export default showSellMenu;
