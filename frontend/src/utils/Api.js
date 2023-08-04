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
      credentials: 'include',
    });
  }

  getUserInfo() {
    return this._request(`users/me`, {
      headers: this._headers,
      credentials: 'include',
    });
  }

  patchUserInfo(name, about) {
    return this._request(`users/me`, {
      method: 'PATCH',
      credentials: 'include',
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
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: url,
      }),
    });
  }

  postNewCard(name, link) {
    return this._request(`cards`, {
      method: 'POST',
      credentials: 'include',
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
      credentials: 'include',
      headers: this._headers,
    });
  }

  _putLikeCard(cardId) {
    return this._request(`cards/${cardId}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this._headers,
    });
  }

  _deleteLikeCard(cardId) {
    return this._request(`cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
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
  baseUrl: 'https://api.add-card-your-place.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
