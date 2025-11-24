import { sendMessage } from "../../functions/index.js";
const sendEscrowMessages = async (sellerChatId, buyerChatId, payload) => {
    const { amount, sumToPay, orderId, metadata } = payload;
    sendMessage(sellerChatId, `✅ Успiшно!
        Криптовалюта перемещiна в ескроу. Очiкує підтвердження вiд покупця про вiдправку коштiв.
          Оголошення #1001
          Продали: ${amount}
          Сума: ${sumToPay}
          Статус: Виконується
          Реквiзити для оплати переданi покупцевi.
            Термін дiï: 30хв
          ! На цьому етапi угоду скасувати неможливо, вона проходить через блокчейн.`, {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "📃 Пiдтвердити отримання грошей",
                        callback_data: `agree_get_${orderId}`,
                    },
                ],
                [{ text: "ℹ️ Моï замовлення", callback_data: "myOrders" }],
            ],
        },
    });
    return sendMessage(buyerChatId, `Надiшлiть ${sumToPay} UAH продавцю за наступними реквiзитами:
        
        Сума ${amount} USDT переведена в ескроу контракт, що очiкує пiдтвердження отримання оплати вiд продавця.
        
        Спосiб оплати: IBAN
        Номер IBAN: ${metadata.IBAN}
        Отримувач: ${metadata.name}
         Термiн дiï: 30хв
        Пiдтверждуєте, що надiслали кошти?`, {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Так, я надiслав(ла) оплату",
                        callback_data: "agree_sent",
                    },
                ],
                [{ text: "Скасувати", callback_data: "cancel" }],
            ],
        },
    });
};
export default sendEscrowMessages;
