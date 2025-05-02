import dotenv from "dotenv";

dotenv.config({ path: "/root/trading_bot/.env" });

import { IgreetingsMessage } from "./interface.js";
import sendMessage from "../send/sendMessage.js";

const greetings = process.env.GREETINGS;
if (!greetings) {
  console.error(
    "❌ GREETINGS не найден! Убедитесь, что он задан в .env файле."
  );
  process.exit(1);
}

const greetingsMessage: IgreetingsMessage = (msg) => {
  sendMessage(msg.chat.id, greetings);
};

export default greetingsMessage;
