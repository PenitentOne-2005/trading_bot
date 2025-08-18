import { IWaitingForName } from "./interface.js";
import { checkUserName } from "./regExp.js";
import { menuBack } from "./menu.js";
import { sendMessage } from "@/functions";

const waitingForName: IWaitingForName = async (props) => {
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

    const { default: showSummary } = await import(
      "../showSummary/showSummary.js"
    );
    const { default: savePayments } = await import(
      "../payment/savePayments.js"
    );

    await savePayments(chatId, JSON.stringify(IBANdata));
    return showSummary(chatId, userState);
  }

  return sendMessage(
    chatId,
    "❌ Помилка! Невірний формат ПІБ.\nПрізвище, ім'я та по батькові повинні містити тільки літери українського або латинського алфавіту.\nПриклад: Іваненко Іван Іванович",
    menuBack
  );
};

export default waitingForName;
