export class Section {
  constructor({items, renderer}, containerSelector) {
    this._initialCards = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItems() {
    this._initialCards.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._containerSelector.append(element);
  }

  addNewItem(element) {
    this._containerSelector.prepend(element);
  }
}