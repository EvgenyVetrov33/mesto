
const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	activeButtonClass: 'popup__button_valid',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'error_visible'
};

function setError(form, input, config) {
	const error = form.querySelector(`#${input.id}-error`);
	input.classList.add(config.inputErrorClass)
	error.textContent = input.validationMessage
}

function hideError(form, input, config) {
	const error = form.querySelector(`#${input.id}-error`);
	input.classList.remove(config.inputErrorClass)
	error.textContent = ''
}

function validateInput(form, input, config) {
	if (!input.validity.valid) {
		setError(form, input, config)
	} else {
		hideError(form, input, config)
	}
}

function disableButtonState(button, config) {
	button.classList.remove(config.activeButtonClass);
	button.classList.add(config.inactiveButtonClass);
	button.disabled = true;
}

function enableButtonState(button, config) {
	button.classList.remove(config.inactiveButtonClass);
	button.classList.add(config.activeButtonClass);
	button.disabled = false;
}

function setButtonState(inputs, button, config) {
	const hasErrors = inputs.some(input => !input.validity.valid);
	if (hasErrors) {
		disableButtonState(button, config);
	} else {
		enableButtonState(button, config);
	}
}

function setHandlers(form, config) {
	const inputs = Array.from(form.querySelectorAll(config.inputSelector));
	const button = form.querySelector(config.submitButtonSelector);
	inputs.forEach((input) => {
		input.addEventListener('input', () => {
			validateInput(form, input, config)
			setButtonState(inputs, button, config)
		})
	})
}

function enableValidation(config) {
	const formList = Array.from(document.querySelectorAll(config.formSelector));
	formList.forEach((form) => {
		setHandlers(form, config);
	});
};

enableValidation(validationConfig)


