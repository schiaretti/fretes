import axios from "axios";

const api = axios.create({
  baseURL: "https://bdsaulo-j273amk7f-schiarettis-projects.vercel.app/",
});

// Interceptador para adicionar o token JWT automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Pegue o token do localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Envia o token no cabeçalho
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
