const autenticacaoService = require('../services/autenticacaoService');
const { validarCamposObrigatorios } = require('../helpers/validacao');

const cadastrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const camposFaltando = validarCamposObrigatorios(['nome', 'email', 'senha'], req.body);
    
    if (camposFaltando.length > 0) {
      return res.status(400).json({ 
        erro: 'Campos obrigatórios não preenchidos',
        campos: camposFaltando
      });
    }

    const resultado = await autenticacaoService.cadastrarUsuario(nome, email, senha);
    
    return res.status(201).json(resultado);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

const entrar = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const camposFaltando = validarCamposObrigatorios(['email', 'senha'], req.body);
    
    if (camposFaltando.length > 0) {
      return res.status(400).json({ 
        erro: 'Campos obrigatórios não preenchidos',
        campos: camposFaltando
      });
    }

    const resultado = await autenticacaoService.login(email, senha);
    
    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

module.exports = {
  cadastrar,
  entrar
};

