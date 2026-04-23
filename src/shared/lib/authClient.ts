import axios from "axios"

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 5000, // 5 seconds
  headers: {
    "Content-Type": "application/json",
  },
})
