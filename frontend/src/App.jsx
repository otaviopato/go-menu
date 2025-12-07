import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contextos/AuthContext'
import RotaProtegida from './componentes/RotaProtegida'
import Login from './paginas/Login'
import Cadastro from './paginas/Cadastro'
import SelecionarRestaurante from './paginas/SelecionarRestaurante'
import Dashboard from './paginas/Dashboard'
import CardapioPublico from './paginas/CardapioPublico'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/cardapio/:slug" element={<CardapioPublico />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route
            path="/restaurantes"
            element={
              <RotaProtegida>
                <SelecionarRestaurante />
              </RotaProtegida>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RotaProtegida>
                <Dashboard />
              </RotaProtegida>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

