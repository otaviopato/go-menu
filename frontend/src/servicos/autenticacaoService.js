import api from './api';

export const cadastrar = async (nome, email, senha) => {
  const response = await api.post('/autenticacao/cadastrar', {
    nome,
    email,
    senha
  });
  return response.data;
};

export const entrar = async (email, senha) => {
  const response = await api.post('/autenticacao/entrar', {
    email,
    senha
  });
  return response.data;
};

export const salvarToken = (token) => {
  localStorage.setItem('token', token);
};

export const obterToken = () => {
  return localStorage.getItem('token');
};

export const removerToken = () => {
  localStorage.removeItem('token');
};

export const salvarUsuario = (usuario) => {
  localStorage.setItem('usuario', JSON.stringify(usuario));
};

export const obterUsuario = () => {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario) : null;
};

export const removerUsuario = () => {
  localStorage.removeItem('usuario');
};

