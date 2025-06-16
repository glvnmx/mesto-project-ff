// @todo: DOM узлы
import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { addCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal, hangListeners, openImagePopup } from "./components/modal.js";
import { popupImage } from "./components/modal.js";

const cardList = document.querySelector(".places__list"); //находим список карточек
const editButton = document.querySelector(".profile__edit-button"); //находим кнопку редактирования профиля
const addButton = document.querySelector(".profile__add-button"); //находим кнопку добавления карточки

const popupEditProfile = document.querySelector(".popup_type_edit"); //находим попап для редактирования профиля
const popupAddCard = document.querySelector(".popup_type_new-card"); //находим попап для добавления карточки



// Находим форму в DOM
const formElementEditProfile = document.querySelector(".popup__form-edit");
const formElementAddNewCard = document.querySelector(".popup__form-card"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElementEditProfile.querySelector(
  ".popup__input_type_name"
); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElementEditProfile.querySelector(
  ".popup__input_type_description"
); // Воспользуйтесь инструментом .querySelector()
const newCardName = formElementAddNewCard.querySelector(
  ".popup__input_type_card-name"
);
const newCardUrl = formElementAddNewCard.querySelector(
  ".popup__input_type_url"
);

formElementAddNewCard.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const cardData = {
    name: newCardName.value,
    link: newCardUrl.value,
  };

  const newCard = addCard(cardData, deleteCard, likeCard, openImagePopup);

  cardList.prepend(newCard);

  closeModal(popupAddCard);
  formElementAddNewCard.reset();
});

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  let jobValue = jobInput.value;
  let nameValue = nameInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  let profileName = document.querySelector(".profile__title");
  let profileJob = document.querySelector(".profile__description");
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;

  formElementEditProfile.reset();
  closeModal(popupEditProfile);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementEditProfile.addEventListener("submit", handleFormSubmit);

hangListeners(popupEditProfile); //добавляем слушатели на кнопку закрытия и нажатие вне попапа для попапа редактирования профиля
hangListeners(popupAddCard);
hangListeners(popupImage);

editButton.addEventListener("click", () => {
  openModal(popupEditProfile);
});

addButton.addEventListener("click", () => {
  openModal(popupAddCard);
});


// @todo: Вывести карточки на страницу
initialCards.forEach((cardPost) => {
  cardList.appendChild(addCard(cardPost, deleteCard, likeCard, openImagePopup));
});
