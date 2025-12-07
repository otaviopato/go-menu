const gerarSlug = (texto) => {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
};

const gerarSlugUnico = (texto, sufixo = '') => {
  const slugBase = gerarSlug(texto);
  const timestamp = Date.now().toString(36);
  return sufixo ? `${slugBase}-${sufixo}` : `${slugBase}-${timestamp}`;
};

module.exports = {
  gerarSlug,
  gerarSlugUnico
};

