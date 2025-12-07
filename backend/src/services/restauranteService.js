const prisma = require('../config/database');
const { gerarSlugUnico } = require('../helpers/slug');

const listarRestaurantes = async (usuarioId) => {
  return await prisma.restaurante.findMany({
    where: { usuarioId },
    orderBy: { criadoEm: 'desc' },
    include: {
      _count: {
        select: {
          itens: true,
          categorias: true
        }
      }
    }
  });
};

const buscarRestaurantePorId = async (id, usuarioId) => {
  const restaurante = await prisma.restaurante.findFirst({
    where: { 
      id,
      usuarioId 
    },
    include: {
      _count: {
        select: {
          itens: true,
          categorias: true
        }
      }
    }
  });

  if (!restaurante) {
    throw new Error('Restaurante não encontrado');
  }

  return restaurante;
};

const buscarRestaurantePorSlug = async (slug) => {
  const restaurante = await prisma.restaurante.findUnique({
    where: { slug },
    include: {
      usuario: {
        select: {
          nome: true
        }
      }
    }
  });

  if (!restaurante) {
    throw new Error('Restaurante não encontrado');
  }

  return restaurante;
};

const criarRestaurante = async (usuarioId, dados) => {
  const { nome, descricao } = dados;

  if (!nome || nome.trim() === '') {
    throw new Error('Nome do restaurante é obrigatório');
  }

  const slug = gerarSlugUnico(nome);

  return await prisma.restaurante.create({
    data: {
      nome,
      descricao: descricao || null,
      slug,
      usuarioId
    }
  });
};

const atualizarRestaurante = async (id, usuarioId, dados) => {
  const restaurante = await prisma.restaurante.findFirst({
    where: { 
      id,
      usuarioId 
    }
  });

  if (!restaurante) {
    throw new Error('Restaurante não encontrado');
  }

  const { nome, descricao } = dados;

  const dadosAtualizacao = {};
  if (nome) dadosAtualizacao.nome = nome;
  if (descricao !== undefined) dadosAtualizacao.descricao = descricao;

  return await prisma.restaurante.update({
    where: { id },
    data: dadosAtualizacao
  });
};

const excluirRestaurante = async (id, usuarioId) => {
  const restaurante = await prisma.restaurante.findFirst({
    where: { 
      id,
      usuarioId 
    }
  });

  if (!restaurante) {
    throw new Error('Restaurante não encontrado');
  }

  await prisma.restaurante.delete({
    where: { id }
  });

  return { mensagem: 'Restaurante excluído com sucesso' };
};

module.exports = {
  listarRestaurantes,
  buscarRestaurantePorId,
  buscarRestaurantePorSlug,
  criarRestaurante,
  atualizarRestaurante,
  excluirRestaurante
};

