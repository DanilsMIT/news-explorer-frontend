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
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(toDate.getDate() - 7);

    const to = toDate.toISOString().split("T")[0];
    const from = fromDate.toISOString().split("T")[0];

    const finalUrl = `${this.baseUrl}?q=${keyword}&apiKey=${this.apiKey}&from=${from}&to=${to}&pageSize=100`;

    return fetch(finalUrl).then((res) => this.checkResponse(res));
  }
}

export const newsApi = new NewsApi({
  baseUrl: "https://newsapi.org/v2/everything",
  apiKey: "399c8f7913c84d6cb60ca3837ec24260",
});
