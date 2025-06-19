import { IBuyOrder } from "./interface.js";
import sendMessage from "../sendMessage/sendMessage.js";

const createBuyOrder: IBuyOrder = async (props) => {
  const { currentState, chatId, userState, username } = props;

  if (!username) return;

  switch (currentState.step) {
    case "idle": {
      await sendMessage(
        chatId,
        "ВАЖЛИВА ІНФОРМАЦІЯ\n ! Єдиний офіційний канал підтримки: Telegram Support\n ! Не взаємодійте з особами, які видають себе за підтримку. Це шахраї!\n ! Після підтвердження отримання коштів угода вважається завершеною. Блокчейн не підтримує скасування транзакцій.\n ! Ніколи не передавайте свої приватні ключі та не погоджуйтесь на сторонні перевірки.\n Ви погоджуєтеся з цими умовами?",
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Так, я погоджуюсь", callback_data: "agree_buy" }],
              [{ text: "Назад", callback_data: "back" }],
            ],
          },
        }
      );
      userState[chatId] = { step: "waitingForCrypto" };
      break;
    }

    default:
      break;
  }
};

export default createBuyOrder;
