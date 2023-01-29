import '../pages/index.css';
import { initialCards } from "./default-cards.js";
import { 
  validationSettings,
  popupAddCard,
  formAddCardPopup,
  userName,
  userDescription,
  popupEditProfile,
  nameInput,
  descriptionInput,
  cardList,
  buttonOpenEditProfilePopup,
  buttonOpenAddCardPopup,
  formProfilePopup,
  popupFullScreenPhoto,
  titleInput,
  linkInput} from "./constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { UserInfo } from "./UserInfo.js";
import { Section } from "./Section.js";

const validators = new Map();

//Открытие попапа с картинкой 
//на весь экран
const popupFullScreen = new PopupWithImage(popupFullScreenPhoto);
popupFullScreen.setEventListeners();


//Отрисовка карточек через класс Section

const renderCard = (item) => {
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
    items: initialCards,
    renderer: (item) => {
      const cardElement = renderCard(item);
      cardsList.addItem(cardElement);
    }
  },
    cardList);

cardsList.renderItems();

//Заполнение информации о пользователе
const userInfo = new UserInfo({
  userName: userName,
  userDescription: userDescription
});

//Работа с попапами: 
//Настройка работы попапа с формой 
//для редактирования данных пользователя

const popupEditProfileWithForm = new PopupWithForm({
  popupSelector: popupEditProfile,
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
  popupSelector: popupAddCard,
  handleFormSubmit: () => {
    const item = {
      name: titleInput.value,
      link: linkInput.value
    }
    const newCard = renderCard(item);
    cardsList.addNewItem(newCard);

    popupAddCardWithForm.close();
    
  }
});

popupAddCardWithForm.setEventListeners();

const openAddCard = () => {
  validators.get(formAddCardPopup.name).resetErrorMessages();
  formAddCardPopup.reset();
  popupAddCardWithForm.open();
};

buttonOpenAddCardPopup.addEventListener('click', openAddCard);


//Валидация форм


const formValidate = (settings, formElement ) => {
  const formValidator = new FormValidator(settings, formElement);
  formValidator.enableValidation();
  validators.set(formElement.name, formValidator);
}

const popupForms = document.querySelectorAll('.popup__form');

popupForms.forEach((popupForm) => {
  formValidate(validationSettings, popupForm);
});