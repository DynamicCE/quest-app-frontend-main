import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Burada loglama veya hata dönüştürme işlemleri yapabilirsiniz
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
