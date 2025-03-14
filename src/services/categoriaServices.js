import { api } from "../api";

export const categoriaServices = {
    getAll: async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log("Você precisa estar logado para acessar as categorias.");
                return;
            }
            const response = await api.get('/categorias', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.log("Você precisa estar logado para acessar a categoria.");
                return;
            }

            const response = await api.get(`/categorias/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar categoria:", error);
            throw error;
        }
    },

    create: async (categoria) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.log("Você precisa estar logado para criar uma categoria.");
                return;
            }

            const response = await api.post('/categorias', categoria, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao criar categoria:", error);
            throw error;
        }
    },

    update: async (id, categoria) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.log("Você precisa estar logado para atualizar uma categoria.");
                return;
            }

            const response = await api.put(`/categorias/${id}`, categoria, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar categoria:", error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.log("Você precisa estar logado para deletar uma categoria.");
                return;
            }

            await api.delete(`/categorias/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error("Erro ao deletar categoria:", error);
            throw error;
        }
    }

};