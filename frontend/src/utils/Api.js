class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(`${this._baseUrl}/${url}`, options).then(this._checkResponse);
  }

  getInitialCards() {
    return this._request(`cards`, {
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._request(`users/me`, {
      headers: this._headers,
    });
  }

  patchUserInfo(name, about) {
    return this._request(`users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  patchAvatar(url) {
    return this._request(`users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: url,
      }),
    });
  }

  postNewCard(name, link) {
    return this._request(`cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  deleteCard(id) {
    return this._request(`cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  _putLikeCard(cardId) {
    return this._request(`cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    });
  }

  _deleteLikeCard(cardId) {
    return this._request(`cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._putLikeCard(cardId);
    }
    return this._deleteLikeCard(cardId);
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: 'f569d5a2-82ff-41f3-8900-7cdbe10a5486',
    'Content-Type': 'application/json',
  },
});

export default api;
