import dotenv from "dotenv";
dotenv.config();

export default {
  apps: [
    {
      name: "index",
      script: "dist/index.mjs",
      instances: 1,
      exec_mode: "fork",
      watch: false,
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
      name: "bot",
      script: "dist/bot.mjs",
      instances: 1,
      exec_mode: "fork",
      watch: false,
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
