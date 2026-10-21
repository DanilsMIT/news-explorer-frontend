export const BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_BASE_URL
  : "http://localhost:3001";

export const NEWS_URL = "https://gnews.io/api/v4/search";
export const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
