import axios from 'axios'

const api = axios.create({
   baseURL:"https://bdsaulo-lmecnbdv9-schiarettis-projects.vercel.app/",
   headers: {
      "Content-Type": "application/json",
    },  
});

export default api 