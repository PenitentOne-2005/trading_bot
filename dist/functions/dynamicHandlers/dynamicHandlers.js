import { userState } from "../../userState.js";
import sendMessage from "../sendMessage/sendMessage.js";
import handleConfirmFiat from "./handleConfirmFiat.js";
const dynamicHandlers = {
    buy_: async (data, props) => {
        const processBuyCryptoSelection = (await import("../processBuyCryptoSelection/processBuyCryptoSelection.js")).default;
        processBuyCryptoSelection(data, props.chatId, userState);
    },
    select_order_: async (data, { chatId }) => {
        const orderId = data.replace("select_order_", "");
        const action = userState[chatId]?.currentDb;
        const confirmOrderPreview = (await import("./confirmOrderPreview.js"))
            .default;
        await confirmOrderPreview(action, chatId, orderId);
    },
    agree_get_: async (data, { chatId }) => {
        const orderId = data.split("_")[2];
        if (!orderId) {
            return sendMessage(chatId, "❗ orderId не указан.");
        }
        await handleConfirmFiat(chatId, orderId);
    },
};
export default dynamicHandlers;
