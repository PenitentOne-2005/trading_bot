import { SendMessageOptions } from "node-telegram-bot-api";

export const selectLanguageBoard: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "I speak English", callback_data: "lang_en" }],
      [{ text: "Я розмовляю українською", callback_data: "lang_ua" }],
    ],
  },
};
