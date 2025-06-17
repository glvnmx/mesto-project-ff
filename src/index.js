// @todo: DOM узлы
import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { addCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal, hangListeners } from "./components/modal.js";

const cardList = document.querySelector(".places__list"); //находим список карточек
const editButton = document.querySelector(".profile__edit-button"); //находим кнопку редактирования профиля
const addButton = document.querySelector(".profile__add-button"); //находим кнопку добавления карточки

const popupEditProfile = document.querySelector(".popup_type_edit"); //находим попап для редактирования профиля
const popupAddCard = document.querySelector(".popup_type_new-card"); //находим попап для добавления карточки

// Находим форму в DOM
const formElementEditProfile = document.querySelector(".popup__form-edit");
const formElementAddNewCard = document.querySelector(".popup__form-card"); // Воспользуйтесь методом querySelector()

// Находим поля формы в DOM
const nameInput = formElementEditProfile.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElementEditProfile.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()

const newCardName = formElementAddNewCard.querySelector(".popup__input_type_card-name");
const newCardUrl = formElementAddNewCard.querySelector(".popup__input_type_url");

const popupImage = document.querySelector(".popup_type_image"); //находим попап для изменения аватара
const popupImageUrl = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption"); //находим элемент для подписи изображения

//Выбор элементов, куда должны быть вставлены значения полей
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

// @todo: функция открытия попапа c изображением
function openImagePopup(link, caption) {
  popupImageUrl.src = link;
  popupImageUrl.alt = caption;
  popupImageCaption.textContent = caption;
  openModal(popupImage);
}

// @todo: слушатели для формы добавления карточки
formElementAddNewCard.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const cardData = {
    name: newCardName.value,
    link: newCardUrl.value,
  };

  const newCard = addCard(cardData, deleteCard, likeCard);

  cardList.prepend(newCard);

  closeModal(popupAddCard);
  formElementAddNewCard.reset();
});

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  const jobValue = jobInput.value;
  const nameValue = nameInput.value;

  //Вставка новых значений с помощью textContent
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;

  formElementEditProfile.reset();
  closeModal(popupEditProfile);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementEditProfile.addEventListener("submit", handleProfileFormSubmit);

hangListeners(popupEditProfile); //добавляем слушатели на кнопку закрытия и нажатие вне попапа для попапа редактирования профиля
hangListeners(popupAddCard);
hangListeners(popupImage);

editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  
  openModal(popupEditProfile);
});

addButton.addEventListener("click", () => {
  openModal(popupAddCard);
});

// @todo: Вывести карточки на страницу
initialCards.forEach((cardPost) => {
  cardList.appendChild(addCard(cardPost, deleteCard, likeCard, openImagePopup));
});
