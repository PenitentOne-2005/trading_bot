import { BaseProps, IBANStep } from "./interface.js";
import stepConfigs from "./stepConfig.js";
import { backSteps, menuBack } from "./menu.js";
import { sendMessage } from "@/functions/index.js";

const handleIBANandIPNstep = (props: BaseProps) => {
  const { userState, chatId, text } = props;
  const currentStep = userState[chatId]?.step as IBANStep;

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

    return sendMessage(chatId, config.label, backSteps);
  }

  return sendMessage(chatId, config.errorMsg, menuBack);
};

export default handleIBANandIPNstep;
