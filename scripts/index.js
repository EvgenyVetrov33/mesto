const editPopup = document.querySelector('.popup-edit');
const popupElementTwo = document.querySelector('.popup-two');
const popupOpenButtonElementAdd = document.querySelector('.profile__add-button');
const formElementTwo = popupElementTwo.querySelector('.popup__form-two');
const nameInputTwo = document.querySelector('[name="place-name"]');
const jobInputTwo = document.querySelector('[name="place-job"]');
const CardsElements = document.querySelector('.elements');
const shablonElement = document.querySelector('#todo-template').content.querySelector('.element');
const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_input_name');
let jobInput = document.querySelector('.popup__input_input_job');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__paragraph');
const popupCloseButtonElement = document.querySelectorAll('.popup__close');
const imagePopup = document.querySelector('.popup__image-img');
const imageCapture = document.querySelector('.popup__title-fig');
const popupImageOpen = document.querySelector('.popup-image');

const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
];

const generateCard = function (item) {
	const newCard = shablonElement.cloneNode(true);
	const profileNameTwo = newCard.querySelector('.element__caption').querySelector('.element__title');
	profileNameTwo.textContent = item.name;
	const profileJobTwo = newCard.querySelector('.element__image');
	profileJobTwo.src = item.link;
	profileJobTwo.alt = item.name;

	profileJobTwo.addEventListener('click', function () {
		popupImageOpen.classList.add('popup_opened');
		imagePopup.src = item.link;
		imagePopup.alt = item.name;
		imageCapture.textContent = item.name;
	});
	const likeButtonElement = newCard.querySelector('.element__heart');
	likeButtonElement.addEventListener('click', function () {
		likeButtonElement.classList.toggle('element__heart_active')
	});
	const deleteButtonElement = newCard.querySelector('.element__delete-button');
	deleteButtonElement.addEventListener('click', function () {
		deleteButtonElement.closest('.element').remove()
	});
	return newCard;
}

const handleSubmitAddNewCard = function (evt) {
	evt.preventDefault();
	renderCard({ name: nameInputTwo.value, link: jobInputTwo.value })
	popupClose(popupElementTwo);
}

const renderCard = function (item) {
	CardsElements.prepend(generateCard(item));
}

initialCards.forEach(function (item) {
	renderCard(item);
});

function popupOpen(popup) {
	popup.classList.add('popup_opened');
}
function popupClose(popupName) {
	popupName.classList.remove('popup_opened');
}
// Попап Редактирования
popupOpenButtonElement.addEventListener('click', () => {
	popupOpen(editPopup)
	nameInput.value = profileName.textContent;
	jobInput.value = profileJob.textContent;
});

// Закрытие попапов
if (popupCloseButtonElement.length > 0) {
	for (let index = 0; index < popupCloseButtonElement.length; index++) {
		const el = popupCloseButtonElement[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function formSubmitHandler(evt) {
	evt.preventDefault();
	profileName.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;
	popupClose(editPopup);
}

popupOpenButtonElementAdd.addEventListener('click', () => {
	popupOpen(popupElementTwo)
});

formElement.addEventListener('submit', formSubmitHandler);
formElementTwo.addEventListener('submit', handleSubmitAddNewCard);
