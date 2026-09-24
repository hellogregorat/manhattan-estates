import axios from 'axios'
import { API_BASE } from './config'

const client = axios.create({ baseURL: API_BASE })

// Request interceptor — attaches the JWT (if present) to every outgoing request
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response interceptor — normalizes error messages and clears the session on 401
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    const message = error.response?.data?.error || error.message || 'Request error'
    return Promise.reject(new Error(message))
  }
)

export const api = {
  get: (url) => client.get(url).then((res) => res.data),
  post: (url, body) => client.post(url, body).then((res) => res.data),
  postForm: (url, formData) => client.post(url, formData).then((res) => res.data),
  putForm: (url, formData) => client.put(url, formData).then((res) => res.data),
  del: (url) => client.delete(url).then((res) => res.data)
}

export default client
