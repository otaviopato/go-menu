import { MdEdit, MdDelete, MdCategory } from 'react-icons/md';

const CartaoItem = ({ item, onEditar, onExcluir, modoPublico = false }) => {
  return (
    <div style={estilos.cartao}>
      <div style={estilos.conteudo}>
        <h3 style={estilos.nome}>{item.nome}</h3>
        {item.descricao && (
          <p style={estilos.descricao}>{item.descricao}</p>
        )}
        <div style={estilos.footer}>
          <span style={estilos.preco}>
            R$ {parseFloat(item.preco).toFixed(2)}
          </span>
          <span style={estilos.categoria}>
            <MdCategory style={estilos.icone} />
            {item.categoria.nome}
          </span>
        </div>
      </div>
      {!modoPublico && (
        <div style={estilos.acoes}>
          <button onClick={() => onEditar(item)} style={{...estilos.botao, ...estilos.botaoEditar}}>
            <MdEdit style={estilos.icone} />
            Editar
          </button>
          <button onClick={() => onExcluir(item.id)} style={{...estilos.botao, ...estilos.botaoExcluir}}>
            <MdDelete style={estilos.icone} />
            Excluir
          </button>
        </div>
      )}
    </div>
  );
};

const estilos = {
  cartao: {
    background: 'white',
    borderRadius: 'var(--raio-xl)',
    padding: '1.5rem',
    boxShadow: 'var(--sombra-md)',
    transition: 'all 0.3s ease',
    border: '1px solid var(--cor-borda)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  conteudo: {
    marginBottom: '1rem',
    flex: 1
  },
  nome: {
    fontSize: '1.25rem',
    fontWeight: '700',
    marginBottom: '0.625rem',
    color: 'var(--cor-texto)',
    lineHeight: '1.3'
  },
  descricao: {
    color: 'var(--cor-texto-claro)',
    fontSize: '0.95rem',
    marginBottom: '1rem',
    lineHeight: '1.6'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: '0.75rem',
    gap: '0.5rem',
    flexWrap: 'wrap'
  },
  preco: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: 'var(--cor-primaria)',
    letterSpacing: '-0.02em'
  },
  categoria: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    padding: '0.5rem 1rem',
    borderRadius: 'var(--raio-lg)',
    fontSize: '0.85rem',
    color: 'white',
    fontWeight: '600',
    boxShadow: 'var(--sombra-sm)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem'
  },
  icone: {
    fontSize: '1.1rem'
  },
  acoes: {
    display: 'flex',
    gap: '0.75rem',
    borderTop: '1px solid var(--cor-borda)',
    paddingTop: '1rem',
    marginTop: '1rem'
  },
  botao: {
    flex: 1,
    padding: '0.75rem',
    border: 'none',
    borderRadius: 'var(--raio-md)',
    fontSize: '0.95rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
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

export default CartaoItem;

