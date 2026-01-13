import axios from "axios";

const api = axios.create({
  baseURL: "https://gigflow-backend-e951.onrender.com/api",
  withCredentials: true
});

export default api;
