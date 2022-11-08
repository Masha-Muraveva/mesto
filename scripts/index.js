const editButtonElement = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const popupClosedElement = document.querySelector('.popup__closed-button');

editButtonElement.addEventListener('click', () => {
  popupElement.classList.add('popup_opened');
})

popupClosedElement.addEventListener('click', () => {
  popupElement.classList.remove('popup_opened');
})

const popupContentElement = popupElement.querySelector('.popup__content');
let nameInput = popupContentElement.querySelector('.popup__user-name');
let descriptionInput = popupContentElement.querySelector('.popup__user-description');
const submitButton = popupContentElement.querySelector('.popup__save-button');

function formSubmitHandler (evt) {
  evt.preventDefault();
  document.querySelector('.profile__user-name').textContent = nameInput.value;
  document.querySelector('.profile__user-description').textContent = descriptionInput.value;
  popupElement.classList.remove('popup_opened');
}

popupContentElement.addEventListener('submit', formSubmitHandler);