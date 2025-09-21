const promptWithdrawAmount = async (chatId, data, userState) => {
    const { sendMessage } = await import("../../functions/index.js");
    const crypto = data?.replace("withdraw_", "");
    const { balance } = userState[chatId];
    userState[chatId] = {
        ...userState[chatId],
        step: "cryptoWithdraw",
        crypto,
    };
    sendMessage(chatId, `
    Введiть суму для виводу
    Ваш поточний баланс: ${balance?.[crypto]} ${crypto}
    Мiнiмальний баланс TRX для комiсiй: 1 ${crypto}

    Введiть суму ${crypto}, яку хочете вивести:
    `);
};
export default promptWithdrawAmount;
