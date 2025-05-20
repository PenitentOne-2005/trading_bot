const VALID_COMMANDS = [
  "I speak English",
  "Я розмовляю українською",
  "Не погоджуюсь",
  "Погоджуюсь",
  "Start",
  "Допомога",
  "Всі оголошення",
  "Купити криптовалюту",
  "Продати криптовалюту",
  "Назад",
  "Створити оголошення",
  "Моі оголошення",
] as const;

type ValidCommand = (typeof VALID_COMMANDS)[number];

export default ValidCommand;
