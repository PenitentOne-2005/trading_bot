const stepConfigs = {
    waitingForIBAN: {
        step: "waitingForIBAN",
        nextStep: "waitingForIPN",
        field: "IBAN",
        label: "Введіть індивідуальний податковий номер (ІПН):",
        regExp: /^UA\d{2}\d{6}\d{19}$/,
        errorMsg: "❌ Помилка! Невірний формат IBAN.\nIBAN повинен починатися з 'UA' та містити 29 символів.",
    },
    waitingForIPN: {
        step: "waitingForIPN",
        nextStep: "waitingForName",
        field: "IPN",
        label: "Введіть прізвище, ім'я та по батькові власника рахунку:",
        regExp: /^[1-9]\d{9}$/,
        errorMsg: "❌ Помилка! Неправильний формат податкового номера.\nІПН повинен містити рівно 10 цифр.",
    },
};
export default stepConfigs;
