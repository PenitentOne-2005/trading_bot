import { userState } from "../exports.js";
const dynamicHandlers = {
    buy_: async (data, { chatId }) => {
        const { processBuyCryptoSelection } = await import("../functions/index.js");
        processBuyCryptoSelection(data, chatId, userState);
    },
    select_order_: async (data, { chatId }) => {
        const { confirmOrderPreview } = await import("../functions/index.js");
        const orderId = data.replace("select_order_", "");
        const action = userState[chatId]?.currentDb;
        await confirmOrderPreview(action, chatId, orderId);
    },
    agree_get_: async (data, { chatId }) => {
        const { sendMessage, handleConfirmFiat } = await import("../functions/index.js");
        const orderId = data.replace("agree_get_", "");
        if (!orderId) {
            return sendMessage(chatId, "❗ orderId не указан.");
        }
        await handleConfirmFiat(chatId, orderId);
    },
};
export default dynamicHandlers;
