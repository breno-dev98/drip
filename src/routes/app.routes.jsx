import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/layout/Layout";
import HomePage from "../pages/Home";
import CategoriasPage from "../pages/Categorias";
import MarcasPage from "../pages/Marcas";
import ProdutosPage from "../pages/Produtos";
import CadastroPage from "../pages/CadastroPage";
import LoginPage from "../pages/LoginPage";
import PrivateRoutes from "./private.routes";
import PublicRoutes from "./public.routes";

const AppRoutes = () => {
  const { auth } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas (Apenas usuários não logados) */}
        <Route element={<PublicRoutes />}>
          <Route path="/cadastro" element={<CadastroPage />} />
          <Route path="/entrar" element={<LoginPage />} />
        </Route>

        {/* Rotas privadas (Apenas usuários logados) */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/categorias" element={<CategoriasPage />} />
            <Route path="/marcas" element={<MarcasPage />} />
            <Route path="/produtos" element={<ProdutosPage />} />
          </Route>
        </Route>

        {/* Rota padrão para redirecionamento */}
        <Route path="*" element={<Navigate to={auth.isAuthenticated ? "/" : "/entrar"} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
