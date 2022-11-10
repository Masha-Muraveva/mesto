const editButtonElement = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const popupClosedElement = document.querySelector('.popup__closed-button');
const popupFormElement = popupElement.querySelector('.popup__form');
const nameInput = popupFormElement.querySelector('.popup__form-data_type_name');
const descriptionInput = popupFormElement.querySelector('.popup__form-data_type_description');
const userName = document.querySelector('.profile__user-name');
const userDescription = document.querySelector('.profile__user-description');

function openClick () {
  nameInput.value = userName.textContent; 
  descriptionInput.value = userDescription.textContent;
  popupElement.classList.add('popup_opened');
}

function closeClick () {
  popupElement.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  closeClick();
}

editButtonElement.addEventListener('click', openClick);
popupClosedElement.addEventListener('click', closeClick);
popupFormElement.addEventListener('submit', formSubmitHandler);