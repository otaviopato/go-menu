const { verificarToken } = require('../helpers/token');

const autenticar = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  const payload = verificarToken(token);

  if (!payload) {
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }

  req.usuarioId = payload.id;
  next();
};

module.exports = { autenticar };

