import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAdd, MdRestaurant, MdEdit, MdDelete, MdLink, MdLogin, MdFastfood, MdCategory } from 'react-icons/md';
import Cabecalho from '../componentes/Cabecalho';
import ModalRestaurante from '../componentes/ModalRestaurante';
import { listarRestaurantes, criarRestaurante, atualizarRestaurante, excluirRestaurante } from '../servicos/restauranteService';

const SelecionarRestaurante = () => {
  const navigate = useNavigate();
  const [restaurantes, setRestaurantes] = useState([]);
  const [restauranteSelecionado, setRestauranteSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarRestaurantes();
  }, []);

  const carregarRestaurantes = async () => {
    try {
      const dados = await listarRestaurantes();
      setRestaurantes(dados);
    } catch (error) {
      console.error('Erro ao carregar restaurantes:', error);
    } finally {
      setCarregando(false);
    }
  };

  const handleNovo = () => {
    setRestauranteSelecionado(null);
    setModalAberto(true);
  };

  const handleEditar = (restaurante) => {
    setRestauranteSelecionado(restaurante);
    setModalAberto(true);
  };

  const handleSalvar = async (dados) => {
    try {
      if (restauranteSelecionado) {
        await atualizarRestaurante(restauranteSelecionado.id, dados);
      } else {
        await criarRestaurante(dados);
      }
      await carregarRestaurantes();
      setModalAberto(false);
    } catch (error) {
      throw error;
    }
  };

  const handleExcluir = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este restaurante? Todos os itens e categorias serão perdidos.')) {
      try {
        await excluirRestaurante(id);
        await carregarRestaurantes();
      } catch (error) {
        alert(error.response?.data?.erro || 'Erro ao excluir restaurante');
      }
    }
  };

  const handleAcessar = (id) => {
    localStorage.setItem('restauranteId', id);
    navigate('/dashboard');
  };

  const copiarLink = (slug) => {
    const link = `${window.location.origin}/cardapio/${slug}`;
    navigator.clipboard.writeText(link);
    alert('Link copiado!');
  };

  return (
    <div style={estilos.container}>
      <Cabecalho titulo="Meus Restaurantes" mostrarBotaoSair={true} />

      <div style={estilos.conteudo}>
        <div style={estilos.acoes}>
          <button onClick={handleNovo} style={estilos.botaoNovo}>
            <MdAdd style={estilos.icone} />
            Novo Restaurante
          </button>
        </div>

        {carregando ? (
          <div style={estilos.carregando}>Carregando...</div>
        ) : restaurantes.length === 0 ? (
          <div style={estilos.vazio}>
            Nenhum restaurante cadastrado. Clique em "Novo Restaurante" para começar.
          </div>
        ) : (
          <div style={estilos.grade}>
            {restaurantes.map((restaurante) => (
              <div key={restaurante.id} style={estilos.card}>
                <div style={estilos.cardConteudo}>
                  <h3 style={estilos.nome}>
                    <MdRestaurant style={estilos.iconeNome} />
                    {restaurante.nome}
                  </h3>
                  {restaurante.descricao && (
                    <p style={estilos.descricao}>{restaurante.descricao}</p>
                  )}
                  <div style={estilos.stats}>
                    <span style={estilos.stat}>
                      <MdFastfood style={estilos.iconeStat} />
                      {restaurante._count.itens} {restaurante._count.itens === 1 ? 'item' : 'itens'}
                    </span>
                    <span style={estilos.stat}>
                      <MdCategory style={estilos.iconeStat} />
                      {restaurante._count.categorias} {restaurante._count.categorias === 1 ? 'categoria' : 'categorias'}
                    </span>
                  </div>
                </div>
                <div style={estilos.cardAcoes}>
                  <button onClick={() => handleAcessar(restaurante.id)} style={{...estilos.botao, ...estilos.botaoAcessar}}>
                    <MdLogin style={estilos.iconeBotao} />
                    Acessar
                  </button>
                  <button onClick={() => copiarLink(restaurante.slug)} style={{...estilos.botao, ...estilos.botaoLink}}>
                    <MdLink style={estilos.iconeBotao} />
                    Copiar Link
                  </button>
                  <button onClick={() => handleEditar(restaurante)} style={{...estilos.botao, ...estilos.botaoEditar}}>
                    <MdEdit style={estilos.iconeBotao} />
                    Editar
                  </button>
                  <button onClick={() => handleExcluir(restaurante.id)} style={{...estilos.botao, ...estilos.botaoExcluir}}>
                    <MdDelete style={estilos.iconeBotao} />
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modalAberto && (
        <ModalRestaurante
          restaurante={restauranteSelecionado}
          onSalvar={handleSalvar}
          onFechar={() => setModalAberto(false)}
        />
      )}
    </div>
  );
};

const estilos = {
  container: {
    minHeight: '100vh',
    background: 'var(--cor-fundo)'
  },
  conteudo: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '2rem 1.5rem'
  },
  acoes: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '2rem'
  },
  botaoNovo: {
    background: 'var(--cor-primaria)',
    color: 'white',
    padding: '0.875rem 2rem',
    border: 'none',
    borderRadius: 'var(--raio-lg)',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: 'var(--sombra-md)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  icone: {
    fontSize: '1.3rem'
  },
  carregando: {
    textAlign: 'center',
    padding: '4rem',
    fontSize: '1.2rem',
    color: 'var(--cor-texto-claro)',
    background: 'white',
    borderRadius: 'var(--raio-xl)'
  },
  vazio: {
    textAlign: 'center',
    padding: '4rem',
    fontSize: '1.2rem',
    color: 'var(--cor-texto-claro)',
    background: 'white',
    borderRadius: 'var(--raio-xl)',
    boxShadow: 'var(--sombra-md)'
  },
  grade: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))',
    gap: '1.5rem'
  },
  card: {
    background: 'white',
    borderRadius: 'var(--raio-xl)',
    padding: '1.75rem',
    boxShadow: 'var(--sombra-md)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  cardConteudo: {
    flex: 1
  },
  nome: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '0.75rem',
    color: 'var(--cor-texto)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  iconeNome: {
    fontSize: '1.75rem',
    color: 'var(--cor-primaria)'
  },
  descricao: {
    color: 'var(--cor-texto-claro)',
    fontSize: '0.95rem',
    marginBottom: '1rem',
    lineHeight: '1.6'
  },
  stats: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  stat: {
    background: 'var(--cor-fundo-escuro)',
    padding: '0.5rem 1rem',
    borderRadius: 'var(--raio-md)',
    fontSize: '0.9rem',
    color: 'var(--cor-texto-claro)',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem'
  },
  iconeStat: {
    fontSize: '1.1rem'
  },
  cardAcoes: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.75rem',
    borderTop: '1px solid var(--cor-borda)',
    paddingTop: '1.25rem'
  },
  botao: {
    padding: '0.75rem',
    border: 'none',
    borderRadius: 'var(--raio-md)',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  iconeBotao: {
    fontSize: '1.1rem'
  },
  botaoAcessar: {
    background: 'var(--cor-primaria)',
    color: 'white',
    gridColumn: '1 / -1'
  },
  botaoLink: {
    background: 'var(--cor-secundaria)',
    color: 'white',
    gridColumn: '1 / -1'
  },
  botaoEditar: {
    background: 'var(--cor-fundo-escuro)',
    color: 'var(--cor-texto)'
  },
  botaoExcluir: {
    background: 'var(--cor-perigo)',
    color: 'white'
  }
};

export default SelecionarRestaurante;

