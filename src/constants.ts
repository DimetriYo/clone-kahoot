import axios from "axios"

const DEV_BE_HOST = "http://localhost:3000/api"
const PROD_BE_HOST = "https://piggies-quiz-m5production.amvera.io/api"

export const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD ? PROD_BE_HOST : DEV_BE_HOST,
  timeout: 1000,
  withCredentials: true,
})

export const LS_USER_ID_KEY = "userId"
