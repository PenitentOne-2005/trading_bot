import { sendMessage } from "../../../functions/index.js";
const getTokenBalance = async (props) => {
    const { chatId, tronWeb, walletAddress, tokenAddress, decimals } = props;
    try {
        const contract = await tronWeb.contract().at(tokenAddress);
        const balance = await contract.balanceOf(walletAddress).call({
            from: walletAddress,
        });
        return Number(balance.toString()) / Math.pow(10, decimals);
    }
    catch (e) {
        console.error(`Ошибка при получении токена ${tokenAddress}:`, e.message);
        sendMessage(chatId, `❌ Ошибка при получении токена ${tokenAddress}`);
        return 0;
    }
};
export default getTokenBalance;
