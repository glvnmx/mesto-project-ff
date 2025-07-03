//Показ ошибки под полем ввода
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error-visible");
};

//Скрытие ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__error-visible");
  errorElement.textContent = "";
};

//Проверка на наличие невалидных полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

//Включение/отключение кнопки отправки формы
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button-disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button-disabled");
  }
};

//Очистка формы
const clearValidation = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  inputList.forEach((inputElement) => {
    inputElement.setCustomValidity("");
    hideInputError(formElement, inputElement);
  });

  toggleButtonState(inputList, buttonElement);
};


//Валидация
const checkInputValidity = (formElement, inputElement) => {
  const allowedPattern = /^[A-Za-zа-яА-ЯёЁ\s\-]+$/;
  const customErrorMessage = inputElement.dataset.errorMessage;
  if (customErrorMessage) {
    if (!allowedPattern.test(inputElement.value)) {
      inputElement.setCustomValidity(
        customErrorMessage || "Недопустимые символы"
      );
    } else {
      inputElement.setCustomValidity("");
    }
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};


//Слушатели событий для валидации полей в формах и отправки формы
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

//Включение валидации
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll("form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    setEventListeners(formElement);
  });
};

export { enableValidation, clearValidation };
