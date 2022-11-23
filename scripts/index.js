const editButtonElement = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const popupClosedElement = document.querySelector('.popup__closed-button');
const popupFormElement = popupElement.querySelector('.popup__form');
const nameInput = popupFormElement.querySelector('.popup__form-data_type_name');
const descriptionInput = popupFormElement.querySelector('.popup__form-data_type_description');
const userName = document.querySelector('.profile__user-name');
const userDescription = document.querySelector('.profile__user-description');


const addCardPopup = document.querySelector('.popup_type_add-card');
const addCardButtonElement = document.querySelector('.profile__add-button');
const popupCardFormElement = addCardPopup.querySelector('.popup__form_type_add-card');
const closeButtonCardPopup = addCardPopup.querySelector('.popup__closed-button');
const titleInput = popupCardFormElement.querySelector('.popup__form-data_type_card-title');
const linkInput = popupCardFormElement.querySelector('.popup__form-data_type_card-link');
const cardList = document.querySelector('.elements__list');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
]; 

const cardTemlate = document.querySelector('#card__template').content.querySelector('.element');
const fullScreenPhotoPopup = document.querySelector('.popup_type_fullscreen-photo');
const popupPhoto = fullScreenPhotoPopup.querySelector('.popup__photo');
const fullScreenCloseButton = fullScreenPhotoPopup.querySelector('.popup__closed-button');
const popupPhotoTitle = fullScreenPhotoPopup.querySelector('.popup__photo-title');


const generateCard = (element) => {
  const newCardElement = cardTemlate.cloneNode(true);

  const titleElement = newCardElement.querySelector('.element__title');
  const photoElement = newCardElement.querySelector('.element__photo');
  titleElement.textContent = element.name;
  photoElement.src = element.link;

  const deleteCardButton = newCardElement.querySelector('.element__delete-button');
  deleteCardButton.addEventListener('click', function (event) {
    event.target.closest('.element').remove();
  });
  
  const likeCardButton = newCardElement.querySelector('.element__like-button');
  likeCardButton.addEventListener('click', function (event) {
    event.target.classList.toggle('element__like-button_active');
  });

  photoElement.addEventListener('click', function () {
    popupPhoto.src = element.link;
    popupPhotoTitle.textContent = element.name;
    fullScreenPhotoPopup.classList.add('popup_opened');
  });
  
return newCardElement;
};


const renderCard = (element) => {
  cardList.prepend(generateCard(element));
};

initialCards.forEach((element) => {
  renderCard(element);
});

function profileOpenClick () {
  nameInput.value = userName.textContent; 
  descriptionInput.value = userDescription.textContent;
  popupElement.classList.add('popup_opened');
};

function addCardOpenClick () {
  titleInput.value = '';
  linkInput.value = '';
  addCardPopup.classList.add('popup_opened');
};

function popupCloseClick () {
  popupElement.classList.remove('popup_opened');
  addCardPopup.classList.remove('popup_opened');
  fullScreenPhotoPopup.classList.remove('popup_opened');
};

function formSubmitHandler (event) {
  event.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  popupCloseClick();
};

function addCardSubmitHandler (event) {
  event.preventDefault();
  const cardTitle = titleInput.value;
  const cardLink = linkInput.value;
  renderCard({name: `${cardTitle}`, link: `${cardLink}`});
  popupCloseClick();
};

editButtonElement.addEventListener('click', profileOpenClick);
popupClosedElement.addEventListener('click', popupCloseClick);
addCardButtonElement.addEventListener('click', addCardOpenClick);
closeButtonCardPopup.addEventListener('click', popupCloseClick);
popupFormElement.addEventListener('submit', formSubmitHandler);
popupCardFormElement.addEventListener('submit', addCardSubmitHandler);
fullScreenCloseButton.addEventListener('click', popupCloseClick);