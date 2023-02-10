import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._link = this._popup.querySelector('.popup__photo');
    this._name = this._popup.querySelector('.popup__photo-title');
  }
  
  open(data) {
    super.open();
    this._link.src = data.link;
    this._name.textContent = data.name;
    this._link.alt = data.name;
  }
}