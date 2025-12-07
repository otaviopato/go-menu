import api from './api';

export const listarItensPublicos = async (restauranteId, filtros = {}) => {
  const params = new URLSearchParams();
  if (filtros.categoriaId) params.append('categoriaId', filtros.categoriaId);
  if (filtros.busca) params.append('busca', filtros.busca);
  
  const response = await api.get(`/itens/publico/${restauranteId}?${params.toString()}`);
  return response.data;
};

export const listarItens = async (restauranteId, filtros = {}) => {
  const params = new URLSearchParams();
  if (filtros.categoriaId) params.append('categoriaId', filtros.categoriaId);
  if (filtros.busca) params.append('busca', filtros.busca);
  
  const response = await api.get(`/itens/${restauranteId}?${params.toString()}`);
  return response.data;
};

export const buscarItemPorId = async (restauranteId, id) => {
  const response = await api.get(`/itens/${restauranteId}/${id}`);
  return response.data;
};

export const criarItem = async (restauranteId, dados) => {
  const response = await api.post(`/itens/${restauranteId}`, dados);
  return response.data;
};

export const atualizarItem = async (restauranteId, id, dados) => {
  const response = await api.put(`/itens/${restauranteId}/${id}`, dados);
  return response.data;
};

export const excluirItem = async (restauranteId, id) => {
  const response = await api.delete(`/itens/${restauranteId}/${id}`);
  return response.data;
};

