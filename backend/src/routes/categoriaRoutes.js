const express = require('express');
const categoriaController = require('../controllers/categoriaController');
const { autenticar } = require('../middlewares/autenticacao');

const router = express.Router();

router.get('/:restauranteId', categoriaController.listar);
router.post('/:restauranteId', autenticar, categoriaController.criar);
router.put('/:restauranteId/:id', autenticar, categoriaController.atualizar);
router.delete('/:restauranteId/:id', autenticar, categoriaController.excluir);

module.exports = router;

