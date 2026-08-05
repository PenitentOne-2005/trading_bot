# 💱 Trading Bot

A Telegram bot for cryptocurrency trading on the Tron network. Lets users purchase crypto, check balances, and manage wallets directly through Telegram, with dynamic menus and commands for a smooth chat-based experience.

## Features

- **Buy crypto** directly through Telegram
- **Dynamic menus and commands** for intuitive in-chat navigation
- **Tron blockchain integration** — wallet and transaction handling via TronWeb
- **Concurrency-safe transactions** — PostgreSQL transactionality ensures two users can't claim the same request at once, with retry logic for network failures
- **User data storage** — sessions and transaction history persisted in PostgreSQL

## 🚀 Technologies

- **Node.js / TypeScript / Express.js**
- **Telegram Bot API**
- **TronWeb + QuickNode** — for interacting with the Tron blockchain
- **PostgreSQL** — storing user and transaction data

Made with ❤️ by [PenitentOne-2005](https://github.com/PenitentOne-2005)
