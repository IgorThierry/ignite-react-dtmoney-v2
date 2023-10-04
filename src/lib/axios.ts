import axios from 'axios'

// axios.defaults.withCredentials = true

const apiURL = import.meta.env.VITE_API_URL
const baseURL = apiURL ? String(apiURL) : 'http://localhost'

export const api = axios.create({
  baseURL,
  withCredentials: true,
})
