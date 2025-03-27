import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { createWallet } from "./createWallet";
import { saveUser } from "./saveUser";
import { getWalletBalance } from "./getWalletBalance";
import { isUserRegistered } from "./isUserRegistered";
import { encryptPrivateKey } from "./encryptPrivateKey";

dotenv.config();

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error(
    "Токен не найден! Убедитесь, что BOT_TOKEN задан в .env файле."
  );
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text?.startsWith("/")) {
    bot.sendMessage(chatId, `Ты написал: ${text}`);
  }
});

bot.onText(/\/register/, async (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from?.username || "Неизвестный";

  const isRegistered = await isUserRegistered(chatId);

  if (isRegistered) {
    bot.sendMessage(chatId, "Ты уже зарегистрирован! 🚀");
    return;
  }

  const result = await createWallet();

  if (result) {
    const { privateKey, wallet } = result;

    const encryptedPrivateKey = encryptPrivateKey(privateKey);

    await saveUser(chatId, username, wallet.address, encryptedPrivateKey);

    bot.sendMessage(
      chatId,
      `Твой кошелек был создан: ${wallet.address.base58}`
    );
  } else {
    bot.sendMessage(chatId, "Не удалось создать кошелек. Попробуй позже.");
  }
});

bot.onText(/\/show/, async (msg) => {
  const chatId = msg.chat.id;

  const walletBalance = await getWalletBalance();
  bot.sendMessage(chatId, `Your balance: ${walletBalance}`);
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Welcome to p2p exchange telegram bot, a decentralized P2P exchange bot that allows users to securely trade cryptocurrency for fiat without relying on centralized platforms."
  );
});

bot.on("polling_error", (error) => {
  console.error("Ошибка при опросе бота:", error);
});
