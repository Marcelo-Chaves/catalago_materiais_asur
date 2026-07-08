import axios from "axios";

console.log("API NOVA PRODUÇÃO CARREGADA");

const api = axios.create({
  baseURL: "https://catalago-materiais-asur.onrender.com",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;