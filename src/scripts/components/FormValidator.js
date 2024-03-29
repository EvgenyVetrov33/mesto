export default class FormValidator {
	constructor(config, formElement) {
		this._config = config;
		this._formElement = formElement;
		this._inputList = Array.from(this._formElement.querySelectorAll(this._config.formInput));
		this._buttonElement = this._formElement.querySelector(this._config.formSubmit);
		this._inactiveButtonClass = config.inactiveButtonClass;
	}
	// добавление класса с ошибкой
	_showInputError(inputElement, errorMessage) {
		const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
		inputElement.classList.add(this._config.inputErrorClass);
		errorElement.textContent = errorMessage;
		errorElement.classList.add(this._config.inputErrorActive);
	};

	// удаление класса с ошибкой
	_hideInputError(inputElement) {
		const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
		inputElement.classList.remove(this._config.inputErrorClass);
		errorElement.classList.remove(this._config.inputErrorActive);
		errorElement.textContent = '';
	};

	// добавление или удаление текста ошибки в зависимости от валидности поля ввода
	_checkInputValidity(inputElement) {
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement, inputElement.validationMessage);
		} else {
			this._hideInputError(inputElement);
		}
	};

	// проверка валидность поля ввода
	_hasInvalidInput() {
		return this._inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		});
	};

	toggleButtonState = () => {
		if (this._hasInvalidInput()) {
			this._buttonElement.classList.add(this._inactiveButtonClass);
			this._buttonElement.setAttribute('disabled', true);
		} else {
			this._buttonElement.classList.remove(this._inactiveButtonClass);
			this._buttonElement.removeAttribute('disabled');
		}
	}

	_setEventListeners() {
		this.toggleButtonState();

		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._checkInputValidity(inputElement);
				this.toggleButtonState();
			});
		});

		this._formElement.addEventListener('submit', (event) => {
			event.preventDefault();
		})
	};

	enableValidation() {
		this._setEventListeners();
	};
}