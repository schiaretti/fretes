import axios from 'axios';

// Crie a instância SEM o token inicial (ele pode ser dinâmico)
const api = axios.create({
  baseURL: 'https://sauloapi-production-e85a.up.railway.app/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Adicione interceptor para atualizar o token dinamicamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Ou sua forma de armazenamento
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor para tratamento global de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na requisição:', {
      url: error.config.url,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.config.headers
    });
    return Promise.reject(error);
  }
);

export default api;