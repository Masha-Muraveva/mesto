const editButtonElement = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const popupClosedElement = document.querySelector('.popup__closed-button');
const popupContentElement = popupElement.querySelector('.popup__content');
const nameInput = popupContentElement.querySelector('.popup__user-name');
const descriptionInput = popupContentElement.querySelector('.popup__user-description');
const submitButton = popupContentElement.querySelector('.popup__save-button');
const userName = document.querySelector('.profile__user-name');
const userDescription = document.querySelector('.profile__user-description');

function formSubmitHandler (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  popupElement.classList.remove('popup_opened');
}

function openClick () {
  popupElement.classList.add('popup_opened');
}

function closeClick () {
  popupElement.classList.remove('popup_opened');
}

editButtonElement.addEventListener('click', openClick);
popupClosedElement.addEventListener('click', closeClick);
popupContentElement.addEventListener('submit', formSubmitHandler);