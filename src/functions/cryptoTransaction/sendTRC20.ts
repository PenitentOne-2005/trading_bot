import dotenv from "dotenv";
import { SendTRC20 } from "./interface.js";
import { sendMessage } from "@/functions/index.js";
import { CONTRACTS, TOKEN_DECIMALS } from "./dataTokens.js";
import { menu } from "./menu.js";

dotenv.config();

const ESCROW_ADDRESS = process.env.ESCROW_ADDRESS || "";

const sendTRC20: SendTRC20 = async (sendTRC20Props) => {
  try {
    const { tronWebUser, cryptoValidate, amountValidate, sumToPay, chatId } =
      sendTRC20Props;

    const contract = await tronWebUser.contract().at(CONTRACTS[cryptoValidate]);
    const amountWithDecimals = new BigNumber(amountValidate).multipliedBy(
      10 ** TOKEN_DECIMALS[cryptoValidate],
    );

    await contract.methods
      .transfer(ESCROW_ADDRESS, amountWithDecimals.toFixed())
      .send();

    return sendMessage(
      chatId,
      `✅ Успiшно!
    Криптовалюта перемещiна в ескроу. Очiкує підтвердження вiд покупця про вiдправку коштiв.
      Оголошення #1001
      Продали: ${amountValidate}
      Сума: ${sumToPay}
      Статус: Виконується
    Реквiзити для оплати переданi покупцевi.
      Термін дiï: 30хв
    ! На цьому етапi угоду скасувати неможливо, вона проходить через блокчейн.`,
      menu,
    );
  } catch (error) {
    console.error("❌ Помилка при вiдправцi TRC20:", error);
    return;
  }
};

export default sendTRC20;
