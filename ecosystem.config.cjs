module.exports = {
  apps: [
    {
      name: "index",
      script: "dist/index.js",
      instances: 1,
      exec_mode: "fork",
      watch: false,
    },
    {
      name: "bot",
      script: "dist/bot.js",
      instances: 1,
      exec_mode: "fork",
      watch: false,
    },
  ],
};
