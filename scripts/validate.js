//Валидация форм:

const showInputError = (formElement, element, errorMessage) => {
    const elementError = formElement.querySelector(`.${element.id}-error`);
  
    element.classList.add('popup__form-data_type_error');
    elementError.classList.add('popup__form-data-error_active');
  
    elementError.textContent = errorMessage;
  };
  
  const hideInputError = (formElement, element) => {
    const elementError = formElement.querySelector(`.${element.id}-error`);
  
    element.classList.remove('popup__form-data_type_error');
    elementError.classList.remove('popup__form-data-error_active');
  
    elementError.textContent = '';
  };
  
  const isValid = (formElement, element) => {
    if (!element.validity.valid) {
      showInputError(formElement, element, element.validationMessage);
    } else {
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
      buttonSaveElement.classList.add('popup__save-button_inactive');
      buttonSaveElement.setAttribute('disabled', true);
    } else {
      buttonSaveElement.classList.remove('popup__save-button_inactive');
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
  
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  };
  
  enableValidation(); 