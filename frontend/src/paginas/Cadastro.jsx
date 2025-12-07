import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MdPerson, MdEmail, MdLock, MdPersonAdd, MdRestaurant } from 'react-icons/md';
import { useAuth } from '../contextos/AuthContext';
import { cadastrar } from '../servicos/autenticacaoService';

const Cadastro = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [dados, setDados] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
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

    if (dados.senha !== dados.confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    setCarregando(true);

    try {
      const resultado = await cadastrar(dados.nome, dados.email, dados.senha);
      login(resultado.usuario, resultado.token);
      navigate('/restaurantes');
    } catch (error) {
      setErro(error.response?.data?.erro || 'Erro ao fazer cadastro');
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
        <h2 style={estilos.subtitulo}>Cadastro</h2>
        
        {erro && <div style={estilos.erro}>{erro}</div>}
        
        <form onSubmit={handleSubmit} style={estilos.form}>
          <div style={estilos.campo}>
            <label style={estilos.label}>
              <MdPerson style={estilos.iconeLabel} />
              Nome
            </label>
            <input
              type="text"
              name="nome"
              value={dados.nome}
              onChange={handleChange}
              style={estilos.input}
              placeholder="Seu nome"
              required
            />
          </div>

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
              placeholder="Mínimo 6 caracteres"
              required
              minLength="6"
            />
          </div>

          <div style={estilos.campo}>
            <label style={estilos.label}>
              <MdLock style={estilos.iconeLabel} />
              Confirmar Senha
            </label>
            <input
              type="password"
              name="confirmarSenha"
              value={dados.confirmarSenha}
              onChange={handleChange}
              style={estilos.input}
              placeholder="Digite a senha novamente"
              required
            />
          </div>

          <button 
            type="submit" 
            style={estilos.botao}
            disabled={carregando}
          >
            <MdPersonAdd style={estilos.iconeBotao} />
            {carregando ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <div style={estilos.links}>
          <Link to="/login" style={estilos.link}>
            Já tem conta? Faça login
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
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
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
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
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
    color: '#10b981'
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
    color: 'var(--cor-secundaria)'
  },
  input: {
    padding: '0.875rem',
    border: '2px solid var(--cor-borda)',
    borderRadius: 'var(--raio-md)',
    fontSize: '1rem',
    outline: 'none'
  },
  botao: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
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
    color: 'var(--cor-secundaria)',
    fontSize: '0.95rem',
    textDecoration: 'none',
    fontWeight: '600'
  }
};

export default Cadastro;

