import axios from "axios"
export const axiosInstance = axios.create({
    baseURL: "http://localhost:6969/api",
    withCredentials: true,
})
