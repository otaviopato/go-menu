const express = require('express');
const autenticacaoController = require('../controllers/autenticacaoController');

const router = express.Router();

router.post('/cadastrar', autenticacaoController.cadastrar);
router.post('/entrar', autenticacaoController.entrar);

module.exports = router;

