import './index.css';

import { Card } from '../scripts/components/Card.js';
import { initialCards, validationConfig, popupsConfig } from '../scripts/variables/constants.js';
import {
	buttonOpenAddPopup, buttonOpenEditPopup, formEditCard, formAddCard, inputInfoName, inputInfoJob
} from "../scripts/variables/elements.js";
import { FormValidator } from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';

const classEditPopup = new PopupWithForm(popupsConfig.popupEditCard, handlerSubmitEditForm);
classEditPopup.setEventListeners();

const classAddPopup = new PopupWithForm(popupsConfig.popupAddCard, handleSubmitAddNewCard);
classAddPopup.setEventListeners();

const imagePopupOpen = new PopupWithImage(popupsConfig.popupImageOpen);
imagePopupOpen.setEventListeners();

const userInfo = new UserInfo({
	nameSelector: '.profile__title',
	descriptionSelector: '.profile__paragraph'
});

function openEditPopup() {
	formEditPopupValid.resetValidation()
	const { nameSelector, descriptionSelector } = userInfo.getUserInfo();

	inputInfoName.value = nameSelector;
	inputInfoJob.value = descriptionSelector;

	formEditPopupValid.toggleButtonState()
	classEditPopup.open();
}

function openAddPopup() {
	formAddPopupValid.resetValidation()
	formAddPopupValid.toggleButtonState()
	classAddPopup.open();
}

function handlerSubmitEditForm(value) {
	userInfo.setUserInfo(value.inputName, value.inputJob)
	classEditPopup.close();
}

function handleSubmitAddNewCard(item) {
	renderCard(item);
	formAddPopupValid.resetValidation()
	classAddPopup.close();
}

function renderCard(item) {
	const newCard = new Card(item, "#todo-template", () =>
		imagePopupOpen.open(item)).generateCard();
	sectionCard.addItem(newCard);
}

const sectionCard = new Section({ items: initialCards, renderer: renderCard }, '.elements');
sectionCard.renderItems()

buttonOpenEditPopup.addEventListener('click', () => openEditPopup());

buttonOpenAddPopup.addEventListener('click', () => openAddPopup());

const formEditPopupValid = new FormValidator(validationConfig, formEditCard);
formEditPopupValid.enableValidation();

const formAddPopupValid = new FormValidator(validationConfig, formAddCard);
formAddPopupValid.enableValidation();