import { handleCardClick } from "./index.js"


class Card {
  constructor (data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const newCardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return newCardElement;
  }

  generateCard () {
    this._element = this._getTemplate();
    this._elementTitle = this._element.querySelector(".element__title");
    this._elementImage = this._element.querySelector(".element__photo");
    this._deleteButton = this._element.querySelector(".element__delete-button");
    this._likeButton = this._element.querySelector(".element__like-button");
    this._setEventListeners ();

    this._elementTitle.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    return this._element;
  }

  _setEventListeners(){
    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });
  
    this._likeButton.addEventListener('click', () => {
      this._likeCard();
    });

    this._elementImage.addEventListener('click', () => {
      
      handleCardClick(this._name, this._link);
    });
  }

  _deleteCard() {
    this._element.remove();
  }

  _likeCard() {
    this._likeButton.classList.toggle("element__like-button_active");
  }
}

export { Card };