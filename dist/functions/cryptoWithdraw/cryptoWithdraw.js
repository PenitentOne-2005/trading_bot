import { TronWeb } from "tronweb";
import { sendMessage, getWalletAddress, getPrivateKeyFromDB, } from "../../functions/index.js";
import { menu } from "./menu.js";
const cryptoWithdraw = async (props) => {
    const { userState, chatId, text } = props;
    const tronWeb = new TronWeb({
        fullHost: "https://api.trongrid.io",
        privateKey: await getPrivateKeyFromDB(chatId),
    });
    const { walletAddress } = userState[chatId];
    const fromAddress = await getWalletAddress(chatId);
    const amount = parseFloat(text);
    try {
        const transaction = await tronWeb.transactionBuilder.sendTrx(walletAddress, tronWeb.toSun(amount), fromAddress);
        const signedTxn = await tronWeb.trx.sign(transaction);
        const receipt = await tronWeb.trx.sendRawTransaction(signedTxn);
        return receipt.result
            ? sendMessage(chatId, `Успешно отправлено ${amount} TRX с ${fromAddress} на ${walletAddress}`, menu)
            : sendMessage(chatId, "❌ Ошибка при отправке транзакции", menu);
    }
    catch (error) {
        console.error("Ошибка перевода:", error);
        return sendMessage(chatId, "❌ Транзакция не удалась. Попробуйте позже.", menu);
    }
};
export default cryptoWithdraw;
