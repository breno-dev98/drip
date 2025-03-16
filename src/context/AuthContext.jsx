import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {

  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth({
        isAuthenticated: true,
        token: token,
      });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token); // Armazena o token no localStorage
    setAuth({
      isAuthenticated: true,
      token: token,
    });
  };

  const cadastro = (token) => {
    localStorage.setItem("token", token); // Armazena o token no localStorage
    setAuth({
      isAuthenticated: true,
      token: token,
    });
  };

  const logout = () => {
    localStorage.removeItem("token"); // Remove o token do localStorage
    setAuth({
      isAuthenticated: false,
      token: null,
    });
  };

  return <AuthContext.Provider value={{ auth, login, cadastro, logout }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
