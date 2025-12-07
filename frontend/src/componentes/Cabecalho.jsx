import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contextos/AuthContext';
import { MdArrowBack, MdExitToApp, MdRestaurant } from 'react-icons/md';

const Cabecalho = ({ titulo, mostrarBotaoVoltar = false, mostrarBotaoSair = false }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSair = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={estilos.cabecalho}>
      <div style={estilos.container}>
        {mostrarBotaoVoltar && (
          <button onClick={() => navigate(-1)} style={estilos.botaoVoltar}>
            <MdArrowBack style={estilos.icone} />
            Voltar
          </button>
        )}
        <h1 style={estilos.titulo}>
          <MdRestaurant style={estilos.iconeRestaurante} />
          {titulo}
        </h1>
        {mostrarBotaoSair && (
          <button onClick={handleSair} style={estilos.botaoSair}>
            <MdExitToApp style={estilos.icone} />
            Sair
          </button>
        )}
      </div>
    </header>
  );
};

const estilos = {
  cabecalho: {
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    color: 'white',
    padding: '1.25rem 0',
    boxShadow: 'var(--sombra-lg)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem'
  },
  titulo: {
    fontSize: '1.75rem',
    fontWeight: '700',
    margin: 0,
    letterSpacing: '-0.02em',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  iconeRestaurante: {
    fontSize: '2rem'
  },
  icone: {
    fontSize: '1.2rem'
  },
  botaoVoltar: {
    background: 'rgba(255, 255, 255, 0.15)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '0.625rem 1.25rem',
    borderRadius: 'var(--raio-lg)',
    fontSize: '0.95rem',
    fontWeight: '600',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  botaoSair: {
    background: 'rgba(239, 68, 68, 0.9)',
    color: 'white',
    border: 'none',
    padding: '0.625rem 1.5rem',
    borderRadius: 'var(--raio-lg)',
    fontSize: '0.95rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }
};

export default Cabecalho;

