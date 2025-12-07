const express = require('express');
const autenticacaoRoutes = require('./autenticacaoRoutes');
const restauranteRoutes = require('./restauranteRoutes');
const categoriaRoutes = require('./categoriaRoutes');
const itemRoutes = require('./itemRoutes');

const router = express.Router();

router.use('/autenticacao', autenticacaoRoutes);
router.use('/restaurantes', restauranteRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/itens', itemRoutes);

module.exports = router;

