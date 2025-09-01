import { TronWeb } from "tronweb";
import { HandleWalletAddressInput } from "./interface.js";
import { menu } from "./menu.js";
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

  const tokens = [
    { key: "usdt", label: "USDT" },
    { key: "trx", label: "TRX" },
    { key: "usdc", label: "USDC" },
    { key: "tusd", label: "TUSD" },
  ] as const;

  const balances = tokens
    .filter((token) => balance?.[token.key] && balance[token.key] > 0)
    .map((token) => `* ${token.label}: ${balance?.[token.key]} ${token.label}`)
    .join("\n");

  return sendMessage(
    chatId,
    `Виберiть криптовалюту для виводу
    Вашi доступнi баланси:
    ${balances || "❌ Баланс порожнiй"}

    Увага! Обрана криптовалюта буде надiслана на вказану вами адресу в мережi TRON (TRC-20).
    Переконайтеся, що ваш гаманець пiдтримує цю мережу, iнакше кошти можуть бути втраченi.
    Виберiть криптовалюту для виводу:`,
    menu
  );
};

export default handleWalletAddressInput;
