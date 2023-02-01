export class Card {
  constructor ({data, handleCardClick}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._buttonLike = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._elementTitle = this._element.querySelector(".element__title");
    this._elementImage = this._element.querySelector(".element__photo");
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
  
    this._buttonLike.addEventListener('click', () => {
      this._likeCard();
    });
    
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);

    });
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _likeCard() {
    this._buttonLike.classList.toggle("element__like-button_active");
  }
}



 /* _openPopupFullScreenPhoto() {
    openPopup(popupFullScreenPhoto);
  }*/

  /*_transmitInformation() {
    const photoElementPopup = popupFullScreenPhoto.querySelector(".popup__photo");
    const photoTitleElementPopup = popupFullScreenPhoto.querySelector(".popup__photo-title");

    photoElementPopup.src = this._link;
    photoTitleElementPopup.textContent = this._name;
    photoElementPopup.alt = this._name;
  }*/
