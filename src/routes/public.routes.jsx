import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import CadastroPage from "../pages/CadastroPage"
import LoginPage from "../pages/LoginPage";

const PublicRoutes = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/cadastro" element={<CadastroPage />} />
          <Route path="/entrar" element={<LoginPage />} />

          <Route path="*" element={<Navigate to="/entrar" replace />} />
        </Routes>
      </BrowserRouter>
    );
}

export default PublicRoutes;