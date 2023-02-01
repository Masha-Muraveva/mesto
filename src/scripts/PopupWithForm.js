import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit;
    this._popup = document.querySelector(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = this._popupForm.querySelectorAll('.popup__form-data');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupForm.reset()
  }
}