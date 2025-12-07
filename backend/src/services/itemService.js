const prisma = require('../config/database');

const listarItens = async (restauranteId, filtros = {}) => {
  const where = { restauranteId };

  if (filtros.categoriaId) {
    where.categoriaId = filtros.categoriaId;
  }

  if (filtros.busca) {
    where.nome = {
      contains: filtros.busca,
      mode: 'insensitive'
    };
  }

  return await prisma.item.findMany({
    where,
    include: {
      categoria: true,
      restaurante: {
        select: {
          id: true,
          nome: true
        }
      }
    },
    orderBy: { criadoEm: 'desc' }
  });
};

const listarItensPublicos = async (restauranteId, filtros = {}) => {
  const where = { restauranteId };

  if (filtros.categoriaId) {
    where.categoriaId = filtros.categoriaId;
  }

  if (filtros.busca) {
    where.nome = {
      contains: filtros.busca,
      mode: 'insensitive'
    };
  }

  return await prisma.item.findMany({
    where,
    include: {
      categoria: true
    },
    orderBy: { nome: 'asc' }
  });
};

const buscarItemPorId = async (id) => {
  const item = await prisma.item.findUnique({
    where: { id },
    include: {
      categoria: true,
      restaurante: {
        select: {
          id: true,
          nome: true
        }
      }
    }
  });

  if (!item) {
    throw new Error('Item não encontrado');
  }

  return item;
};

const criarItem = async (restauranteId, dados) => {
  const { nome, preco, descricao, categoriaId } = dados;

  if (!nome || !preco || !categoriaId) {
    throw new Error('Nome, preço e categoria são obrigatórios');
  }

  if (preco <= 0) {
    throw new Error('Preço deve ser maior que zero');
  }

  const categoria = await prisma.categoria.findFirst({
    where: { 
      id: categoriaId,
      restauranteId 
    }
  });

  if (!categoria) {
    throw new Error('Categoria não encontrada');
  }

  return await prisma.item.create({
    data: {
      nome,
      preco: parseFloat(preco),
      descricao: descricao || null,
      categoriaId,
      restauranteId
    },
    include: {
      categoria: true
    }
  });
};

const atualizarItem = async (id, restauranteId, dados) => {
  const item = await prisma.item.findFirst({
    where: { 
      id,
      restauranteId 
    }
  });

  if (!item) {
    throw new Error('Item não encontrado');
  }

  const { nome, preco, descricao, categoriaId } = dados;

  if (preco && preco <= 0) {
    throw new Error('Preço deve ser maior que zero');
  }

  if (categoriaId) {
    const categoria = await prisma.categoria.findFirst({
      where: { 
        id: categoriaId,
        restauranteId 
      }
    });

    if (!categoria) {
      throw new Error('Categoria não encontrada');
    }
  }

  const dadosAtualizacao = {};
  if (nome) dadosAtualizacao.nome = nome;
  if (preco) dadosAtualizacao.preco = parseFloat(preco);
  if (descricao !== undefined) dadosAtualizacao.descricao = descricao;
  if (categoriaId) dadosAtualizacao.categoriaId = categoriaId;

  return await prisma.item.update({
    where: { id },
    data: dadosAtualizacao,
    include: {
      categoria: true
    }
  });
};

const excluirItem = async (id, restauranteId) => {
  const item = await prisma.item.findFirst({
    where: { 
      id,
      restauranteId 
    }
  });

  if (!item) {
    throw new Error('Item não encontrado');
  }

  await prisma.item.delete({
    where: { id }
  });

  return { mensagem: 'Item excluído com sucesso' };
};

module.exports = {
  listarItens,
  listarItensPublicos,
  buscarItemPorId,
  criarItem,
  atualizarItem,
  excluirItem
};

