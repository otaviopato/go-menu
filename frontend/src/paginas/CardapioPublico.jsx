import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MdSearch, MdClear, MdLogin, MdRestaurant } from 'react-icons/md';
import { listarItensPublicos } from '../servicos/itemService';
import { listarCategorias } from '../servicos/categoriaService';
import { buscarRestaurantePorSlug } from '../servicos/restauranteService';
import CartaoItem from '../componentes/CartaoItem';

const CardapioPublico = () => {
  const { slug } = useParams();
  const [restaurante, setRestaurante] = useState(null);
  const [itens, setItens] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (slug) {
      carregarDados();
    }
  }, [slug]);

  const carregarDados = async () => {
    try {
      setErro('');
      const restauranteData = await buscarRestaurantePorSlug(slug);
      setRestaurante(restauranteData);
      
      const [itensData, categoriasData] = await Promise.all([
        listarItensPublicos(restauranteData.id),
        listarCategorias(restauranteData.id)
      ]);
      setItens(itensData);
      setCategorias(categoriasData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setErro('Restaurante não encontrado');
    } finally {
      setCarregando(false);
    }
  };

  const buscarItens = async () => {
    if (!restaurante) return;
    
    setCarregando(true);
    try {
      const filtros = {};
      if (categoriaFiltro) filtros.categoriaId = categoriaFiltro;
      if (busca) filtros.busca = busca;
      
      const dados = await listarItensPublicos(restaurante.id, filtros);
      setItens(dados);
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
    } finally {
      setCarregando(false);
    }
  };

  const handleBuscar = () => {
    buscarItens();
  };

  const handleLimparFiltros = () => {
    setCategoriaFiltro('');
    setBusca('');
    carregarDados();
  };

  const itensPorCategoria = categorias.map(categoria => ({
    categoria,
    itens: itens.filter(item => item.categoriaId === categoria.id)
  })).filter(grupo => grupo.itens.length > 0);

  if (erro) {
    return (
      <div style={estilos.container}>
        <header style={estilos.header}>
          <div style={estilos.headerConteudo}>
            <h1 style={estilos.titulo}>Go Menu</h1>
            <Link to="/login" style={estilos.botaoLogin}>
              Área Administrativa
            </Link>
          </div>
        </header>
        <div style={estilos.conteudo}>
          <div style={estilos.vazio}>{erro}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={estilos.container}>
      <header style={estilos.header}>
        <div style={estilos.headerConteudo}>
          <div>
            <h1 style={estilos.titulo}>
              <MdRestaurant style={estilos.iconeRestaurante} />
              {restaurante ? restaurante.nome : 'Go Menu'}
            </h1>
            {restaurante?.descricao && (
              <p style={estilos.subtitulo}>{restaurante.descricao}</p>
            )}
          </div>
          <Link to="/login" style={estilos.botaoLogin}>
            <MdLogin style={estilos.icone} />
            Área Administrativa
          </Link>
        </div>
      </header>

      <div style={estilos.conteudo}>
        <div style={estilos.filtros}>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar item..."
            style={estilos.inputBusca}
            onKeyPress={(e) => e.key === 'Enter' && handleBuscar()}
          />
          
          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            style={estilos.select}
          >
            <option value="">Todas as categorias</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nome}
              </option>
            ))}
          </select>

          <button onClick={handleBuscar} style={estilos.botaoBuscar}>
            <MdSearch style={estilos.iconeBotao} />
            Buscar
          </button>

          {(categoriaFiltro || busca) && (
            <button onClick={handleLimparFiltros} style={estilos.botaoLimpar}>
              <MdClear style={estilos.iconeBotao} />
              Limpar
            </button>
          )}
        </div>

        {carregando ? (
          <div style={estilos.carregando}>Carregando...</div>
        ) : itens.length === 0 ? (
          <div style={estilos.vazio}>Nenhum item encontrado</div>
        ) : categoriaFiltro || busca ? (
          <div style={estilos.grade}>
            {itens.map((item) => (
              <CartaoItem key={item.id} item={item} modoPublico={true} />
            ))}
          </div>
        ) : (
          <div style={estilos.categorias}>
            {itensPorCategoria.map(({ categoria, itens }) => (
              <div key={categoria.id} style={estilos.categoriaSecao}>
                <h2 style={estilos.categoriaTitulo}>{categoria.nome}</h2>
                <div style={estilos.grade}>
                  {itens.map((item) => (
                    <CartaoItem key={item.id} item={item} modoPublico={true} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const estilos = {
  container: {
    minHeight: '100vh',
    background: 'var(--cor-fundo)'
  },
  header: {
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    color: 'white',
    padding: '1.5rem 0',
    boxShadow: 'var(--sombra-lg)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  headerConteudo: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  titulo: {
    fontSize: '2rem',
    fontWeight: '800',
    margin: 0,
    letterSpacing: '-0.02em',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  iconeRestaurante: {
    fontSize: '2.25rem'
  },
  subtitulo: {
    fontSize: '1rem',
    margin: '0.5rem 0 0 0',
    opacity: 0.9,
    fontWeight: '400'
  },
  botaoLogin: {
    background: 'rgba(255, 255, 255, 0.15)',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: 'var(--raio-lg)',
    fontSize: '0.95rem',
    fontWeight: '600',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    textDecoration: 'none',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  icone: {
    fontSize: '1.1rem'
  },
  conteudo: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '2rem 1.5rem'
  },
  filtros: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    background: 'white',
    padding: '1.5rem',
    borderRadius: 'var(--raio-xl)',
    boxShadow: 'var(--sombra-md)'
  },
  inputBusca: {
    flex: 1,
    minWidth: '200px',
    padding: '0.875rem',
    border: '2px solid var(--cor-borda)',
    borderRadius: 'var(--raio-md)',
    fontSize: '1rem',
    outline: 'none'
  },
  select: {
    padding: '0.875rem',
    border: '2px solid var(--cor-borda)',
    borderRadius: 'var(--raio-md)',
    fontSize: '1rem',
    outline: 'none',
    background: 'white',
    minWidth: '200px',
    cursor: 'pointer'
  },
  botaoBuscar: {
    background: 'var(--cor-primaria)',
    color: 'white',
    padding: '0.875rem 2rem',
    border: 'none',
    borderRadius: 'var(--raio-md)',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  botaoLimpar: {
    background: 'var(--cor-fundo-escuro)',
    color: 'var(--cor-texto-claro)',
    padding: '0.875rem 1.5rem',
    border: 'none',
    borderRadius: 'var(--raio-md)',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  iconeBotao: {
    fontSize: '1.2rem'
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
    borderRadius: 'var(--raio-xl)'
  },
  categorias: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem'
  },
  categoriaSecao: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  categoriaTitulo: {
    fontSize: '1.875rem',
    fontWeight: '700',
    color: 'var(--cor-texto)',
    borderLeft: '5px solid var(--cor-primaria)',
    paddingLeft: '1rem',
    letterSpacing: '-0.02em'
  },
  grade: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
    gap: '1.5rem'
  }
};

export default CardapioPublico;
