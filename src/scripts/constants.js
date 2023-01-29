export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-data',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__form-data_type_error',
    errorClass: 'popup__form-data-error_active',
    errorMessageClass: '.popup__form-data-error'
}

export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
export const popupAddCard = document.querySelector('.popup_type_add-card');
export const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
export const popupFullScreenPhoto = document.querySelector('.popup_type_fullscreen-photo');
export const userName = document.querySelector('.profile__user-name');
export const userDescription = document.querySelector('.profile__user-description');
export const cardList = document.querySelector('.elements__list');
export const formProfilePopup = popupEditProfile.querySelector('.popup__form_type_edit-profile');
export const buttonCloseEditProfilePopup = popupEditProfile.querySelector('.popup__closed-button_type_profile');
export const nameInput = formProfilePopup.querySelector('.popup__form-data_type_name');
export const descriptionInput = formProfilePopup.querySelector('.popup__form-data_type_description');
export const formAddCardPopup = popupAddCard.querySelector('.popup__form_type_add-card');
export const buttonCloseAddCardPopup = popupAddCard.querySelector('.popup__closed-button_type_add-card');
export const titleInput = formAddCardPopup.querySelector('.popup__form-data_type_card-title');
export const linkInput = formAddCardPopup.querySelector('.popup__form-data_type_card-link');
export const buttonCloseFullScreenPopup = popupFullScreenPhoto.querySelector('.popup__closed-button_type_fullscreen');
export const photoElementPopup = popupFullScreenPhoto.querySelector(".popup__photo");
export const photoTitleElementPopup = popupFullScreenPhoto.querySelector(".popup__photo-title");  