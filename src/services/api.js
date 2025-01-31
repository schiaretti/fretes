import axios from "axios";

const api = axios.create({
  baseURL: "https://bdsaulo-j273amk7f-schiarettis-projects.vercel.app/", // URL do backend
});

export default api;

