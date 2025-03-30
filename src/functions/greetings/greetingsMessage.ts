import dotenv from "dotenv";
import { IgreetingsMessage } from "./interface";
import sendMessage from "../send/sendMessage";

dotenv.config();

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
