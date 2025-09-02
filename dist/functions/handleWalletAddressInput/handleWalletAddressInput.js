import { TronWeb } from "tronweb";
import { menu } from "./menu.js";
import { sendMessage, getWalletBalance } from "@/functions/index.js";
const tronWeb = new TronWeb({ fullHost: "https://api.trongrid.io" });
const handleWalletAddressInput = async (props) => {
    const { userState, chatId, text } = props;
    const address = text.trim();
    if (!tronWeb.isAddress(address)) {
        return sendMessage(chatId, "Невiрний адрес. Введiть коректну адресу у мережi TRON (TRC-20).");
    }
    const balance = await getWalletBalance(chatId);
    const tokens = [
        { key: "USDT", label: "USDT" },
        { key: "TRX", label: "TRX" },
        { key: "USDC", label: "USDC" },
        { key: "TUSD", label: "TUSD" },
    ];
    const balances = tokens
        .filter((token) => balance?.[token.key] && balance[token.key] > 0)
        .map((token) => `* ${token.label}: ${balance?.[token.key]} ${token.label}`)
        .join("\n");
    userState[chatId] = {
        ...userState[chatId],
        walletAddress: address,
        balance,
    };
    return sendMessage(chatId, `Виберiть криптовалюту для виводу
    Вашi доступнi баланси:

    ${balances || "❌ Баланс порожнiй"}

    Увага! Обрана криптовалюта буде надiслана на вказану вами адресу в мережi TRON (TRC-20).
    Переконайтеся, що ваш гаманець пiдтримує цю мережу, iнакше кошти можуть бути втраченi.
    Виберiть криптовалюту для виводу:`, menu);
};
export default handleWalletAddressInput;
