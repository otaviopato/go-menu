const categoriaService = require('../services/categoriaService');
const { validarCamposObrigatorios } = require('../helpers/validacao');

const listar = async (req, res) => {
  try {
    const { restauranteId } = req.params;
    const categorias = await categoriaService.listarCategorias(restauranteId);
    return res.status(200).json(categorias);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

const criar = async (req, res) => {
  try {
    const { restauranteId } = req.params;
    const { nome } = req.body;

    const camposFaltando = validarCamposObrigatorios(['nome'], req.body);
    
    if (camposFaltando.length > 0) {
      return res.status(400).json({ 
        erro: 'Campo nome é obrigatório',
        campos: camposFaltando
      });
    }

    const categoria = await categoriaService.criarCategoria(restauranteId, nome);
    return res.status(201).json(categoria);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

const atualizar = async (req, res) => {
  try {
    const { restauranteId, id } = req.params;
    const { nome } = req.body;

    const camposFaltando = validarCamposObrigatorios(['nome'], req.body);
    
    if (camposFaltando.length > 0) {
      return res.status(400).json({ 
        erro: 'Campo nome é obrigatório',
        campos: camposFaltando
      });
    }

    const categoria = await categoriaService.atualizarCategoria(id, restauranteId, nome);
    return res.status(200).json(categoria);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

const excluir = async (req, res) => {
  try {
    const { restauranteId, id } = req.params;
    const resultado = await categoriaService.excluirCategoria(id, restauranteId);
    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

module.exports = {
  listar,
  criar,
  atualizar,
  excluir
};

