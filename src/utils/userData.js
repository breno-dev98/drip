import { jwtDecode } from "jwt-decode";

export const userData = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const decode = jwtDecode(token);
        return decode;
    } catch (error) {
        console.error("Token inválido", error);
        return null
    }
}