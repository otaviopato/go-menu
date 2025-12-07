const express = require('express');
const restauranteController = require('../controllers/restauranteController');
const { autenticar } = require('../middlewares/autenticacao');

const router = express.Router();

router.get('/slug/:slug', restauranteController.buscarPorSlug);
router.get('/', autenticar, restauranteController.listar);
router.get('/:id', autenticar, restauranteController.buscarPorId);
router.post('/', autenticar, restauranteController.criar);
router.put('/:id', autenticar, restauranteController.atualizar);
router.delete('/:id', autenticar, restauranteController.excluir);

module.exports = router;

