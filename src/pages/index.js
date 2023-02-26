import './index.css';

import {
	profileEditBtn, formEditProfile, config, formAddNewCard,
	popupAddNewCardOpenBtn, nameInput, jobInput,
	buttonEditAvatar, formEditAvatar, avatar
} from '../scripts/utils/constants.js';
import Section from "../scripts/components/Section.js";
import FormValidator from '../scripts/components/FormValidator.js';
import Card from "../scripts/components/Card.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Api from "../scripts/components/Api.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js";

const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
	headers: {
		authorization: '56c23e37-2d26-4f99-806c-d72ff6532f25',
		'Content-Type': 'application/json'
	}
});

let userId;

// Загрузка карточек и данных о пользователе с сервера
Promise.all([api.getInitialCards(), api.getUserInfo()])
	.then(([initialCards, userData]) => {
		userInfo.setUserInfo(userData);
		userId = userData._id;
		cardsList.renderItems(initialCards);
	})
	.catch((err) => {
		console.log(`Ошибка: ${err}`);
	});

const userInfo = new UserInfo({
	username: '.profile__title',
	job: '.profile__paragraph',
	avatar: '.profile__avatar'
});


// попап с формой редактирования профиля
const editProfilePopup = new PopupWithForm({
	popupSelector: '.popup-edit',
	handleFormSubmit: (dataForm) => {
		editProfilePopup.loading(true);
		api.editUserInfo(dataForm)
			.then((dataForm) => {
				userInfo.setUserInfo(dataForm);
				editProfilePopup.close();
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			})
			.finally(() => {
				editProfilePopup.loading(false);
			});
	}
});
editProfilePopup.setEventListeners();

// Заносим данные в форму попапа редактирования профиля
function fillInEditProfileFormInputs({ username, job }) {
	nameInput.value = username;
	jobInput.value = job;
}

// попап редактирования аватара пользователя
const editAvatarPopup = new PopupWithForm({
	popupSelector: '.popup_type_avatar',
	handleFormSubmit: (data) => {
		editAvatarPopup.loading(true);
		api.editAvatar(data)
			.then((data) => {
				avatar.src = data.avatar;
				editAvatarPopup.close();
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			})
			.finally(() => {
				editAvatarPopup.loading(false);
			});
	}
});
editAvatarPopup.setEventListeners();

// Обработчик кнопки Edit аватара пользователя
buttonEditAvatar.addEventListener('click', () => {
	formEditAvatarValidator.toggleButtonState();
	editAvatarPopup.open();
});

// Обработчик кнопки Edit попапа редактирования профиля
profileEditBtn.addEventListener('click', () => {
	const info = userInfo.getUserInfo();
	fillInEditProfileFormInputs({
		username: info.username,
		job: info.job
	});
	editProfilePopup.open();
});

// создание новой карточки
const createCard = (data) => {
	const card = new Card({
		data: data,
		cardSelector: '#todo-template',
		userId: userId,
		handleCardClick: (name, link) => {
			viewImagePopup.open(name, link);
		},
		handleDeleteIconClick: (cardId) => {
			deleteCardPopup.open();
			deleteCardPopup.submitCallback(() => {
				api.deleteCard(cardId)
					.then(() => {
						deleteCardPopup.close();
						card.deleteCard();
					})
					.catch((err) => {
						console.log(`Ошибка: ${err}`);
					});
			});
		},
		handleSetLike: (cardId) => {
			api.setLike(cardId)
				.then((data) => {
					card.handleLikeCard(data);
				})
				.catch((err) => {
					console.log(`Ошибка: ${err}`);
				});
		},
		handleRemoveLike: (cardId) => {
			api.deleteLike(cardId)
				.then((data) => {
					card.handleLikeCard(data);
				})
				.catch((err) => {
					console.log(`Ошибка: ${err}`);
				});
		}
	});
	const cardElement = card.generateCard();
	return cardElement;
};

// экземпляр класса Section
const cardsList = new Section({
	renderer: (card) => {
		cardsList.addItem(createCard(card));
	},
}, '.elements');

// попап с подтверждением удаления карточки
const deleteCardPopup = new PopupWithConfirmation({
	popupSelector: '.popup_type_delete-card'
});
deleteCardPopup.setEventListeners();

// попап с формой добавления новой карточки
const addCardPopup = new PopupWithForm({
	popupSelector: '.popup-add',
	handleFormSubmit: (formData) => {
		addCardPopup.loading(true);
		api.addCard(formData)
			.then((formData) => {
				cardsList.addItem(createCard(formData));
				addCardPopup.close();
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			})
			.finally(() => {
				addCardPopup.loading(false);
			});
	}
});
// добавляем слушатели этому попапу:
addCardPopup.setEventListeners();
// обработчик открытия попапа
popupAddNewCardOpenBtn.addEventListener('click', () => {
	formAddNewCardValidator.toggleButtonState();
	addCardPopup.open();
})

const viewImagePopup = new PopupWithImage('.popup-image');
viewImagePopup.setEventListeners();


// Валидация форм
const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();

const formAddNewCardValidator = new FormValidator(config, formAddNewCard);
formAddNewCardValidator.enableValidation();

const formEditAvatarValidator = new FormValidator(config, formEditAvatar);
formEditAvatarValidator.enableValidation();