import dotenv from "dotenv";
import { SendTRC20 } from "./interface.js";
import { sendMessage } from "@/functions/index.js";
import { CONTRACTS, TOKEN_DECIMALS } from "./dataTokens.js";
import waitForConfirmation from "./waitForConfirmation.js";

dotenv.config();

const ESCROW_ADDRESS = process.env.ESCROW_ADDRESS || "";

const sendTRC20: SendTRC20 = async (sendTRC20Props) => {
  try {
    const {
      tronWebUser,
      cryptoValidate,
      amountValidate,
      sumToPay,
      chatId,
      orderId,
    } = sendTRC20Props;

    const contract = await tronWebUser.contract().at(CONTRACTS[cryptoValidate]);
    const amountWithDecimals = new BigNumber(amountValidate).multipliedBy(
      10 ** TOKEN_DECIMALS[cryptoValidate],
    );

    const txid = await contract.methods
      .transfer(ESCROW_ADDRESS, amountWithDecimals.toFixed())
      .send();

    if (!txid) {
      throw new Error("sendTRC20: Transaction failed");
    }

    await waitForConfirmation(tronWebUser, txid);

    return sendMessage(
      chatId,
      `✅ Успiшно!
    Криптовалюта перемещiна в ескроу. Очiкує підтвердження вiд покупця про вiдправку коштiв.
      Оголошення: ${orderId}
      Продали: ${amountValidate}
      Сума: ${sumToPay}
      Статус: Виконується
    Реквiзити для оплати переданi покупцевi.
      Термін дiï: 30хв
    ! На цьому етапi угоду скасувати неможливо, вона проходить через блокчейн.`,
      {
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
      },
    );
  } catch (error) {
    console.error("sendTRC20: ❌ Помилка при вiдправцi TRC20:", error);
    return;
  }
};

export default sendTRC20;
