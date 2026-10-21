export const BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_BASE_URL
  : "http://localhost:3001";

export const NEWS_URL = "https://nomoreparties.co/news/v2/everything";
export const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
