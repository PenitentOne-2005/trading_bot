import { userState } from "../exports.js";
const dynamicHandlers = {
    buy_: async (data, { chatId }) => {
        const { processBuyCryptoSelection } = await import("../functions/index.js");
        processBuyCryptoSelection(data, chatId, userState);
    },
    withdraw_: async (data, { chatId }) => {
        const { promptWithdrawAmount } = await import("../functions/index.js");
        promptWithdrawAmount(chatId, data, userState);
    },
    select_order_: async (data, { chatId }) => {
        const { confirmOrderPreview } = await import("../functions/index.js");
        const orderId = data.replace("select_order_", "");
        const action = userState[chatId]?.currentDb;
        await confirmOrderPreview(action, chatId, orderId);
    },
    agree_get_: async (data, { chatId }) => {
        const { sendMessage, handleConfirmFiat } = await import("../functions/index.js");
        try {
            const orderId = data.replace("agree_get_", "");
            if (!orderId) {
                sendMessage(chatId, "❗ orderId не указан.");
                return;
            }
            await handleConfirmFiat(chatId, orderId);
        }
        catch (err) {
            console.error("Ошибка в agree_get_:", err);
            await sendMessage(chatId, "❌ Произошла ошибка при обработке.");
        }
    },
};
export default dynamicHandlers;
