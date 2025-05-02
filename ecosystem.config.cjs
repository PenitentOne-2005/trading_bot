module.exports = {
  apps: [
    {
      name: "index",
      script: "dist/index.js",
      cwd: "/root/trading_bot",
      instances: 1,
      exec_mode: "fork",
      watch: false,
    },
    {
      name: "bot",
      script: "dist/bot.js",
      cwd: "/root/trading_bot",
      instances: 1,
      exec_mode: "fork",
      watch: false,
    },
  ],
};
