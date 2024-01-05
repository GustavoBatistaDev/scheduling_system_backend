const removeSeconds = (tempoComSegundos) => {
  const partes = tempoComSegundos.split(':');
  const horaMinutos = partes.slice(0, 2).join(':');
  return horaMinutos;
};

module.exports = removeSeconds;