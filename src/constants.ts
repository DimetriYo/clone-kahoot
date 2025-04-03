import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_DEV_API,
  timeout: 1000,
})
