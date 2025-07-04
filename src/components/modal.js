
//обработчик на кнопку закрытия по кнопке Esc
const handleEscKeyUp = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened"); //находим открытый попап
    closeModal(popup); //закрываем открытый попап
  }
};


//открытие попапа и добавление слушателя на кнопку закрытия
const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keyup", handleEscKeyUp);
};

//закрытие попапа и удаление слушателя на кнопку закрытия
const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keyup", handleEscKeyUp);
};

//добавление слушателей на попапы
const hangListeners = (elemPopup) => {
  const closeButton = elemPopup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => closeModal(elemPopup));

  elemPopup.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("popup")) {
      closeModal(elemPopup);
    }
  });
};

export { openModal, closeModal, hangListeners};
