import axios from 'axios'

// Defina a URL do seu backend hospedado na Vercel
const api = axios.create({
   baseURL: "https://bdsaulo.vercel.app/",
   headers: {
     "Content-Type": "application/json",
   },
 });

export default api 