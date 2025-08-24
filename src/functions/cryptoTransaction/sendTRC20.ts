import dotenv from "dotenv";
import { SendTRC20 } from "./interface.js";
import { sendMessage } from "@/functions/index.js";
import { CONTRACTS, TOKEN_DECIMALS } from "./dataTokens.js";
import { menu } from "./menu.js";

dotenv.config();

const ESCROW_ADDRESS = process.env.ESCROW_ADDRESS || "";

const sendTRC20: SendTRC20 = async (sendTRC20Props) => {
  const { tronWebUser, crypto, amount, sumToPay, chatId } = sendTRC20Props;

  const contract = await tronWebUser.contract().at(CONTRACTS[crypto]);
  const amountWithDecimals = new BigNumber(amount).multipliedBy(
    10 ** TOKEN_DECIMALS[crypto]
  );

  await contract.methods
    .transfer(ESCROW_ADDRESS, amountWithDecimals.toFixed())
    .send();

  return sendMessage(
    chatId,
    `✅ Успiшно! Криптовалюта перемещiна в ескроу. Очiкує підтвердження вiд покупця про вiдправку коштiв.\n
    Оголошення #1001
    Продали: ${amount}
    Сума: ${sumToPay}
    Статус: Виконується
    Реквiзити для оплати переданi покупцевi.
    Термін дiï: 30хв
    ! На цьому етапi угоду скасувати неможливо, вона проходить через блокчейн.`,
    menu
  );
};

export default sendTRC20;
