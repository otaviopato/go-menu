import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MdEmail, MdLock, MdLogin, MdRestaurant } from 'react-icons/md';
import { useAuth } from '../contextos/AuthContext';
import { entrar } from '../servicos/autenticacaoService';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [dados, setDados] = useState({
    email: '',
    senha: ''
  });
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleChange = (e) => {
    setDados({
      ...dados,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const resultado = await entrar(dados.email, dados.senha);
      login(resultado.usuario, resultado.token);
      navigate('/restaurantes');
    } catch (error) {
      setErro(error.response?.data?.erro || 'Erro ao fazer login');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={estilos.container}>
      <div style={estilos.card}>
        <h1 style={estilos.titulo}>
          <MdRestaurant style={estilos.iconeGrande} />
          Go Menu
        </h1>
        <h2 style={estilos.subtitulo}>Login</h2>
        
        {erro && <div style={estilos.erro}>{erro}</div>}
        
        <form onSubmit={handleSubmit} style={estilos.form}>
          <div style={estilos.campo}>
            <label style={estilos.label}>
              <MdEmail style={estilos.iconeLabel} />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={dados.email}
              onChange={handleChange}
              style={estilos.input}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div style={estilos.campo}>
            <label style={estilos.label}>
              <MdLock style={estilos.iconeLabel} />
              Senha
            </label>
            <input
              type="password"
              name="senha"
              value={dados.senha}
              onChange={handleChange}
              style={estilos.input}
              placeholder="Sua senha"
              required
            />
          </div>

          <button 
            type="submit" 
            style={estilos.botao}
            disabled={carregando}
          >
            <MdLogin style={estilos.iconeBotao} />
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div style={estilos.links}>
          <Link to="/cadastro" style={estilos.link}>
            Não tem conta? Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
};

const estilos = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    padding: '1rem'
  },
  card: {
    background: 'white',
    borderRadius: 'var(--raio-xl)',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '420px',
    boxShadow: 'var(--sombra-xl)'
  },
  titulo: {
    fontSize: '2.25rem',
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: '0.5rem',
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.02em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  iconeGrande: {
    fontSize: '2.5rem',
    color: '#2563eb'
  },
  subtitulo: {
    fontSize: '1.25rem',
    textAlign: 'center',
    marginBottom: '2rem',
    color: 'var(--cor-texto-claro)',
    fontWeight: '600'
  },
  erro: {
    background: '#fee2e2',
    color: '#dc2626',
    padding: '0.875rem 1rem',
    borderRadius: 'var(--raio-md)',
    marginBottom: '1rem',
    fontSize: '0.9rem',
    textAlign: 'center',
    border: '1px solid #fecaca',
    fontWeight: '500'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  },
  campo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'var(--cor-texto)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  iconeLabel: {
    fontSize: '1.2rem',
    color: 'var(--cor-primaria)'
  },
  input: {
    padding: '0.875rem',
    border: '2px solid var(--cor-borda)',
    borderRadius: 'var(--raio-md)',
    fontSize: '1rem',
    outline: 'none'
  },
  botao: {
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    color: 'white',
    padding: '1rem',
    border: 'none',
    borderRadius: 'var(--raio-md)',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '0.5rem',
    boxShadow: 'var(--sombra-md)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  iconeBotao: {
    fontSize: '1.3rem'
  },
  links: {
    marginTop: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    alignItems: 'center'
  },
  link: {
    color: 'var(--cor-primaria)',
    fontSize: '0.95rem',
    textDecoration: 'none',
    fontWeight: '600'
  }
};

export default Login;

