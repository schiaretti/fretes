import axios from "axios";

const api = axios.create({
  baseURL: "https://bdsaulo-8ekb874h0-schiarettis-projects.vercel.app",
});

// Interceptador para incluir o token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;