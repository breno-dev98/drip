import { api } from "../api";

export const usuarioServices = {
    create: async (data) => {

        try {
            const response = await api.post("/usuarios", data);
            if (response.data.token) {
                localStorage.setItem("token", response.data.token)
                return response.data
            }
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            throw error;
        }
    }
}
