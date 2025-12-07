const restauranteService = require('../services/restauranteService');
const { validarCamposObrigatorios } = require('../helpers/validacao');

const listar = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;
    const restaurantes = await restauranteService.listarRestaurantes(usuarioId);
    return res.status(200).json(restaurantes);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.usuarioId;
    const restaurante = await restauranteService.buscarRestaurantePorId(id, usuarioId);
    return res.status(200).json(restaurante);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

const buscarPorSlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const restaurante = await restauranteService.buscarRestaurantePorSlug(slug);
    return res.status(200).json(restaurante);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

const criar = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;
    const camposFaltando = validarCamposObrigatorios(['nome'], req.body);
    
    if (camposFaltando.length > 0) {
      return res.status(400).json({ 
        erro: 'Nome do restaurante é obrigatório',
        campos: camposFaltando
      });
    }

    const restaurante = await restauranteService.criarRestaurante(usuarioId, req.body);
    return res.status(201).json(restaurante);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

const atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.usuarioId;
    const restaurante = await restauranteService.atualizarRestaurante(id, usuarioId, req.body);
    return res.status(200).json(restaurante);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

const excluir = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.usuarioId;
    const resultado = await restauranteService.excluirRestaurante(id, usuarioId);
    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

module.exports = {
  listar,
  buscarPorId,
  buscarPorSlug,
  criar,
  atualizar,
  excluir
};

