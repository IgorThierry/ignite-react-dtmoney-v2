import axios from 'axios'

// axios.defaults.withCredentials = true

export const api = axios.create({
  baseURL: String(import.meta.env.VITE_API_URL),
  withCredentials: true,
})
