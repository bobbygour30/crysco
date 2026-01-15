// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use((config) => {
  // User token for normal routes
  const userToken = localStorage.getItem("token");
  if (userToken) {
    config.headers.token = userToken;
  }

  // Admin token for admin routes
  const adminToken = localStorage.getItem("adminToken");
  if (adminToken && (
    config.url.includes("/admin") ||
    config.url.includes("/product") ||
    config.url.includes("/order/list") ||
    config.url.includes("/order/status") ||
    config.url.includes("/order/delete")
  )) {
    config.headers.token = adminToken;
    console.log(`[API] Sending admin token for: ${config.url}`);
  }

  return config;
});

export default api;