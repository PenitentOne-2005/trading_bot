import { showOrders } from "@/functions";
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
