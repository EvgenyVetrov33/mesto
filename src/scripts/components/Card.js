
export class Card {
	constructor(data, templateSelector, openPopup) {
		this._title = data.name;
		this._url = data.link;
		this._templateSelector = templateSelector;
		this._openPopup = openPopup;
	}

	_getTemplate() {
		return document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
	}

	_handleLikeButton() {
		this._elementLike.classList.toggle('element__heart_active');
	}

	_handleDeleteButton() {
		this._element.remove();
	}

	_openImagePopup() {
		this._openPopup(this._title, this._url)
	}

	_setEventListeners() {
		this._elementLike.addEventListener('click', () => this._handleLikeButton());
		this._elementDelete.addEventListener('click', () => this._handleDeleteButton());
		this._cardImage.addEventListener('click', () => this._openImagePopup());
	}

	generateCard() {
		this._element = this._getTemplate();
		this._cardImage = this._element.querySelector('.element__image');
		this._elementLike = this._element.querySelector('.element__heart');
		this._elementDelete = this._element.querySelector('.element__delete-button')

		this._cardImage.src = this._url;
		this._cardImage.alt = this._title;
		this._element.querySelector('.element__title').textContent = this._title;

		this._setEventListeners();

		return this._element;
	}
}