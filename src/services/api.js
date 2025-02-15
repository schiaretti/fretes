import axios from 'axios'

const api = axios.create({
   baseURL:"sauloapi-production.up.railway.app",

});

export default api 