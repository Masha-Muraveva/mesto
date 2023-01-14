export class FormValidator {

  constructor (settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._errorMessageClass = settings.errorMessageClass;

    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._saveButton = this._formElement.querySelector(this._submitButtonSelector);
  }
  
  _showInputError(input, errorMessage) {
    const elementError = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    elementError.classList.add(this._errorClass);
    elementError.textContent = errorMessage;
  };
  
  _hideInputError(input) {
    const elementError = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    elementError.classList.remove(this._errorClass);
    elementError.textContent = '';
  };
  
  _toggleInputErrorState = (input) => {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } 
    else {
      this._hideInputError(input);
    }
  };
  
  _hasInvalidInput = () => {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    })
  };


  _toggleButtonState = () => {
      
    if (this._hasInvalidInput()) {
      this._saveButton.classList.add(this._inactiveButtonClass);
      this._saveButton.setAttribute('disabled', true);
    } 
    else {
      this._saveButton.classList.remove(this._inactiveButtonClass);
      this._saveButton.removeAttribute('disabled');
    }
  };

  _setEventListeners = (input) => {
      input.addEventListener('input', () => {
        this._toggleInputErrorState(input)
        this._toggleButtonState();
      });
  };
    
  enableValidation = () => {
    this._inputList.forEach((input) => {
      this._setEventListeners(input);
    });
  };

  resetErrorMessages () {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleButtonState();
  }
}