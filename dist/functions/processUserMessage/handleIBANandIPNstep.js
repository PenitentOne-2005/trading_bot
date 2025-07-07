import stepConfigs from "./stepConfig.js";
import sendMessage from "../sendMessage/sendMessage.js";
const handleIBANandIPNstep = (props) => {
    const { userState, chatId, text } = props;
    const currentStep = userState[chatId]?.step;
    const config = stepConfigs[currentStep];
    if (!config) {
        return sendMessage(chatId, "⚠️ Невідомий етап заповнення платіжних даних.");
    }
    if (config.regExp.test(text)) {
        const prevState = userState[chatId];
        userState[chatId] = {
            ...prevState,
            step: config.nextStep,
            paymentMethod: "IBAN",
            IBANdata: {
                ...(prevState?.IBANdata || {}),
                [config.field]: text,
            },
        };
        return sendMessage(chatId, config.label, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Назад", callback_data: "back" }],
                    [{ text: "Скасувати", callback_data: "back" }],
                ],
            },
        });
    }
    return sendMessage(chatId, config.errorMsg, {
        reply_markup: {
            inline_keyboard: [[{ text: "Назад", callback_data: "back" }]],
        },
    });
};
export default handleIBANandIPNstep;
