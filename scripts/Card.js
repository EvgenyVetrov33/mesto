
export class Card {
	constructor(data, templateSelector, handleCardClick) {
		this._name = data.name;
		this._link = data.link;
		this._templateSelector = templateSelector;
		this._handleCardClick = handleCardClick;
	}

	_getTemplate() {
		const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
		return cardTemplate;
	}

	generateCard() {
		this._element = this._getTemplate();
		this._cardImage = this._element.querySelector('.element__image');
		this._likeButton = this._element.querySelector('.element__heart');

		this._cardImage.src = this._link;
		this._cardImage.alt = this._name;
		this._element.querySelector('.element__title').textContent = this._name;

		this._setEventListeners();

		return this._element;
	}

	_setEventListeners() {
		this._likeButton.addEventListener('click', () => {
			this._handleLikeButton();
		});

		this._element.querySelector('.element__delete-button').addEventListener('click', () => {
			this._handleDeleteButton();
		});

		this._cardImage.addEventListener('click', () => {
			this._handleCardClick(this._name, this._link);
		});
	}

	_handleDeleteButton() {
		this._element.remove()
	}

	_handleLikeButton() {
		this._likeButton.classList.toggle('element__heart_active');
	}
}