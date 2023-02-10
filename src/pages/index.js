import './index.css';
import {
  validationSettings,
  cardList,
  nameInput,
  descriptionInput,
  buttonOpenEditProfilePopup,
  buttonOpenAddCardPopup,
  buttonOpenEditAvatarPopup,
  formProfilePopup,
  formAddCardPopup,
  formAvatarPopup,
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { Api } from "../components/Api.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js"


//Обращение к API:

const api = new Api ({
  url: "https://mesto.nomoreparties.co/v1/cohort-58/",
  headers: {
    'Content-Type': 'application/json',
    authorization: "e7e159e0-1a57-4256-b037-c6c3fe904269",
  }
})


//Получение данных о пользователе с сервера:

let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userId = user._id;
    userInfo.setUserInfo(user);
    userInfo.setUserAvatar(user.avatar);
    cardsList.renderItems(cards);
  })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    })


//Заполнение информации о пользователе
const userInfo = new UserInfo({
  nameSelector: '.profile__user-name',
  descriptionSelector: '.profile__user-description',
  avatarSelector: '.profile__user-photo',
});


//Создание эксземпляра класса для работы попапа 
//с данными пользователя:

const popupEditProfileWithForm = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (data) => {
    popupEditProfileWithForm.initializeLoading(true);
    api.editUserInfo({
      name: data.name,
      about: data.about,
    })
      .then((data) => {          
        userInfo.setUserInfo(data);
      })
        .then(() => {
          popupEditProfileWithForm.close();
        })
          .catch((error) => {
            console.log(`Ошибка: ${error}`);
          })
            .finally(() => {
              popupEditProfileWithForm.initializeLoading(false);
            })
  }
});
popupEditProfileWithForm.setEventListeners();


//Открытие данного попапа:

const openEditProfile = () => {
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData.name;
  descriptionInput.value = profileData.about;
  validators.get(formProfilePopup.name).resetErrorMessages();
  popupEditProfileWithForm.open();
}
buttonOpenEditProfilePopup.addEventListener('click', openEditProfile);


//Создание эксземпляра класса для работы попапа 
//с аватаром:

const popupEditAvatarWithForm = new PopupWithForm ({
  popupSelector: '.popup_type_edit-avatar',
  handleFormSubmit: (data) => {
    popupEditAvatarWithForm.initializeLoading(true);
    api.editAvatar({
      avatar: data.avatarLink
    })
      .then((data) => {
        console.log(data);
        userInfo.setUserAvatar(data.avatar);
      })
        .then(() => {
          popupEditAvatarWithForm.close();
        })
          .catch((error) => {
            console.log(`Ошибка: ${error}`);
          })
            .finally(() => {
              popupEditAvatarWithForm.initializeLoading(false);
            })
  }
})
popupEditAvatarWithForm.setEventListeners();


//Открытие данного попапа:

const openEditAvatar = () => {
  validators.get(formAvatarPopup.name).resetErrorMessages();
  popupEditAvatarWithForm.open()
}
buttonOpenEditAvatarPopup.addEventListener('click', openEditAvatar);


//Создание карточки через образование нового класса со всеми функциями (common):

const  createCard = (dataCard) => {
  const card = new Card (
  {
    data: dataCard,
    userId: userId,
    handleCardClick: () => {
      popupFullScreen.open(dataCard);
    },

    handleDeleteCardClick: (cardId) => {
      popupConfirmationDeleteCard.open();
      popupConfirmationDeleteCard.setFormSubmit(() => {
        popupConfirmationDeleteCard.initializeLoading(true);
        api.deleteCard(cardId)
          .then((data) => {
            popupConfirmationDeleteCard.close();
            card.deleteCard(data);
          })
            .catch((error) => {
              console.log(`Ошибка: ${error}`);
            })
              .finally(() => {
                popupConfirmationDeleteCard.initializeLoading(false);
              })
        })
    },
  
    handleLikeCardClick: (cardId) => {
      api.addLike(cardId)
        .then((response) => {
          card.getLikesFromServer(response);
        })
          .catch((error) => {
            console.log(`Ошибка: ${error}`);
          })
    },
    
    handleUnlikeCardClick: (cardId) => {
      api.deleteLike(cardId)
        .then((responce) => {
          card.getLikesFromServer(responce);
        })
          .catch((error) => {
            console.log(`Ошибка: ${error}`);
          })
    },
  },
  '#card__template');
  const cardRendered = card.generateCard();
  return cardRendered;
}


//Отрисовка карточек через создание нового класса с разметкой:

const cardsList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.addItem(cardElement);
    }
  },
cardList);


//Создание экземпляра класса для работы попапа 
//с карточками:

const popupAddCardWithForm = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (data) => {
    popupAddCardWithForm.initializeLoading(true);
    api.addNewCards(data)
      .then((data) => {
        const newCard = createCard(data);
        cardsList.addNewItem(newCard);
      })
        .then(() => {
          popupAddCardWithForm.close();
        })
          .catch((error) => {
            console.log(`Ошибка: ${error}`);
          })
            .finally(() => {
              popupAddCardWithForm.initializeLoading(false);
            })
  }
});
popupAddCardWithForm.setEventListeners();


//Открытие данного попапа:

const openAddCard = () => {
  validators.get(formAddCardPopup.name).resetErrorMessages();
  popupAddCardWithForm.open();
};
buttonOpenAddCardPopup.addEventListener('click', openAddCard);


//Открытие попапа с картинкой на весь экран:

const popupFullScreen = new PopupWithImage('.popup_type_fullscreen-photo');
popupFullScreen.setEventListeners();


//Открытие попапа с запросом подтверждения 
//на удаление карточки:

const popupConfirmationDeleteCard = new PopupWithConfirmation('.popup_type_delete-card')
popupConfirmationDeleteCard.setEventListeners();


//Валидация форм

const validators = new Map();

const validateForm = (settings, formElement ) => {
  const formValidator = new FormValidator(settings, formElement);
  formValidator.enableValidation();
  validators.set(formElement.name, formValidator);
}

const popupForms = document.querySelectorAll('.popup__form');

popupForms.forEach((popupForm) => {
  validateForm(validationSettings, popupForm);
});