
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
	constructor(selector, { title, url }) {
		super(selector);
		this._title = title;
		this._url = url;
		this._image = this._popup.querySelector('.popup__image-img');
		this._fig = this._popup.querySelector('.popup__title-fig');
	}

	open() {
		this._fig.textContent = this._title;
		this._image.src = this._url;
		this._image.alt = this._title;
		super.open();
	}
}