import { HandleWalletAddressInput } from "./interface.js";
import { sendMessage, getWalletBalance } from "@/functions/index.js";
import {
  getAvailableUserBalances,
  initMenu,
  tokens,
  tronWeb,
} from "./index.js";

const handleWalletAddressInput: HandleWalletAddressInput = async (props) => {
  const { userState, chatId, text } = props;

  const address = text.trim();

  if (!tronWeb.isAddress(address)) {
    return sendMessage(
      chatId,
      "Невiрний адрес. Введiть коректну адресу у мережi TRON (TRC-20)."
    );
  }

  const balance = await getWalletBalance(chatId);

  const availableUserBalances = getAvailableUserBalances(tokens, balance);

  const tokenButtons = tokens.map((token) => ({
    text: token.key,
    callback_data: `withdraw_${token.key}`,
  }));

  const menu = initMenu(tokenButtons);

  userState[chatId] = {
    ...userState[chatId],
    walletAddress: address,
    balance,
  };

  return sendMessage(
    chatId,
    `Виберiть криптовалюту для виводу
    Вашi доступнi баланси:

    ${availableUserBalances || "❌ Баланс порожнiй"}

    Увага! Обрана криптовалюта буде надiслана на вказану вами адресу в мережi TRON (TRC-20).
    Переконайтеся, що ваш гаманець пiдтримує цю мережу, iнакше кошти можуть бути втраченi.
    Виберiть криптовалюту для виводу:`,
    menu
  );
};

export default handleWalletAddressInput;
