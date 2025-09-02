import { checkUserName } from "./regExp.js";
import { menuBack } from "./menu.js";
import { sendMessage, showSummary, savePayments } from "../../functions/index.js";
const waitingForName = async (props) => {
    const { userState, chatId, text } = props;
    if (checkUserName.test(text)) {
        const prevState = userState[chatId];
        const IBANdata = {
            ...(prevState?.IBANdata || {}),
            name: text,
        };
        userState[chatId] = {
            ...prevState,
            step: "confirmOrder",
            IBANdata,
        };
        await savePayments(chatId, JSON.stringify(IBANdata));
        return showSummary(chatId, userState);
    }
    return sendMessage(chatId, "❌ Помилка! Невірний формат ПІБ.\nПрізвище, ім'я та по батькові повинні містити тільки літери українського або латинського алфавіту.\nПриклад: Іваненко Іван Іванович", menuBack);
};
export default waitingForName;
