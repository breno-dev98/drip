import { api } from "../api";

export const loginService = async (data) => {
    try {
        const response = await api.post("/login", data);
        if (response.data.token) {
            localStorage.setItem("token", response.data.token)
            return response.data
        }
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        throw error;
    }
}