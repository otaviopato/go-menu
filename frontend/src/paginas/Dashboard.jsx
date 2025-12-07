import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdAdd, MdLink, MdFastfood, MdCategory, MdEdit, MdDelete } from 'react-icons/md';
import Cabecalho from '../componentes/Cabecalho';
import CartaoItem from '../componentes/CartaoItem';
import ModalItem from '../componentes/ModalItem';
import ModalCategoria from '../componentes/ModalCategoria';
import { listarItens, criarItem, atualizarItem, excluirItem } from '../servicos/itemService';
import { listarCategorias, criarCategoria, atualizarCategoria, excluirCategoria } from '../servicos/categoriaService';
import { buscarRestaurantePorId } from '../servicos/restauranteService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [restaurante, setRestaurante] = useState(null);
  const [itens, setItens] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [modalItemAberto, setModalItemAberto] = useState(false);
  const [modalCategoriaAberto, setModalCategoriaAberto] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState('itens');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const restauranteId = localStorage.getItem('restauranteId');
    if (!restauranteId) {
      navigate('/restaurantes');
      return;
    }
    carregarDados(restauranteId);
  }, [navigate]);

  const carregarDados = async (restauranteId) => {
    try {
      const [restauranteData, itensData, categoriasData] = await Promise.all([
        buscarRestaurantePorId(restauranteId),
        listarItens(restauranteId),
        listarCategorias(restauranteId)
      ]);
      setRestaurante(restauranteData);
      setItens(itensData);
      setCategorias(categoriasData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      if (error.response?.status === 400) {
        navigate('/restaurantes');
      }
    } finally {
      setCarregando(false);
    }
  };

  const handleVoltar = () => {
    localStorage.removeItem('restauranteId');
    navigate('/restaurantes');
  };

  const copiarLink = () => {
    if (restaurante) {
      const link = `${window.location.origin}/cardapio/${restaurante.slug}`;
      navigator.clipboard.writeText(link);
      alert('Link do cardápio copiado!');
    }
  };

  const handleNovoItem = () => {
    setItemSelecionado(null);
    setModalItemAberto(true);
  };

  const handleEditarItem = (item) => {
    setItemSelecionado(item);
    setModalItemAberto(true);
  };

  const handleSalvarItem = async (dados) => {
    const restauranteId = localStorage.getItem('restauranteId');
    try {
      if (itemSelecionado) {
        await atualizarItem(restauranteId, itemSelecionado.id, dados);
      } else {
        await criarItem(restauranteId, dados);
      }
      await carregarDados(restauranteId);
      setModalItemAberto(false);
    } catch (error) {
      throw error;
    }
  };

  const handleExcluirItem = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      const restauranteId = localStorage.getItem('restauranteId');
      try {
        await excluirItem(restauranteId, id);
        await carregarDados(restauranteId);
      } catch (error) {
        alert(error.response?.data?.erro || 'Erro ao excluir item');
      }
    }
  };

  const handleNovaCategoria = () => {
    setCategoriaSelecionada(null);
    setModalCategoriaAberto(true);
  };

  const handleEditarCategoria = (categoria) => {
    setCategoriaSelecionada(categoria);
    setModalCategoriaAberto(true);
  };

  const handleSalvarCategoria = async (nome) => {
    const restauranteId = localStorage.getItem('restauranteId');
    try {
      if (categoriaSelecionada) {
        await atualizarCategoria(restauranteId, categoriaSelecionada.id, nome);
      } else {
        await criarCategoria(restauranteId, nome);
      }
      await carregarDados(restauranteId);
      setModalCategoriaAberto(false);
    } catch (error) {
      throw error;
    }
  };

  const handleExcluirCategoria = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      const restauranteId = localStorage.getItem('restauranteId');
      try {
        await excluirCategoria(restauranteId, id);
        await carregarDados(restauranteId);
      } catch (error) {
        alert(error.response?.data?.erro || 'Erro ao excluir categoria');
      }
    }
  };

  if (carregando) {
    return (
      <div style={estilos.containerCarregando}>
        <div style={estilos.carregando}>Carregando...</div>
      </div>
    );
  }

  return (
    <div style={estilos.container}>
      <Cabecalho 
        titulo={restaurante ? restaurante.nome : 'Dashboard'} 
        mostrarBotaoSair={true} 
      />

      <div style={estilos.conteudo}>
        <div style={estilos.acoesTopo}>
          <button onClick={handleVoltar} style={estilos.botaoVoltar}>
            <MdArrowBack style={estilos.icone} />
            Meus Restaurantes
          </button>
          <button onClick={copiarLink} style={estilos.botaoLink}>
            <MdLink style={estilos.icone} />
            Copiar Link do Cardápio
          </button>
        </div>

        <div style={estilos.abas}>
          <button
            onClick={() => setAbaAtiva('itens')}
            style={{
              ...estilos.aba,
              ...(abaAtiva === 'itens' ? estilos.abaAtiva : {})
            }}
          >
            <MdFastfood style={estilos.iconeAba} />
            Itens do Cardápio
          </button>
          <button
            onClick={() => setAbaAtiva('categorias')}
            style={{
              ...estilos.aba,
              ...(abaAtiva === 'categorias' ? estilos.abaAtiva : {})
            }}
          >
            <MdCategory style={estilos.iconeAba} />
            Categorias
          </button>
        </div>

        {abaAtiva === 'itens' && (
          <div>
            <div style={estilos.acoes}>
              <button onClick={handleNovoItem} style={estilos.botaoNovo}>
                <MdAdd style={estilos.iconeGrande} />
                Novo Item
              </button>
            </div>

            {itens.length === 0 ? (
              <div style={estilos.vazio}>
                Nenhum item cadastrado. Clique em "Novo Item" para começar.
              </div>
            ) : (
              <div style={estilos.grade}>
                {itens.map((item) => (
                  <CartaoItem
                    key={item.id}
                    item={item}
                    onEditar={handleEditarItem}
                    onExcluir={handleExcluirItem}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {abaAtiva === 'categorias' && (
          <div>
            <div style={estilos.acoes}>
              <button onClick={handleNovaCategoria} style={estilos.botaoNovo}>
                <MdAdd style={estilos.iconeGrande} />
                Nova Categoria
              </button>
            </div>

            {categorias.length === 0 ? (
              <div style={estilos.vazio}>
                Nenhuma categoria cadastrada. Clique em "Nova Categoria" para começar.
              </div>
            ) : (
              <div style={estilos.listaCategorias}>
                {categorias.map((categoria) => (
                  <div key={categoria.id} style={estilos.categoriaItem}>
                    <span style={estilos.categoriaNome}>{categoria.nome}</span>
                    <div style={estilos.categoriaAcoes}>
                      <button
                        onClick={() => handleEditarCategoria(categoria)}
                        style={{...estilos.botaoCategoria, ...estilos.botaoEditar}}
                      >
                        <MdEdit style={estilos.iconeBotao} />
                        Editar
                      </button>
                      <button
                        onClick={() => handleExcluirCategoria(categoria.id)}
                        style={{...estilos.botaoCategoria, ...estilos.botaoExcluir}}
                      >
                        <MdDelete style={estilos.iconeBotao} />
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {modalItemAberto && (
        <ModalItem
          item={itemSelecionado}
          categorias={categorias}
          onSalvar={handleSalvarItem}
          onFechar={() => setModalItemAberto(false)}
        />
      )}

      {modalCategoriaAberto && (
        <ModalCategoria
          categoria={categoriaSelecionada}
          onSalvar={handleSalvarCategoria}
          onFechar={() => setModalCategoriaAberto(false)}
        />
      )}
    </div>
  );
};

const estilos = {
  containerCarregando: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'var(--cor-fundo)'
  },
  container: {
    minHeight: '100vh',
    background: 'var(--cor-fundo)'
  },
  conteudo: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '2rem 1.5rem'
  },
  acoesTopo: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap'
  },
  botaoVoltar: {
    background: 'var(--cor-fundo-escuro)',
    color: 'var(--cor-texto)',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: 'var(--raio-md)',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  botaoLink: {
    background: 'var(--cor-secundaria)',
    color: 'white',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: 'var(--raio-md)',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  icone: {
    fontSize: '1.1rem'
  },
  abas: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '2rem',
    background: 'white',
    padding: '0.5rem',
    borderRadius: 'var(--raio-lg)',
    boxShadow: 'var(--sombra-sm)'
  },
  aba: {
    background: 'transparent',
    border: 'none',
    padding: '0.875rem 1.75rem',
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--cor-texto-claro)',
    cursor: 'pointer',
    borderRadius: 'var(--raio-md)',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  abaAtiva: {
    background: 'var(--cor-primaria)',
    color: 'white',
    boxShadow: 'var(--sombra-sm)'
  },
  iconeAba: {
    fontSize: '1.2rem'
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
  iconeGrande: {
    fontSize: '1.3rem'
  },
  carregando: {
    fontSize: '1.2rem',
    color: 'var(--cor-texto-claro)',
    fontWeight: '600'
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
    gap: '1.5rem'
  },
  listaCategorias: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  categoriaItem: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: 'var(--raio-xl)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: 'var(--sombra-md)',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  categoriaNome: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--cor-texto)',
    flex: 1,
    minWidth: '150px'
  },
  categoriaAcoes: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap'
  },
  botaoCategoria: {
    padding: '0.625rem 1.5rem',
    border: 'none',
    borderRadius: 'var(--raio-md)',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  iconeBotao: {
    fontSize: '1.1rem'
  },
  botaoEditar: {
    background: 'var(--cor-primaria)',
    color: 'white'
  },
  botaoExcluir: {
    background: 'var(--cor-perigo)',
    color: 'white'
  }
};

export default Dashboard;
