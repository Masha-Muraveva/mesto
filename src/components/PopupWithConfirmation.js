import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._buttonConfirmation = this._popupForm.querySelector('.popup__save-button');
    this._buttonConfirmationText = this._buttonConfirmation.textContent;
  }

  setFormSubmit(handler) {
    this.handleFormSubmit = handler;
  }

  setEventListeners() {
  super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleFormSubmit();
    })
  }

  initializeLoading(isLoading) {
    if (isLoading) {
      this._buttonConfirmation.textContent = 'Сохранение...';
    } else {
      this._buttonConfirmation.textContent = this._buttonConfirmationText;
    }
  }
}

