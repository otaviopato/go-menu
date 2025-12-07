import { useState, useEffect } from 'react';

const ModalItem = ({ item, categorias, onSalvar, onFechar }) => {
  const [dados, setDados] = useState({
    nome: '',
    preco: '',
    descricao: '',
    categoriaId: ''
  });
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (item) {
      setDados({
        nome: item.nome,
        preco: item.preco,
        descricao: item.descricao || '',
        categoriaId: item.categoriaId
      });
    }
  }, [item]);

  const handleChange = (e) => {
    setDados({
      ...dados,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!dados.nome || !dados.preco || !dados.categoriaId) {
      setErro('Nome, preço e categoria são obrigatórios');
      return;
    }

    if (parseFloat(dados.preco) <= 0) {
      setErro('Preço deve ser maior que zero');
      return;
    }

    try {
      await onSalvar(dados);
      onFechar();
    } catch (error) {
      setErro(error.response?.data?.erro || 'Erro ao salvar item');
    }
  };

  return (
    <div style={estilos.overlay} onClick={onFechar}>
      <div style={estilos.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={estilos.titulo}>
          {item ? 'Editar Item' : 'Novo Item'}
        </h2>
        
        {erro && <div style={estilos.erro}>{erro}</div>}
        
        <form onSubmit={handleSubmit} style={estilos.form}>
          <div style={estilos.campo}>
            <label style={estilos.label}>Nome</label>
            <input
              type="text"
              name="nome"
              value={dados.nome}
              onChange={handleChange}
              style={estilos.input}
              placeholder="Nome do item"
            />
          </div>

          <div style={estilos.campo}>
            <label style={estilos.label}>Preço</label>
            <input
              type="number"
              name="preco"
              value={dados.preco}
              onChange={handleChange}
              style={estilos.input}
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>

          <div style={estilos.campo}>
            <label style={estilos.label}>Categoria</label>
            <select
              name="categoriaId"
              value={dados.categoriaId}
              onChange={handleChange}
              style={estilos.select}
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>
          </div>

          <div style={estilos.campo}>
            <label style={estilos.label}>Descrição</label>
            <textarea
              name="descricao"
              value={dados.descricao}
              onChange={handleChange}
              style={estilos.textarea}
              placeholder="Descrição do item"
              rows="3"
            />
          </div>

          <div style={estilos.botoes}>
            <button type="button" onClick={onFechar} style={{...estilos.botao, ...estilos.botaoCancelar}}>
              Cancelar
            </button>
            <button type="submit" style={{...estilos.botao, ...estilos.botaoSalvar}}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const estilos = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '1rem',
    backdropFilter: 'blur(4px)'
  },
  modal: {
    background: 'white',
    borderRadius: 'var(--raio-xl)',
    padding: '2rem',
    width: '100%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: 'var(--sombra-xl)'
  },
  titulo: {
    fontSize: '1.75rem',
    marginBottom: '1.5rem',
    color: 'var(--cor-texto)',
    fontWeight: '700'
  },
  erro: {
    background: '#fee2e2',
    color: '#dc2626',
    padding: '0.875rem 1rem',
    borderRadius: 'var(--raio-md)',
    marginBottom: '1rem',
    fontSize: '0.9rem',
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
    color: 'var(--cor-texto)'
  },
  input: {
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
    cursor: 'pointer'
  },
  textarea: {
    padding: '0.875rem',
    border: '2px solid var(--cor-borda)',
    borderRadius: 'var(--raio-md)',
    fontSize: '1rem',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    minHeight: '100px'
  },
  botoes: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  },
  botao: {
    flex: 1,
    padding: '0.875rem',
    border: 'none',
    borderRadius: 'var(--raio-md)',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer'
  },
  botaoCancelar: {
    background: 'var(--cor-fundo-escuro)',
    color: 'var(--cor-texto-claro)'
  },
  botaoSalvar: {
    background: 'var(--cor-primaria)',
    color: 'white'
  }
};

export default ModalItem;

