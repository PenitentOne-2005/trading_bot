module.exports = {
  apps: [
    {
      name: "index", // Название приложения
      script: "npx ts-node src/index.ts",
      instances: 1, // Количество экземпляров
      exec_mode: "fork", // В этом случае запускать по одному процессу
      watch: false, // Не отслеживать изменения
      env_production: {
        BOT_TOKEN: process.env.BOT_TOKEN,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME,
        ESCROW_ADDRESS: process.env.ESCROW_ADDRESS,
        ESCROW_KEY: process.env.ESCROW_KEY,
        QUICKNODE_RPC: process.env.QUICKNODE_RPC,
        ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
        TRONGRID_API_KEY: process.env.TRONGRID_API_KEY,
        GREETINGS: process.env.GREETINGS,
      },
    },
    {
      name: "bot", // Название приложения
      script: "npx ts-node src/bot.ts",
      instances: 1, // Количество экземпляров
      exec_mode: "fork", // В этом случае запускать по одному процессу
      watch: false, // Не отслеживать изменения
      env_production: {
        BOT_TOKEN: process.env.BOT_TOKEN,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME,
        ESCROW_ADDRESS: process.env.ESCROW_ADDRESS,
        ESCROW_KEY: process.env.ESCROW_KEY,
        QUICKNODE_RPC: process.env.QUICKNODE_RPC,
        ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
        TRONGRID_API_KEY: process.env.TRONGRID_API_KEY,
        GREETINGS: process.env.GREETINGS,
      },
    },
  ],
};
