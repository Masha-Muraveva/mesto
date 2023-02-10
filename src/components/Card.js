export class Card {
  constructor ({data, userId, handleCardClick, handleDeleteCardClick, handleLikeCardClick, handleUnlikeCardClick}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleLikeCardClick = handleLikeCardClick;
    this._handleUnlikeCardClick = handleUnlikeCardClick;
    this._userId = userId;
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
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._likeCounter.textContent = this._likes.length;
    this._buttonDelete = this._element.querySelector('.element__delete-button');
    this._elementTitle = this._element.querySelector('.element__title');
    this._elementImage = this._element.querySelector('.element__photo');
    this._сheckActiveLike();
    this._checkCardOwner();
    this._setEventListeners();

    this._elementTitle.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteCardClick(this._cardId);
    });
  
    this._buttonLike.addEventListener('click', () => {
      this._likeCard();
    });
    
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);

    });
  }


  //Для удаления:

  _checkCardOwner() {
    if (this._ownerId !== this._userId) {
      this._buttonDelete.classList.add('element__delete-button_unavailable');
    } else {
      this._buttonDelete.classList.remove('element__delete-button_unavailable');
    }
  }
  deleteCard() {
    this._element.remove();
    this._element = null;
  }
  

  //Для управления лайками:

  _isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  _сheckActiveLike() {
    if (this._isLiked()) {
      this._buttonLike.classList.add('element__like-button_active');
    } else {
      this._buttonLike.classList.remove('element__like-button_active');
    }
  }

  _likeCard = () => {
    if (this._isLiked()) {
      this._handleUnlikeCardClick(this._cardId);
    } else {
      this._handleLikeCardClick(this._cardId);
    }
  }

  getLikesFromServer = (response) => {
    this._likes = response.likes;
    this._likeCounter.textContent = this._likes.length;
    this._сheckActiveLike(this._likes);
  }
}