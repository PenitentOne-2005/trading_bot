import dotenv from "dotenv";

dotenv.config({ path: "/root/trading_bot/.env" });

import { IgreetingsMessage } from "./interface.js";
import sendMessage from "../send/sendMessage.js";
import { mainMenu } from "../../commandKeyboard.js";

const greetings = process.env.GREETINGS;
if (!greetings) {
  console.error(
    "❌ GREETINGS не найден! Убедитесь, что он задан в .env файле."
  );
  process.exit(1);
}

const greetingsMessage: IgreetingsMessage = (msg) => {
  sendMessage(
    msg.chat.id,
    "🚀 Добро пожаловать в P2P Exchange Bot! Я позволяю безопасно обменивать криптовалюту без посредников.",
    mainMenu
  );
};

export default greetingsMessage;
