const formatDate = (date) => {
  // Verifica se a string de data está no formato esperado
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    // Divide a string da data em partes
    const partes = date.split("-");
    
    // Formata a data no novo formato
    const newDate = `${partes[2]}/${partes[1]}/${partes[0]}`;
    
    return newDate;
  } else {
    // Retorna a data original se não estiver no formato esperado
    return date;
  }
}

module.exports = formatDate;