
// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

// @todo: Функция создания карточки
// @todo: Темплейт карточки
function addCard(cardPost, cardDeleteCallback) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardPost.link;
  cardImage.alt = cardPost.name;
  cardTitle.textContent = cardPost.name;

  deleteButton.addEventListener("click", cardDeleteCallback);

  return cardElement;
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardPost) => {
  cardList.appendChild(addCard(cardPost, deleteCard));
})








