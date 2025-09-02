import { sendMessage } from "../../functions/index.js";
const cryptoWithdraw = async (props) => {
    const { userState, chatId, text } = props;
    userState[chatId] = { step: "idle" };
    return sendMessage(chatId, "Успешно выведенно");
};
export default cryptoWithdraw;
