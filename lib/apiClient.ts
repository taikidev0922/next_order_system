import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.url && !config.url.includes("/login")) {
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default apiClient;
