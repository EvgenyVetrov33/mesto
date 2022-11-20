const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

const openPopup = function () {
	popupElement.classList.add('popup_opened');
}

const closePopup = function () {
	popupElement.classList.remove('popup_opened');
}


popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);


let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_input_name');
let jobInput = document.querySelector('.popup__input_input_job');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__paragraph');

function formSubmitHandler(evt) {
	evt.preventDefault();
	profileName.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;
	closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);


