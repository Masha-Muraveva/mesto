import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._link = this._popup.querySelector('.popup__photo');
    this._name = this._popup.querySelector('.popup__photo-title');
  }
  
  open({name, link}) {
    super.open();
    this._link.src = link;
    this._name.textContent = name;
    this._link.alt = name;
  }
}