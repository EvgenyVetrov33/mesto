
export default class UserInfo {
	constructor(data, { nameSelector, descriptionSelector }) {
		this._nameSelector = document.querySelector(nameSelector);
		this._descriptionSelector = document.querySelector(descriptionSelector);
		// this._name = data.name;
		// this._about = data.about;
		// this._avatar = data.avatar;
	}

	getUserInfo() {
		return { nameSelector: this._nameSelector.textContent, descriptionSelector: this._descriptionSelector.textContent }
	}

	setUserInfo(nameSelector, descriptionSelector) {
		this._nameSelector.textContent = nameSelector;
		this._descriptionSelector.textContent = descriptionSelector;
	}
}