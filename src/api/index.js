import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
    headers: {"Content-Type": "application/json"}
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        const rotasPublicas = ["/entrar", "/cadastro"];

        if (token && !rotasPublicas.some((rota) => config.url.includes(rota))) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    },

    (error) => {
        return Promise.reject(error)
    }
)