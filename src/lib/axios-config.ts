import axios, { AxiosRequestConfig } from 'axios'
import { authStore } from '../features/auth/authStore'

const generateKey = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).substring(2) + Date.now().toString(36)

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080',
})

apiClient.interceptors.request.use((config) => {
  const auth = authStore.getBasicAuth()
  if (auth) {
    config.headers.Authorization = auth
  }
  // Adiciona Idempotency-Key apenas em operações POST
  if (config.method?.toUpperCase() === 'POST') {
    config.headers['Idempotency-Key'] = generateKey()
  }
  return config
})

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      authStore.clear()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const customInstance = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  const promise = apiClient({
    ...config,
    ...options,
  });
  return promise as unknown as Promise<T>;
};
