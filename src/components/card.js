import { deleteCardById, dislikeCardById, likeCardById } from "./api.js";

// Функция удаления карточки
function deleteCard(cardId, cardElement) {
  deleteCardById(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error("Ошибка удаления карточки", err);
    });
}

//Функция лайка карточки
function likeCard(cardId, isLiked, updateLikeUI) {
  const method = isLiked ? dislikeCardById : likeCardById;

  method(cardId)
    .then((updateCard) => {
      updateLikeUI(updateCard.likes);
    })
    .catch((err) => {
      console.error("Ошибка лайка карточки", err);
    });
}

// Функция создания карточки
function addCard(
  cardPost,
  cardDeleteCallback,
  cardLikeCallback,
  cardImageCallback,
  currentUserId
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  cardImage.src = cardPost.link;
  cardImage.alt = cardPost.name;
  cardTitle.textContent = cardPost.name;
  likeCounter.textContent = cardPost.likes.length;

  const isLiked = cardPost.likes.some((user) => user._id === currentUserId);
  if (isLiked) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardLikeButton.addEventListener("click", () => {
    const liked = cardLikeButton.classList.contains(
      "card__like-button_is-active"
    );

    cardLikeCallback(cardPost._id, liked, (updateLikes) => {
      likeCounter.textContent = updateLikes.length;
      cardLikeButton.classList.toggle("card__like-button_is-active");
    });
  });

  if (cardPost.owner._id !== currentUserId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () => {
      cardDeleteCallback(cardPost._id, cardElement);
    });
  }

  cardImage.addEventListener("click", () => {
    cardImageCallback(cardPost.link, cardPost.name);
  });

  return cardElement;
}

export { deleteCard, addCard, likeCard };
