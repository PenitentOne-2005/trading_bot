module.exports = {
  apps: [
    {
      name: "index", // Название приложения
      script: "npx ts-node src/index.ts",
      instances: 1, // Количество экземпляров
      exec_mode: "fork", // В этом случае запускать по одному процессу
      watch: false, // Не отслеживать изменения
    },
    {
      name: "bot", // Название приложения
      script: "npx ts-node src/bot.ts",
      instances: 1, // Количество экземпляров
      exec_mode: "fork", // В этом случае запускать по одному процессу
      watch: false, // Не отслеживать изменения
    },
  ],
};
