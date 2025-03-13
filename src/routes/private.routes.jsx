import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "../components/layout/Layout";
import HomePage from "../pages/Home";
import CategoriasPage from "../pages/Categorias";
import MarcasPage from "../pages/Marcas";

const PrivateRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/categorias" element={<CategoriasPage />} />
                    <Route path="/marcas" element={<MarcasPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default PrivateRoutes;