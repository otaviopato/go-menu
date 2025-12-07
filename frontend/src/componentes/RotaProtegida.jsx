import { Navigate } from 'react-router-dom';
import { useAuth } from '../contextos/AuthContext';

const RotaProtegida = ({ children }) => {
  const { estaAutenticado, carregando } = useAuth();

  if (carregando) {
    return (
      <div style={estilos.container}>
        <div style={estilos.carregando}>Carregando...</div>
      </div>
    );
  }

  if (!estaAutenticado()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const estilos = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'var(--cor-fundo)'
  },
  carregando: {
    fontSize: '1.2rem',
    color: 'var(--cor-texto-claro)',
    fontWeight: '600'
  }
};

export default RotaProtegida;
