import { apiKey } from "./constants";

class NewsApi {
  constructor() {
    this.newsBaseUrl = 
      "https://nomoreparties.co/news/v2/everything?language=en&";
  }
  
  async getNews(query) {
    return fetch(this.newsBaseUrl + 
      `q=${query}&apiKey=${apiKey}&pageSize=100&from=${this._getRecentDate()}`,
      { method: "GET" }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject("something went wrong");
        };
      });
  }

  _getRecentDate() {
    const recentDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const dateSrting = recentDate.toISOString().substring(0, 10);
    return dateSrting;
  }
}

export const api = new NewsApi();