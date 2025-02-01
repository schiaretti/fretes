import axios from 'axios'

const api = axios.create({
   baseURL:"https://bdsaulo-hdqipae1s-schiarettis-projects.vercel.app/",
   headers: {
      "Content-Type": "application/json",
    },  
});

export default api 