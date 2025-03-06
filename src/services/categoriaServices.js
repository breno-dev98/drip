import { api } from "../api";

export const categoriaServices = {
    getAll: async () => {
        try {
            const response = await api.get('/categorias');
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const response = await api.get(`/categorias/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar categoria:", error);
            throw error;
        }
    },

    create: async (categoria) => {
        try {
            const response = await api.post('/categorias', categoria);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar categoria:", error);
            throw error;
        }
    },

    update: async (id, categoria) => {
        try {
            const response = await api.put(`/categorias/${id}`, categoria);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar categoria:", error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            await api.delete(`/categorias/${id}`);
        } catch (error) {
            console.error("Erro ao deletar categoria:", error);
            throw error;
        }
    }

};