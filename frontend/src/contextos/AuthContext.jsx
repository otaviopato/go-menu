import { createContext, useContext, useState, useEffect } from 'react';
import { obterToken, obterUsuario, salvarToken, salvarUsuario, removerToken, removerUsuario } from '../servicos/autenticacaoService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const token = obterToken();
    const usuarioSalvo = obterUsuario();
    
    if (token && usuarioSalvo) {
      setUsuario(usuarioSalvo);
    }
    
    setCarregando(false);
  }, []);

  const login = (dadosUsuario, token) => {
    salvarToken(token);
    salvarUsuario(dadosUsuario);
    setUsuario(dadosUsuario);
  };

  const logout = () => {
    removerToken();
    removerUsuario();
    setUsuario(null);
  };

  const estaAutenticado = () => {
    return !!usuario;
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, estaAutenticado, carregando }}>
      {children}
    </AuthContext.Provider>
  );
};

