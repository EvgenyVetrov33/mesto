//export default class Api {
// constructor(config) {
// 	this.url = config.url;
// 	this.headers = config.headers;
// }

// _handleResponseStatus(res) {
// 	return res.ok
// ? res.json()
// 		: Promise.reject(`Произошла ошибка: ${res.status}`);
// }

// getUserInformation() {
// 	return fetch(`${this.url}/users/me`, {
// 		headers: this.headers
// 	})
// 		.then((res) => {
// 			return this._handleResponseStatus(res);
// 		});
// }
// getInitialCards() {
// 	return fetch(`${this.url}/cards`, {
// 		method: "GET",
// 		headers: {
// 			authorization: this.headers,
// 			"Content-Type": "application/json",
// 		},
// 	}).then((res) => {
// 		return this._handleResponseStatus(res);
// 	});
// }

// updateUserInformation(userInfo) {
// 	return fetch(`${this.url}/users/me`, {
// 		method: "PATCH",
// 		headers: {
// 			authorization: this.headers,
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify({
// 			name: userInfo.name,
// 			about: userInfo.about,
// 		}),
// 	}).then((res) => {
// 		return this._handleResponseStatus(res);
// 	});
// }
//}


// fetch('https://mesto.nomoreparties.co/v1/cohort-60', {
// 	headers: {
// 		authorization: '56c23e37-2d26-4f99-806c-d72ff6532f25',
// 		'Content-Type': 'application/json'
// 	}
// })
// 	.then(res => res.json())
// 	.then((result) => {
// 		console.log(result);
// 	});


const handleResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(new Error('Произошла ошибка'))
}

export default class Api {
	constructor(config) {
		this.url = config.url;
		this.headers = config.headers;
	}

	getTasks() {
		return fetch(this.url, {
			headers: this.headers
		})
			.then(handleResponse)
			.catch(err => {
				console.log(err);
				throw err;
			})
	}
	getInitialCards() {
		return fetch(`${this.url}/cards`, {
			headers: this.headers
		})
			.then(handleResponse)
	}
}



