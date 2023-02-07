import './index.css'

import { Card } from './scripts/components/Card.js';
import { initialCards, validationConfig, popupsConfig } from './scripts/variables/constants.js';
import {
	buttonOpenAddPopup, buttonOpenEditPopup, formEditCard, formAddCard, inputInfoName, inputInfoJob
} from "./scripts/variables/elements.js";
import { FormValidator } from './scripts/components/FormValidator.js';
import Section from './scripts/components/Section.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import UserInfo from './scripts/components/UserInfo.js';

const classEditPopup = new PopupWithForm(popupsConfig.popupEditCard, handlerSubmitEditForm);
classEditPopup.setEventListeners();

const classAddPopup = new PopupWithForm(popupsConfig.popupAddCard, handleSubmitAddNewCard);
classAddPopup.setEventListeners();

const userInfo = new UserInfo({
	name: '.profile__title',
	description: '.profile__paragraph'
});

function openEditPopup() {
	formEditPopupValid.resetValidation()
	const { name, description } = userInfo.getUserInfo();

	inputInfoName.value = name;
	inputInfoJob.value = description;

	formEditPopupValid.toggleButtonState()
	classEditPopup.open();
}

function openAddPopup() {
	formAddPopupValid.resetValidation()
	formAddPopupValid.toggleButtonState()
	classAddPopup.open();
}

function openImagePopup(title, url) {
	const imagePopupOpen = new PopupWithImage(popupsConfig.popupImageOpen, { title, url });
	imagePopupOpen.setEventListeners();
	imagePopupOpen.open();
}

function handlerSubmitEditForm(value) {
	userInfo.setUserInfo(value.inputName, value.inputJob)
	classEditPopup.close();
}

function handleSubmitAddNewCard(value) {
	const newAddCard = {
		name: value.inputLabel,
		link: value.inputLink
	}

	const cardSection = new Section({ items: newAddCard, renderer: renderCard }, '.elements')
	cardSection.renderItem(cardSection)

	formAddPopupValid.resetValidation()
	classAddPopup.close();
}

function renderCard(item, className) {
	const card = new Card(item, "#todo-template", openImagePopup);
	const cardElement = card.generateCard();
	className.addItem(cardElement);
}

const sectionCard = new Section({ items: initialCards, renderer: renderCard }, '.elements');
sectionCard.renderItems(sectionCard)

buttonOpenEditPopup.addEventListener('click', () => openEditPopup());

buttonOpenAddPopup.addEventListener('click', () => openAddPopup());

const formEditPopupValid = new FormValidator(validationConfig, formEditCard);
formEditPopupValid.enableValidation();

const formAddPopupValid = new FormValidator(validationConfig, formAddCard);
formAddPopupValid.enableValidation();