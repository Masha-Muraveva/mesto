import './index.css';
import { initialCards } from "../utils/default-cards.js";
import { 
  validationSettings,
  formAddCardPopup,
  nameInput,
  descriptionInput,
  cardList,
  buttonOpenEditProfilePopup,
  buttonOpenAddCardPopup,
  formProfilePopup,
  titleInput,
  linkInput} from "../utils/constants.js";
import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { UserInfo } from "../scripts/UserInfo.js";
import { Section } from "../scripts/Section.js";

const validators = new Map();

//Открытие попапа с картинкой 
//на весь экран
const popupFullScreen = new PopupWithImage('.popup_type_fullscreen-photo');
popupFullScreen.setEventListeners();


//Отрисовка карточек через класс Section

const createCard = (item) => {
  const card = new Card(
    {
      data: item,
      handleCardClick: () => {
        popupFullScreen.open(item);
      }
    },
    '#card__template');
    const cardRendered = card.generateCard();
  return cardRendered;
}

const cardsList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.addItem(cardElement);
    }
  },
    cardList);

cardsList.renderItems(initialCards);

//Заполнение информации о пользователе
const userInfo = new UserInfo({
  nameSelector: '.profile__user-name',
  descriptionSelector: '.profile__user-description'
});

//Работа с попапами: 
//Настройка работы попапа с формой 
//для редактирования данных пользователя

const popupEditProfileWithForm = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: () => {
    userInfo.setUserInfo(nameInput.value, descriptionInput.value);
    popupEditProfileWithForm.close();
  }
});

popupEditProfileWithForm.setEventListeners();

//+ открытие этого попапа

const openEditProfile = () => {
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData.name;
  descriptionInput.value = profileData.description;
  validators.get(formProfilePopup.name).resetErrorMessages();
  popupEditProfileWithForm.open();
}

buttonOpenEditProfilePopup.addEventListener('click', openEditProfile);


//Попап с формой для добавления карточек
const popupAddCardWithForm = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: () => {
    const item = {
      name: titleInput.value,
      link: linkInput.value
    }
    const newCard = createCard(item);
    cardsList.addNewItem(newCard);

    popupAddCardWithForm.close();
    
  }
});

popupAddCardWithForm.setEventListeners();

const openAddCard = () => {
  validators.get(formAddCardPopup.name).resetErrorMessages();
  popupAddCardWithForm.open();
};

buttonOpenAddCardPopup.addEventListener('click', openAddCard);


//Валидация форм


const validateForm = (settings, formElement ) => {
  const formValidator = new FormValidator(settings, formElement);
  formValidator.enableValidation();
  validators.set(formElement.name, formValidator);
}

const popupForms = document.querySelectorAll('.popup__form');

popupForms.forEach((popupForm) => {
  validateForm(validationSettings, popupForm);
});