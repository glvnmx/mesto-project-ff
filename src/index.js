// @todo: DOM узлы
import "./pages/index.css";
import { addCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal, hangListeners } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUserData,
  getInitialCards,
  editUserData,
  addNewCard,
  deleteCardById,
  likeCardById,
  dislikeCardById,
  changeAvatar,
} from "./components/api.js";

const cardList = document.querySelector(".places__list"); //находим список карточек
const editButton = document.querySelector(".profile__edit-button"); //находим кнопку редактирования профиля
const addButton = document.querySelector(".profile__add-button"); //находим кнопку добавления карточки
const avatarEdit = document.querySelector(".profile__image"); //находим аватарку

const popupEditProfile = document.querySelector(".popup_type_edit"); //находим попап для редактирования профиля
const popupAddCard = document.querySelector(".popup_type_new-card"); //находим попап для добавления карточки
const popupAvatar = document.querySelector(".popup_change-avatar");

// Находим форму в DOM
const formElementEditProfile = document.querySelector(".popup__form-edit");
const formElementAddNewCard = document.querySelector(".popup__form-card"); // Воспользуйтесь методом querySelector()
const formElementEditAvatar = document.querySelector(".popup__form-avatar");

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
const avatarInput = formElementEditAvatar.querySelector(
  ".popup__input_type_avatar"
);

const popupImage = document.querySelector(".popup_type_image");
const popupImageUrl = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption"); //находим элемент для подписи изображения

//Выбор элементов, куда должны быть вставлены значения полей
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
let currentUserId;

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function renderIsLoading(buttonElement, isLoading) {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
  } else {
    buttonElement.textContent = "Сохранить";
  }
}

enableValidation(validationConfig); //Включаем валидацию

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

  const button = evt.target.querySelector(".popup__button");
  renderIsLoading(button, true);

  const cardData = {
    name: newCardName.value,
    link: newCardUrl.value,
  };

  addNewCard(cardData)
    .then((newCardFromServer) => {
      const newCard = addCard(
        newCardFromServer,
        deleteCard,
        likeCard,
        openImagePopup,
        currentUserId
      );
      cardList.prepend(newCard);
      closeModal(popupAddCard);
      formElementAddNewCard.reset();
    })
    .catch((err) => {
      console.error("Произошла ошибка при добавлении карточки", err);
    })
    .finally(() => {
      renderIsLoading(button, false);
    });
});

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  const button = evt.target.querySelector(".popup__button");
  renderIsLoading(button, true);

  // Получите значение полей jobInput и nameInput из свойства value
  const jobValue = jobInput.value;
  const nameValue = nameInput.value;

  editUserData({ name: nameValue, about: jobValue })
    .then((data) => {
      profileName.textContent = data.name;
      profileJob.textContent = data.about;
      formElementEditProfile.reset();
      closeModal(popupEditProfile);
    })
    .catch((err) => {
      console.error("Произошла ошибка при отправке данных пользователя", err);
    })
    .finally(() => {
      renderIsLoading(button, false);
    });

  //Вставка новых значений с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementEditProfile.addEventListener("submit", handleProfileFormSubmit);

hangListeners(popupEditProfile); //добавляем слушатели на кнопку закрытия и нажатие вне попапа для попапа редактирования профиля
hangListeners(popupAddCard);
hangListeners(popupImage);
hangListeners(popupAvatar); //добавляем слушатели на кнопку закрытия и нажатие вне попапа для попапа смены аватара

editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  clearValidation(formElementEditProfile, validationConfig);
  openModal(popupEditProfile);
});

addButton.addEventListener("click", () => {
  clearValidation(formElementAddNewCard, validationConfig);
  openModal(popupAddCard);
  formElementAddNewCard.reset();
});

avatarEdit.addEventListener("click", () => {
  clearValidation(formElementEditAvatar, validationConfig);
  openModal(popupAvatar);
  formElementEditAvatar.reset();
});

formElementEditAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const button = evt.target.querySelector(".popup__button");
  renderIsLoading(button, true);

  const avatarUrl = avatarInput.value;

  changeAvatar({ avatar: avatarUrl })
    .then((userData) => {
      avatarEdit.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(popupAvatar);
      formElementEditAvatar.reset();
    })
    .catch((err) => {
      console.error("Произошла ошибка при загрузке данных пользователя", err);
    })
    .finally(() => {
      renderIsLoading(button, false);
    });
});

getUserData()
  .then((userData) => {
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    avatarEdit.style.backgroundImage = `url(${userData.avatar})`;
    currentUserId = userData._id;
  })
  .catch((err) => {
    console.error("Произошла ошибка при загрузке данных пользователя", err);
  });

getInitialCards()
  .then((cards) => {
    cards.reverse().forEach((cardData) => {
      cardList.appendChild(
        addCard(cardData, deleteCard, likeCard, openImagePopup, currentUserId)
      );
    });
  })
  .catch((err) => {
    console.error("Произошла ошибка при загрузке карточек", err);
  });

// @todo: Вывести карточки на страницу

// initialCards.forEach((cardPost) => {
//   cardList.appendChild(addCard(cardPost, deleteCard, likeCard, openImagePopup));
// });
