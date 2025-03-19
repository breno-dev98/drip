import { api } from "../api"

const token = localStorage.getItem("token");

const headers = {
    Authorization: `Bearer ${token}`
}
const verificarAutorização = () => {
    if (!token) {
        console.log("Você precisa estar logado para acessar a rota /marcas")
        throw new Error("Usuário não autenticado");
    }

}


export const marcasServices = {

    getAll: async () => {
        try {
            verificarAutorização()
            const response = await api.get("/marcas", {headers: headers});
            return response.data
        } catch (error) {
            console.error("Erro ao buscar marcas", error);
            throw error;
            
        }
    },

    getById: async (id) => {
        try {
            verificarAutorização()
            const response = await api.get(`/marcas/${id}`, { headers: headers })
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar a marca", error);
            throw error;
        }
    },

    create: async (data) => {
        try {
            verificarAutorização()
            const response = await api.post("/marcas", data, { headers: headers })
            return response.data;
        } catch (error) {
            console.error("Erro ao criar a marca", error);
            throw error;
        }
    },

    update: async (id, data) => {
        try {
            verificarAutorização()
            const response = await api.put(`/marcas/${id}`, data, { headers: headers })
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar a marca", error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            verificarAutorização()
            const response = await api.delete(`/marcas/${id}`, { headers: headers })
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar a marca", error);
            throw error;
        }
    },
}