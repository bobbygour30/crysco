import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
  if (token) {
    config.headers.token = token; // your middleware expects this header
  }
  return config;
});

export default api;