
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
	constructor(selector, { title, url }) {
		super(selector);
		this._title = title;
		this._url = url;
	}

	open() {
		const imagePopupPhoto = this._popup.querySelector('.popup__image-img');
		const imagePopupTitle = this._popup.querySelector('.popup__title-fig');

		imagePopupTitle.textContent = this._title;
		imagePopupPhoto.src = this._url;
		imagePopupPhoto.alt = this._title;

		super.open();
	}
}