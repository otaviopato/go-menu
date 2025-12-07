import api from './api';

export const listarRestaurantes = async () => {
  const response = await api.get('/restaurantes');
  return response.data;
};

export const buscarRestaurantePorId = async (id) => {
  const response = await api.get(`/restaurantes/${id}`);
  return response.data;
};

export const buscarRestaurantePorSlug = async (slug) => {
  const response = await api.get(`/restaurantes/slug/${slug}`);
  return response.data;
};

export const criarRestaurante = async (dados) => {
  const response = await api.post('/restaurantes', dados);
  return response.data;
};

export const atualizarRestaurante = async (id, dados) => {
  const response = await api.put(`/restaurantes/${id}`, dados);
  return response.data;
};

export const excluirRestaurante = async (id) => {
  const response = await api.delete(`/restaurantes/${id}`);
  return response.data;
};

