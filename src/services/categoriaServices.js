import { api } from "../api";

export const getAll = async () => {
    try {
        const response = await api.get('/categorias');
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        throw error;
    }
}