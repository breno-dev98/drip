import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/layout/Layout'
import CategoriasPage from './pages/Categorias'
import HomePage from './pages/Home'
import MarcasPage from './pages/Marcas'
import CadastroPage from './pages/CadastroPage'

function App() {

  return (
    <BrowserRouter>
     <Routes>
      <Route path="" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/categorias" element={<CategoriasPage />} />
        <Route path="/marcas" element={<MarcasPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
      </Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App
