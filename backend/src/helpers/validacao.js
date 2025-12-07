const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validarCamposObrigatorios = (campos, dados) => {
  const camposFaltando = [];
  
  campos.forEach(campo => {
    if (!dados[campo] || dados[campo].toString().trim() === '') {
      camposFaltando.push(campo);
    }
  });
  
  return camposFaltando;
};

module.exports = {
  validarEmail,
  validarCamposObrigatorios
};

