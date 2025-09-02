import { sendMessage } from "../../functions/index.js";
import { menu } from "./menu.js";
const cryptoWithdraw = async (props) => {
    const { userState, chatId, text } = props;
    return sendMessage(chatId, "Успешно выведенно", menu);
};
export default cryptoWithdraw;
