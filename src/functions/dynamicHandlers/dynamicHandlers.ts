import { CallbackProps } from "../../interface.js";
import { userState } from "../../userState.js";
import processBuyCryptoSelection from "../processBuyCryptoSelection/processBuyCryptoSelection.js";

const dynamicHandlers: {
  [key: string]: (data: string, props: CallbackProps) => void | Promise<void>;
} = {
  buy_: (data, props) => {
    processBuyCryptoSelection(data, props.chatId, userState);
  },
};

export default dynamicHandlers;
