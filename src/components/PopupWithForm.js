import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popup = document.querySelector(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._buttonConfirmation = this._popupForm.querySelector('.popup__save-button');
    this._buttonConfirmationText = this._buttonConfirmation.textContent;
    this._inputList = this._popupForm.querySelectorAll('.popup__form-data');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    console.log(this._formValues);
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupForm.reset()
  }

  initializeLoading(isLoading) {
    if (isLoading) {
      this._buttonConfirmation.textContent = "Сохранение...";
    } else {
      this._buttonConfirmation.textContent = this._buttonConfirmationText;
    }
  }
}