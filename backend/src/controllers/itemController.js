const itemService = require('../services/itemService');

const listar = async (req, res) => {
  try {
    const { restauranteId } = req.params;
    const { categoriaId, busca } = req.query;
    const filtros = {};
    
    if (categoriaId) filtros.categoriaId = categoriaId;
    if (busca) filtros.busca = busca;

    const itens = await itemService.listarItens(restauranteId, filtros);
    return res.status(200).json(itens);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

const listarPublico = async (req, res) => {
  try {
    const { restauranteId } = req.params;
    const { categoriaId, busca } = req.query;
    const filtros = {};
    
    if (categoriaId) filtros.categoriaId = categoriaId;
    if (busca) filtros.busca = busca;

    const itens = await itemService.listarItensPublicos(restauranteId, filtros);
    return res.status(200).json(itens);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await itemService.buscarItemPorId(id);
    return res.status(200).json(item);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

const criar = async (req, res) => {
  try {
    const { restauranteId } = req.params;
    const item = await itemService.criarItem(restauranteId, req.body);
    return res.status(201).json(item);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

const atualizar = async (req, res) => {
  try {
    const { restauranteId, id } = req.params;
    const item = await itemService.atualizarItem(id, restauranteId, req.body);
    return res.status(200).json(item);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

const excluir = async (req, res) => {
  try {
    const { restauranteId, id } = req.params;
    const resultado = await itemService.excluirItem(id, restauranteId);
    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

module.exports = {
  listar,
  listarPublico,
  buscarPorId,
  criar,
  atualizar,
  excluir
};

