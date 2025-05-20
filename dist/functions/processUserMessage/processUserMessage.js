import { userState } from "../../userState.js";
import { mainMenu } from "../../commandKeyboard.js";
import CRYPTOS from "../../listCrypto.js";
import createSellOrder from "../create/createSellOrder.js";
import createBuyOrder from "../create/createBuyOrder.js";
import createMessageHandlers from "../messageHandlers/messageHandlers.js";
import sendMessage from "../sendMessage/sendMessage.js";
const processUserMessage = async (msg) => {
    const { chat, text } = msg;
    const chatId = chat.id;
    const username = chat.username;
    if (!username || !text)
        return;
    const currentState = userState[chatId] ?? { step: "idle" };
    const props = {
        currentState,
        CRYPTOS,
        text,
        chatId,
        userState,
        username,
        mainMenu,
    };
    await createSellOrder(props);
    await createBuyOrder(props);
    const handlers = createMessageHandlers(chatId);
    text in handlers
        ? await handlers[text]()
        : sendMessage(chatId, "Невідома команда.");
};
export default processUserMessage;
