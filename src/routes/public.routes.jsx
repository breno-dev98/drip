import { BrowserRouter, Routes, Route } from "react-router-dom"
import CadastroPage from "../pages/CadastroPage"

const PublicRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/cadastro" element={<CadastroPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default PublicRoutes;