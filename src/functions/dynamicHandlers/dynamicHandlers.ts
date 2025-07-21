import { Message } from "node-telegram-bot-api";
import { CallbackProps } from "../../interface.js";
import { userState } from "../../userState.js";

const dynamicHandlers: {
  [key: string]: (
    data: string,
    props: CallbackProps
  ) => void | Promise<void | Message>;
} = {
  buy_: async (data, props) => {
    const processBuyCryptoSelection = (
      await import("../processBuyCryptoSelection/processBuyCryptoSelection.js")
    ).default;

    processBuyCryptoSelection(data, props.chatId, userState);
  },

  select_order_: async (data, { chatId }) => {
    const orderId = data.replace("select_order_", "");
    const action = userState[chatId]?.currentDb;

    const confirmOrderPreview = (await import("./confirmOrderPreview.js"))
      .default;

    await confirmOrderPreview(action, chatId, orderId);
  },
};

export default dynamicHandlers;
