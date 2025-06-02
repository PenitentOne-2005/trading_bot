import { userState } from "../../userState.js";
import processBuyCryptoSelection from "../processBuyCryptoSelection/processBuyCryptoSelection.js";
const dynamicHandlers = {
    buy_: (data, props) => {
        processBuyCryptoSelection(data, props.chatId, userState);
    },
};
export default dynamicHandlers;
