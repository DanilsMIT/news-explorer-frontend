class MainApi {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  register(email, password, name) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    }).then(this._checkResponse);
  }

  login(email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

  getUserInfo(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  getArticles(token) {
    return fetch(`${this.baseUrl}/articles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  saveArticle(token, articleData) {
    return fetch(`${this.baseUrl}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(articleData),
    }).then(this._checkResponse);
  }

  deleteArticle(token, articleId) {
    return fetch(`${this.baseUrl}/articles/${articleId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
}

// Configuración dinámica para producción (Vite)
const BASE_URL = import.meta.env.PROD
  ? import.meta.env.BASE_URL
  : "http://localhost:3001";

export const mainApi = new MainApi({
  baseUrl: BASE_URL,
});
