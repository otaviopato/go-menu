const bcrypt = require('bcryptjs');
const prisma = require('../config/database');
const { gerarToken } = require('../helpers/token');
const { validarEmail } = require('../helpers/validacao');

const cadastrarUsuario = async (nome, email, senha) => {
  if (!validarEmail(email)) {
    throw new Error('Email inválido');
  }

  if (senha.length < 6) {
    throw new Error('Senha deve ter no mínimo 6 caracteres');
  }

  const usuarioExistente = await prisma.usuario.findUnique({
    where: { email }
  });

  if (usuarioExistente) {
    throw new Error('Email já cadastrado');
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const usuario = await prisma.usuario.create({
    data: {
      nome,
      email,
      senha: senhaHash
    }
  });

  const token = gerarToken({ id: usuario.id, email: usuario.email });

  return {
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    },
    token
  };
};

const login = async (email, senha) => {
  const usuario = await prisma.usuario.findUnique({
    where: { email }
  });

  if (!usuario) {
    throw new Error('Email ou senha incorretos');
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    throw new Error('Email ou senha incorretos');
  }

  const token = gerarToken({ id: usuario.id, email: usuario.email });

  return {
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    },
    token
  };
};

module.exports = {
  cadastrarUsuario,
  login
};

