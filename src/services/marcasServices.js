import { api } from "../api"

export const marcasServices = {

    getAll: async () => {
        try {
            const response = await api.get("/marcas");
            return response.data
        } catch (error) {
            console.error("Erro ao buscar marcas", error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const response = await api.get(`/marcas/${id}`)
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar a marca", error);
            throw error;
        }
    },

    create: async (data) => {
        try {
            const response = await api.post("/marcas", data)
            return response.data;
        } catch (error) {
            console.error("Erro ao criar a marca", error);
            throw error;
        }
    },

    update: async (id, data) => {
        try {
            const response = await api.put(`/marcas/${id}`, data)
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar a marca", error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const response = await api.delete(`/marcas/${id}`)
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar a marca", error);
            throw error;
        }
    },
}