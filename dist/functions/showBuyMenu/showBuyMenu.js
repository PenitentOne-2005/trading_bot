import { showOrders } from "../../functions/index.js";
const showBuyMenu = async (userOffsets, chatId) => {
    const params = {
        userOffsets,
        chatId,
        dbName: "sell_requests",
        text: "Доступні оголошення на продаж криптовалюти",
    };
    await showOrders(params);
};
export default showBuyMenu;
