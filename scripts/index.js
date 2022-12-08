const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const popupFullScreenPhoto = document.querySelector('.popup_type_fullscreen-photo');
const userName = document.querySelector('.profile__user-name');
const userDescription = document.querySelector('.profile__user-description');
const cardList = document.querySelector('.elements__list');


const formProfilePopup = popupEditProfile.querySelector('.popup__form_type_edit-profile');
const buttonCloseEditProfilePopup = popupEditProfile.querySelector('.popup__closed-button_type_profile');
const nameInput = formProfilePopup.querySelector('.popup__form-data_type_name');
const descriptionInput = formProfilePopup.querySelector('.popup__form-data_type_description');
const formTypeProfile = popupEditProfile.querySelector('.popup__form_type_edit-profile');

const formAddCardPopup = popupAddCard.querySelector('.popup__form_type_add-card');
const buttonCloseAddCardPopup = popupAddCard.querySelector('.popup__closed-button_type_add-card');
const titleInput = formAddCardPopup.querySelector('.popup__form-data_type_card-title');
const linkInput = formAddCardPopup.querySelector('.popup__form-data_type_card-link');
const formTypeAddCard = popupAddCard.querySelector('.popup__form_type_edit-profile');


const buttonCloseFullScreenPopup = popupFullScreenPhoto.querySelector('.popup__closed-button_type_fullscreen');
const photoElementPopup = popupFullScreenPhoto.querySelector('.popup__photo');
const photoTitleElementPopup = popupFullScreenPhoto.querySelector('.popup__photo-title');

const cardTemlate = document.querySelector('#card__template').content.querySelector('.element');
const generateCard = (element) => {
  const newCardElement = cardTemlate.cloneNode(true);
  const titleElement = newCardElement.querySelector('.element__title');
  const photoElement = newCardElement.querySelector('.element__photo');
  titleElement.textContent = element.name;
  photoElement.src = element.link;
  photoElement.alt = element.name;

  const buttonDeleteCard = newCardElement.querySelector('.element__delete-button');
  buttonDeleteCard.addEventListener('click', function (event) {
    event.target.closest('.element').remove();
  });
  
  const likeCardButton = newCardElement.querySelector('.element__like-button');
  likeCardButton.addEventListener('click', function (event) {
    event.target.classList.toggle('element__like-button_active');
  });

  function transmitInformation () {
    photoElementPopup.src = element.link;
    photoTitleElementPopup.textContent = element.name;
    photoElementPopup.alt = element.name;
  }
  
  photoElement.addEventListener('click', () => {
    transmitInformation ();
    openPopup(popupFullScreenPhoto);
  });

  return newCardElement;
};

const renderCard = (element) => {
  cardList.prepend(generateCard(element));
};

initialCards.forEach((element) => {
  renderCard(element);
});

function convertInputData () {
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
};

function eraseInputData () {
  titleInput.value = '';
  linkInput.value = '';
};

function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
};

function editProfileSubmitHandler (event) {
  event.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  closePopup (popupEditProfile);
};

function addCardSubmitHandler (event) {
  event.preventDefault();
  const name = titleInput.value;
  const link = linkInput.value;
  renderCard ({ name, link });
  closePopup (popupAddCard);
};

function closePopupByEsc (event) {
  if (event.key === 'Escape') {
    const popupActiveModal = document.querySelector('.popup_opened');
    closePopup (popupActiveModal);
  }
};

function closePopupByOverlay (event) {
  if (event.target === event.currentTarget) {
    closePopup (event.target);
  }
};

function getInputElements (formElement) {
  return Array.from(formElement.querySelectorAll('.popup__form-data'));
};

function getSaveButtonElement (formElement) {
  return formElement.querySelector('.popup__save-button');
};

buttonOpenEditProfilePopup.addEventListener('click', () => {
  convertInputData ();
  const inputList = getInputElements(formTypeProfile);
  inputList.forEach((input) => {
    resetErrorMessages(formTypeProfile, input)
  });
  toggleButtonState (inputList, getSaveButtonElement(formTypeProfile));
  openPopup (popupEditProfile);
});

buttonOpenAddCardPopup.addEventListener('click', () => {
  eraseInputData ();
  const inputList = getInputElements(popupAddCard);
  inputList.forEach((input) => {
    resetErrorMessages(popupAddCard, input)
  });
  toggleButtonState (inputList, getSaveButtonElement(popupAddCard));
  openPopup (popupAddCard);
});

buttonCloseEditProfilePopup.addEventListener('click', () => {
  closePopup (popupEditProfile);
});

buttonCloseAddCardPopup.addEventListener('click', () => {
  closePopup (popupAddCard);
});

buttonCloseFullScreenPopup.addEventListener('click', (event) => closePopup (popupFullScreenPhoto));

popupEditProfile.addEventListener('click', closePopupByOverlay);
popupAddCard.addEventListener('click', closePopupByOverlay);
popupFullScreenPhoto.addEventListener('click', closePopupByOverlay);

formProfilePopup.addEventListener('submit', editProfileSubmitHandler);
formAddCardPopup.addEventListener('submit', addCardSubmitHandler);