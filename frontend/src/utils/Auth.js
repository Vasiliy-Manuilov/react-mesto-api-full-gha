export const BASE_URL = "http://localhost:4000/";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function registerUser(email, password) {
  return fetch(`${BASE_URL}signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({email, password}),
  }).then(checkResponse);
}

export function loginUser(email, password) {
  return fetch(`${BASE_URL}signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export function getToken() {
  return fetch(`${BASE_URL}users/me`, {
    method: "GET",
    headers: {
      // 'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    credentials: 'include'
  }).then(checkResponse);
}
