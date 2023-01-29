
export class Card {
  constructor ({data, handleCardClick}, cardSelector) {
    this.name = data.name;
    this.link = data.link;
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
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
    this._setEventListeners ();

    this._elementTitle.textContent = this.name;
    this._elementImage.src = this.link;
    this._elementImage.alt = this.name;

    return this._element;
  }

  _setEventListeners(){
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._deleteCard();
    });
  
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._likeCard();
    });
    
    this._elementImage.addEventListener('click', () => {
      this.handleCardClick(this.name, this.link);

    });
  }

  _deleteCard() {
    this._element.remove();
  }

  _likeCard() {
    this._element.querySelector(".element__like-button").classList.toggle("element__like-button_active");
  }

  _openPopupFullScreenPhoto() {
    openPopup(popupFullScreenPhoto);
  }

  _transmitInformation() {
    const photoElementPopup = popupFullScreenPhoto.querySelector(".popup__photo");
    const photoTitleElementPopup = popupFullScreenPhoto.querySelector(".popup__photo-title");

    photoElementPopup.src = this._link;
    photoTitleElementPopup.textContent = this._name;
    photoElementPopup.alt = this._name;
  }
}