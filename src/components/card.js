// Функция удаления карточки
import { openImagePopup } from "./modal.js";

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

//Функция лайка карточки
function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

// Функция создания карточки
function addCard(cardPost, cardDeleteCallback, cardLikeCallback, cardImageCallback) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardPost.link;
  cardImage.alt = cardPost.name;
  cardTitle.textContent = cardPost.name;

  cardLikeButton.addEventListener("click", cardLikeCallback);

  deleteButton.addEventListener("click", cardDeleteCallback);

  cardImage.addEventListener("click", () => {
    cardImageCallback(cardPost.link, cardPost.name)
  })

  return cardElement;
}

export { deleteCard, addCard, likeCard };