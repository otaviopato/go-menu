const prisma = require('../config/database');

const listarCategorias = async (restauranteId) => {
  return await prisma.categoria.findMany({
    where: { restauranteId },
    orderBy: { nome: 'asc' }
  });
};

const criarCategoria = async (restauranteId, nome) => {
  const categoriaExistente = await prisma.categoria.findFirst({
    where: { 
      nome,
      restauranteId 
    }
  });

  if (categoriaExistente) {
    throw new Error('Categoria já existe neste restaurante');
  }

  return await prisma.categoria.create({
    data: { 
      nome,
      restauranteId 
    }
  });
};

const atualizarCategoria = async (id, restauranteId, nome) => {
  const categoria = await prisma.categoria.findFirst({
    where: { 
      id,
      restauranteId 
    }
  });

  if (!categoria) {
    throw new Error('Categoria não encontrada');
  }

  const categoriaComMesmoNome = await prisma.categoria.findFirst({
    where: {
      nome,
      restauranteId,
      id: { not: id }
    }
  });

  if (categoriaComMesmoNome) {
    throw new Error('Já existe uma categoria com este nome');
  }

  return await prisma.categoria.update({
    where: { id },
    data: { nome }
  });
};

const excluirCategoria = async (id, restauranteId) => {
  const categoria = await prisma.categoria.findFirst({
    where: { 
      id,
      restauranteId 
    },
    include: { itens: true }
  });

  if (!categoria) {
    throw new Error('Categoria não encontrada');
  }

  if (categoria.itens.length > 0) {
    throw new Error('Não é possível excluir categoria com itens associados');
  }

  await prisma.categoria.delete({
    where: { id }
  });

  return { mensagem: 'Categoria excluída com sucesso' };
};

module.exports = {
  listarCategorias,
  criarCategoria,
  atualizarCategoria,
  excluirCategoria
};

