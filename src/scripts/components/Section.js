
export default class Section {
	constructor({ items, renderer }, containerSelector) {
		this._items = items;
		this._renderer = renderer;
		this._container = document.querySelector(containerSelector);
	}

	addItem(element) {
		this._container.prepend(element);
	}
	// addItem(item) {
	// 	this._container.prepend(this._renderer(item));
	// }

	renderItem(className) {
		this._renderer(this._items, className);
	}

	renderItems(className) {
		this._items.forEach((item) => {
			this._renderer(item, className);
		});
	}
	// renderCards() {
	// 	this._clear();
	// 	this._cards.forEach((card) => {
	// 		this.addItem(card);
	// 	});
	// }
	// _clear() {
	// 	this._container.innerHTML = "";
	// }
}