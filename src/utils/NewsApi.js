import { NEWS_URL, NEWS_API_KEY } from "./constants";

class NewsApi {
  constructor({ baseUrl, apiKey }) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Error del servidor: " + res.status);
  }

  getNews(keyword) {
    const finalUrl = `${this.baseUrl}?q=${keyword}&apikey=${this.apiKey}&lang=es&max=10`;

    return fetch(finalUrl)
      .then((res) => this.checkResponse(res))
      .then((data) => {
        console.log("Respuesta de GNews:", data);
        return data;
      });
  }
}

export const newsApi = new NewsApi({
  baseUrl: NEWS_URL,
  apiKey: NEWS_API_KEY,
});
