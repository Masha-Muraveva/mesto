export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  _handleEscClose(event) {
    if(event.key === 'Escape') {
      this.close()
    }
  }

  _handleOverlayClose(event) {
    if(event.target === event.currentTarget) {
      this.close();
    }
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup__closed-button').addEventListener('click', () => this.close());
    this._popupSelector.addEventListener('click', (event) => this._handleOverlayClose(event));
  }
}