
import axios from 'axios';

const pokeApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'https://pokeapi.co/api/v2',
  timeout: Number(import.meta.env.VITE_API_TIMEOUT ?? 8000),
});

pokeApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') return Promise.reject(new Error('Tiempo de espera agotado'));
      if (!error.response) return Promise.reject(new Error('Error de red'));
      const status = error.response.status;
      if (status === 404) return Promise.reject(new Error('Recurso no encontrado'));
      return Promise.reject(new Error(`Error de servidor (${status})`));
    }
    return Promise.reject(error as Error);
  }
);

export default pokeApi;