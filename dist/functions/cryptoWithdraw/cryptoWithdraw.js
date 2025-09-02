import { sendMessage } from "@/functions/index.js";
const cryptoWithdraw = async (props) => {
    const { userState, chatId, text } = props;
    return sendMessage(chatId, "Успешно выведенно");
};
export default cryptoWithdraw;
