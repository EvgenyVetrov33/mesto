import { Card } from './Card.js';
import { initialCards } from './constants.js';
import { validationConfig } from './constants.js';
import { FormValidator } from './FormValidator.js';


const popupAddCard = document.querySelector('.popup-add');
const popupEdit = document.querySelector('.popup-edit');
const popupImageOpen = document.querySelector('.popup-image');
const buttonOpenAddPopup = document.querySelector('.profile__add-button');
const buttonOpenEditPopup = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__input_input_name');
const jobInput = document.querySelector('.popup__input_input_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__paragraph');
const formEditCard = document.querySelector('.popup__form-edit');
const formAddCard = popupAddCard.querySelector('.popup__form-add');
const nameInputAdd = document.querySelector('[name="place-name"]');
const jobInputAdd = document.querySelector('[name="place-job"]');
const popups = document.querySelectorAll('.popup');
const imagePopup = document.querySelector('.popup__image-img');
const imageCapture = document.querySelector('.popup__title-fig');
const cardsContainer = document.querySelector('.elements');

function openPopup(popup) {
	popup.classList.add('popup_opened');

	document.addEventListener('keyup', handleKeyUp)
}

function closePopup(popup) {
	popup.classList.remove('popup_opened');

	document.removeEventListener('keyup', handleKeyUp)
}

// Попап Редактирования
buttonOpenEditPopup.addEventListener('click', () => {
	nameInput.value = profileName.textContent;
	jobInput.value = profileJob.textContent;
	openPopup(popupEdit)
});

function handleSubmitEditForm(evt) {
	evt.preventDefault();
	profileName.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;
	closePopup(popupEdit);
}

// Попап добавления карточки
buttonOpenAddPopup.addEventListener('click', () => {
	openPopup(popupAddCard);
	formAddCard.reset();
	formAddPopupValid.toggleButtonState();
});

const handleSubmitAddNewCard = function (evt) {
	evt.preventDefault();
	renderCard({ name: nameInputAdd.value, link: jobInputAdd.value }, cardsContainer);
	closePopup(popupAddCard);
}

popups.forEach(popup => {
	popup.addEventListener('click', (e) => {
		if (e.target === e.currentTarget || e.target.classList.contains('popup__close')) {
			closePopup(e.currentTarget)
		}
	});
});

const handleKeyUp = (e) => {
	const key = event.key;
	if (e.key === 'Escape') {
		const openedPopup = document.querySelector('.popup_opened');
		closePopup(openedPopup);
	}
}

function handleCardImageClick(name, link) {
	openPopup(popupImageOpen);
	imagePopup.alt = name;
	imageCapture.textContent = name;
	imagePopup.src = link;
}

function createCard(cardData) {
	const card = new Card(cardData, "#todo-template", handleCardImageClick);
	const cardTemplate = card.generateCard();
	return cardTemplate;
}

const renderCard = function (cardData, container) {
	container.prepend(createCard(cardData));
}

initialCards.forEach((cardData) => {
	renderCard(cardData, cardsContainer);
});

formEditCard.addEventListener('submit', handleSubmitEditForm);
formAddCard.addEventListener('submit', handleSubmitAddNewCard);

const formEditPopupValid = new FormValidator(validationConfig, popupEdit);
formEditPopupValid.enableValidation();

const formAddPopupValid = new FormValidator(validationConfig, popupAddCard);
formAddPopupValid.enableValidation();
