
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
	constructor(selector) {
		super(selector);
		this._image = this._popup.querySelector('.popup__image-img');
		this._fig = this._popup.querySelector('.popup__title-fig');
	}

	open(item) {
		this._fig.textContent = item.name;
		this._image.src = item.link;
		this._image.alt = item.name;
		super.open();
	}
}