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

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      alert("認証に失敗しました。ログイン画面に遷移します。");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default apiClient;
