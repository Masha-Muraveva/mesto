export class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItems(items) {
    items.forEach((item) => {
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