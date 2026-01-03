const createKeyBoard = (id: number) => {
  return [
    [{ text: "Редагувати", callback_data: `edit_${id}` }],
    [
      {
        text: "Зняти з публікації",
        callback_data: `unpublish_${id}`,
      },
    ],
    [{ text: "Видалити", callback_data: `delete_${id}` }],
    [{ text: "Всi оголошення", callback_data: "allOrders" }],
  ];
};

export default createKeyBoard;
