//Валидация форм:

const validationData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-data',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__form-data_type_error',
  errorClass: 'popup__form-data-error_active',
  errorMessageClass: '.popup__form-data-error'
}
  
const showInputError = (formElement, element, errorMessage) => {
  const elementError = formElement.querySelector(`.${element.id}-error`);
  element.classList.add(validationData.inputErrorClass);
  elementError.classList.add(validationData.errorClass);
  elementError.textContent = errorMessage;
};
  
const hideInputError = (formElement, element) => {
  const elementError = formElement.querySelector(`.${element.id}-error`);
  element.classList.remove(validationData.inputErrorClass);
  elementError.classList.remove(validationData.errorClass);
  elementError.textContent = '';
};

function resetErrorMessages (formElement, element) {
  const errorMessages = formElement.querySelectorAll(validationData.errorMessageClass);
  errorMessages.forEach((errorMessage) => {
    hideInputError(formElement, element);
  });
}
  
const isValid = (formElement, element) => {
  if (!element.validity.valid) {
    showInputError(formElement, element, element.validationMessage);
  } 
  else {
    hideInputError(formElement, element);
  }
}; 
  
const hasInvalidInput = (elementList) => {
  return elementList.some((element) => {
    return !element.validity.valid;
  })
}; 
  
const toggleButtonState = (elementList, buttonSaveElement) => {
    
  if (hasInvalidInput(elementList)) {
    buttonSaveElement.classList.add(validationData.inactiveButtonClass);
    buttonSaveElement.setAttribute('disabled', true);
  } 
  else {
    buttonSaveElement.classList.remove(validationData.inactiveButtonClass);
    buttonSaveElement.removeAttribute('disabled');
  }
};
  
const setEventListeners = (formElement) => {
  const elementList = getInputElements(formElement);
  const buttonSaveElement = getSaveButtonElement(formElement);
  
  elementList.forEach((element) => {
    element.addEventListener('input', () => {
      isValid(formElement, element)
      toggleButtonState(elementList, buttonSaveElement);
    });
  });
};
  
const enableValidation = (validationData) => {
  const formList = Array.from(document.querySelectorAll(validationData.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};
  
enableValidation(validationData);