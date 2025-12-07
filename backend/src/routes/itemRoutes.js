const express = require('express');
const itemController = require('../controllers/itemController');
const { autenticar } = require('../middlewares/autenticacao');

const router = express.Router();

router.get('/publico/:restauranteId', itemController.listarPublico);
router.get('/:restauranteId', autenticar, itemController.listar);
router.get('/:restauranteId/:id', itemController.buscarPorId);
router.post('/:restauranteId', autenticar, itemController.criar);
router.put('/:restauranteId/:id', autenticar, itemController.atualizar);
router.delete('/:restauranteId/:id', autenticar, itemController.excluir);

module.exports = router;

