import axios from "axios";
export const Instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

export const formDataInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });