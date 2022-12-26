const popup = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup-edit');
const popupAddCard = document.querySelector('.popup-add');
const buttonOpenAddPopup = document.querySelector('.profile__add-button');
const nameInputTwo = document.querySelector('[name="place-name"]');
const jobInputTwo = document.querySelector('[name="place-job"]');
const cardsContainer = document.querySelector('.elements');
const containerElement = document.querySelector('#todo-template').content.querySelector('.element');
const buttonOpenEditPopup = document.querySelector('.profile__edit-button');
const formEditCard = document.querySelector('.popup__form-edit');
const formAddCard = popupAddCard.querySelector('.popup__form-add');
const nameInput = document.querySelector('.popup__input_input_name');
const jobInput = document.querySelector('.popup__input_input_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__paragraph');
const buttonClosePopupList = document.querySelectorAll('.popup__close');
const imagePopup = document.querySelector('.popup__image-img');
const imageCapture = document.querySelector('.popup__title-fig');
const popupImageOpen = document.querySelector('.popup-image');

const generateCard = function (card) {
	const newCard = containerElement.cloneNode(true);
	const cardImage = newCard.querySelector('.element__image');
	const cardTitle = newCard.querySelector('.element__title');
	const buttonLikeElement = newCard.querySelector('.element__heart');
	const buttonDeleteElement = newCard.querySelector('.element__delete-button');

	cardTitle.textContent = card.name;
	cardImage.src = card.link;
	cardImage.alt = card.name;

	cardImage.addEventListener('click', function () {
		openPopup(popupImageOpen);
		imagePopup.src = card.link;
		imagePopup.alt = card.name;
		imageCapture.textContent = card.name;
	});
	buttonLikeElement.addEventListener('click', function () {
		buttonLikeElement.classList.toggle('element__heart_active')
	});
	buttonDeleteElement.addEventListener('click', function () {
		buttonDeleteElement.closest('.element').remove()
	});
	return newCard;
}

const handleSubmitAddNewCard = function (evt) {
	evt.preventDefault();
	renderCard({ name: nameInputTwo.value, link: jobInputTwo.value })
	closePopup(popupAddCard);
}

const renderCard = function (item) {
	cardsContainer.prepend(generateCard(item));
}

popup.forEach(item => {
	item.addEventListener('click', (e) => {
		if (e.target === e.currentTarget || e.target.classList.contains('popup__close')) {
			closePopup(e.currentTarget)
		}
	});
});

initialCards.forEach(function (item) {
	renderCard(item);
});

const handleKeyUp = (e) => {
	const key = event.key;
	if (e.key === 'Escape') {
		const openedPopup = document.querySelector('.popup_opened');
		closePopup(openedPopup);
	}
}

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
	openPopup(popupEdit)
	nameInput.value = profileName.textContent;
	jobInput.value = profileJob.textContent;
});

function handleSubmitEditForm(evt) {
	evt.preventDefault();
	profileName.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;
	closePopup(popupEdit);
}

buttonOpenAddPopup.addEventListener('click', () => {
	formAddCard.reset();
	openPopup(popupAddCard)
});

formEditCard.addEventListener('submit', handleSubmitEditForm);
formAddCard.addEventListener('submit', handleSubmitAddNewCard);