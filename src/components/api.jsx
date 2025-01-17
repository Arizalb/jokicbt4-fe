import axios from "axios";

const api = axios.create({
  baseUrl: "https://jokicbt4.vercel.app",
  headers: {},
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
      return config;
    }
    return Promise.reject(new Error("No token"));
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
