import api from './api';

export const listarCategorias = async (restauranteId) => {
  const response = await api.get(`/categorias/${restauranteId}`);
  return response.data;
};

export const criarCategoria = async (restauranteId, nome) => {
  const response = await api.post(`/categorias/${restauranteId}`, { nome });
  return response.data;
};

export const atualizarCategoria = async (restauranteId, id, nome) => {
  const response = await api.put(`/categorias/${restauranteId}/${id}`, { nome });
  return response.data;
};

export const excluirCategoria = async (restauranteId, id) => {
  const response = await api.delete(`/categorias/${restauranteId}/${id}`);
  return response.data;
};

