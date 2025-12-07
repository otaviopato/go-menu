import { useState, useEffect } from 'react';

const ModalCategoria = ({ categoria, onSalvar, onFechar }) => {
  const [nome, setNome] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (categoria) {
      setNome(categoria.nome);
    }
  }, [categoria]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!nome.trim()) {
      setErro('Nome é obrigatório');
      return;
    }

    try {
      await onSalvar(nome);
      onFechar();
    } catch (error) {
      setErro(error.response?.data?.erro || 'Erro ao salvar categoria');
    }
  };

  return (
    <div style={estilos.overlay} onClick={onFechar}>
      <div style={estilos.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={estilos.titulo}>
          {categoria ? 'Editar Categoria' : 'Nova Categoria'}
        </h2>
        
        {erro && <div style={estilos.erro}>{erro}</div>}
        
        <form onSubmit={handleSubmit} style={estilos.form}>
          <div style={estilos.campo}>
            <label style={estilos.label}>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              style={estilos.input}
              placeholder="Nome da categoria"
              autoFocus
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
    maxWidth: '400px',
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

export default ModalCategoria;

