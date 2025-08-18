import { IShowSellMenu } from "./interface.js";
import { showOrders } from "@/functions";

const showSellMenu: IShowSellMenu = async (userOffsets, chatId) => {
  const params = {
    userOffsets,
    chatId,
    dbName: "buy_requests",
    text: "Доступні оголошення на купівлю криптовалюти:",
  };
  await showOrders(params);
};

export default showSellMenu;
