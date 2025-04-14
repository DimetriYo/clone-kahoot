import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_DEV_API,
  timeout: 1000,
  withCredentials: true,
})

export const LS_USER_ID_KEY = "userId"
