import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error(
    "Токен не найден! Убедитесь, что BOT_TOKEN задан в .env файле."
  );
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

console.log("Бот запущен и слушает сообщения..."); // Выводим сообщение при старте

// Обработка сообщений
bot.on("message", (msg) => {
  console.log("Получено сообщение:", msg); // Выводим полученное сообщение
  const chatId = msg.chat.id;
  const text = msg.text;

  // Ответ на каждое сообщение
  bot.sendMessage(chatId, `Ты написал: ${text}`);
});

// Обработка команд
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Привет! Я твой бот. Чем могу помочь?");
  console.log("/start команда получена от пользователя", msg.chat.id); // Логируем команду
});

// Обработка ошибок
bot.on("polling_error", (error) => {
  console.error("Ошибка при опросе бота:", error);
});
