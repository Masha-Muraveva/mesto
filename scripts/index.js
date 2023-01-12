import { initialCards } from "./data.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

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

const formAddCardPopup = popupAddCard.querySelector('.popup__form_type_add-card');
const buttonCloseAddCardPopup = popupAddCard.querySelector('.popup__closed-button_type_add-card');
const titleInput = formAddCardPopup.querySelector('.popup__form-data_type_card-title');
const linkInput = formAddCardPopup.querySelector('.popup__form-data_type_card-link');

const buttonCloseFullScreenPopup = popupFullScreenPhoto.querySelector('.popup__closed-button_type_fullscreen');

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-data',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__form-data_type_error',
  errorClass: 'popup__form-data-error_active',
  errorMessageClass: '.popup__form-data-error'
}

const renderCard = (data) => {
  const card = new Card (data, '#card__template');
  const element = card.generateCard();
  cardList.prepend(element);
}

initialCards.forEach((data) => {
  renderCard(data);
});

function addCardSubmitHandler (event) {
  event.preventDefault();
  const name = titleInput.value;
  const link = linkInput.value;
  renderCard ({ name, link });
  closePopup (popupAddCard);
}

formAddCardPopup.addEventListener('submit', addCardSubmitHandler);


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

const formValidate = (settings, formElement ) => {
  const formValidator = new FormValidator (settings, formElement);
  formValidator.enableValidation();
}

const popupForms = document.querySelectorAll('.popup__form');

popupForms.forEach((popupForm) => {
  formValidate(validationSettings, popupForm);
});

buttonOpenEditProfilePopup.addEventListener('click', () => {
  convertInputData ();
  new FormValidator(validationSettings, formProfilePopup).resetErrorMessages();
  openPopup (popupEditProfile);
});

buttonOpenAddCardPopup.addEventListener('click', () => {
  eraseInputData ();
  new FormValidator(validationSettings, formAddCardPopup).resetErrorMessages();
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

export {openPopup, popupFullScreenPhoto};