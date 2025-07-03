import axios from "axios";

console.log("API base URL:", import.meta.env.VITE_BACKEND_API);
const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
});

// Add token to headers if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
