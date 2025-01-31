import axios from 'axios'

// Defina a URL do seu backend hospedado na Vercel
const api = axios.create({
   baseURL: "https://bdsaulo.vercel.app/",
   headers: {
     "Content-Type": "application/json",
   },
 });

 // Interceptador para incluir o token automaticamente
api.interceptors.request.use((config) => {
   const token = localStorage.getItem("token");
   if (token) {
     config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
 });
 

export default api 