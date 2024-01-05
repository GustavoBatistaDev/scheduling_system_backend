const axios = require('axios');
const querystring = require('querystring');
const removeSeconds = require('../utils/removeSeconds.utils');

const sendMessageWhatsApp = async (number, date, hour) => {
  // Dados do corpo que serão enviados no formato form-urlencoded
  const formData = querystring.stringify({
    number,
    message: `Olá, legal ter você testando a minha aplicação! Você marcou uma consulta para o dia ${date} ás ${removeSeconds(hour)}`
  });

  await axios.post(process.env.API_WHATSAPP_ENDPOINT, formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
};

module.exports = sendMessageWhatsApp;
