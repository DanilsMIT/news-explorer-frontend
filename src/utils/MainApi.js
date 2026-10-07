class MainApi {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  checkResponse(res) {
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
    }).then(this.checkResponse);
  }

  login(email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then(this.checkResponse);
  }

  checkToken(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this.checkResponse);
  }

  getArticles(token) {
    return fetch(`${this.baseUrl}/articles`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(this.checkResponse);
  }

  saveArticle(token, articleData) {
    return fetch(`${this.baseUrl}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(articleData),
    }).then(this.checkResponse);
  }

  deleteArticle(token, articleId) {
    return fetch(`${this.baseUrl}/articles/${articleId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(this.checkResponse);
  }
}

export const mainApi = new MainApi({
  baseUrl: "http://localhost:3000",
});
