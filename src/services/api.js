import axios from 'axios'

const api = axios.create({
   baseURL:' mongodb+srv://saulo:<db_password>@saulodb.cekl7.mongodb.net/?retryWrites=true&w=majority&appName=saulodb'
})

export default api 