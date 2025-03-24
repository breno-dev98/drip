import { api } from "../api";
const produtos = "/produtos"
export const produtosServices = {
    getAll: async () => {
        try {
            const response = await api.get(produtos);
            return await response.data
        } catch (error) {
            console.error("Erro ao buscar produtos", error.response.data);
        }
    },

    getById: async (id) => {
        try {
            const response = await api.get(`${produtos}/${id}`)
            return response.data
        } catch (error) {
            console.error("Erro ao buscar usuario", error.response.data);
        }
    },

    create: async (data) => {
        try {
            const response = await api.post(produtos, data)
            return response.data;
        } catch (error) {
            console.error("Erro ao cadastrar produto", error.response.data);
        }
    },

    update: async (id, data) => {
        try {
            const response = await api.put(`${produtos}/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar produto", error.response.data);
        }
    },

    delete: async (id) => {
        try {
            const response = await api.delete(`${produtos}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao deletar produto", error.response.data);
        }
    }
}