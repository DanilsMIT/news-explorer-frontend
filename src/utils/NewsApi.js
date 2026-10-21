class NewsApi {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Error del servidor: " + res.status);
  }

  getNews(keyword) {
    const finalUrl = `${this.baseUrl}/search-news?q=${keyword}`;

    return fetch(finalUrl)
      .then((res) => this.checkResponse(res))
      .then((data) => {
        console.log("Respuesta desde mi Backend:", data);
        return data;
      });
  }
}

import { BASE_URL } from "./constants";

export const newsApi = new NewsApi({
  baseUrl: BASE_URL,
});
