const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_input_name');
let jobInput = document.querySelector('.popup__input_input_job');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__paragraph');

const openPopup = function () {
	popupElement.classList.add('popup_opened');
	nameInput.value = profileName.textContent;
	jobInput.value = profileJob.textContent;
}

const closePopup = function () {
	popupElement.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
	evt.preventDefault();
	profileName.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;
	closePopup();
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);