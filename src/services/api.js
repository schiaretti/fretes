import axios from 'axios'

const api = axios.create({
   baseURL:"https://sauloapi-production-0262.up.railway.app/",

});

export default api 