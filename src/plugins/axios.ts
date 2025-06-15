
import { App } from 'vue'
import axios,{AxiosInstance  } from 'axios'

const api:AxiosInstance  = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Accept': 'application/json',
  },
})

api.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error)
  }
)

export default api
