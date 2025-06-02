const menu = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "Так, опублікувати",
          callback_data: "confirm_buy_order",
        },
      ],
      [
        {
          text: "Скасувати",
          callback_data: "cancel_buy_order",
        },
      ],
      [{ text: "Назад", callback_data: "back" }],
    ],
  },
};

export default menu;
