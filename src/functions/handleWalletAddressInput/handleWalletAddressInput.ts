import { TronWeb } from "tronweb";
import { HandleWalletAddressInput } from "./interface.js";
import { sendMessage, getWalletBalance } from "@/functions/index.js";

const tronWeb = new TronWeb({ fullHost: "https://api.trongrid.io" });

const handleWalletAddressInput: HandleWalletAddressInput = async (props) => {
  const { userState, chatId, text } = props;

  const address = text.trim();

  if (!tronWeb.isAddress(address)) {
    return sendMessage(
      chatId,
      "Невiрний адрес. Введiть коректну адресу у мережi TRON (TRC-20)."
    );
  }

  userState[chatId] = {
    ...userState[chatId],
    step: "waitingForAmount",
    walletAddress: address,
  };

  const balance = await getWalletBalance(chatId);

  return sendMessage(
    chatId,
    `Виберiть криптовалюту для виводу
     Вашi доступни баланси:
        ${balance?.usdt === 0 ? "" : `* USDT: ${balance?.usdt} USDT`}
        ${balance?.trx === 0 ? "" : `* TRX: ${balance?.trx} TRX`}
        ${balance?.usdc === 0 ? "" : `* USDC: ${balance?.usdc} USDC`}
        ${balance?.tusd === 0 ? "" : `* TUSD: ${balance?.tusd} TUSD`} 

    Увага! Обрана криптовалюта буде надiслана на вказану вами адресу в мережi TRON (TRC-20).
    Переконайтеся, що ваш гаманець пiдтримує цю мережу, iнакше кошти можуть бути втраченi.
        Виберiть криптовалюту для виводу:`
  );
};

export default handleWalletAddressInput;
