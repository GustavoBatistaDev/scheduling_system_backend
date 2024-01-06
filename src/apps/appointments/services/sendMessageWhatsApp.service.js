const formatDate = require('../utils/formatDate.utils');
const removeSeconds = require('../utils/removeSeconds.utils');

const sendMessageWhatsApp = async ( date, hour, name) => {
    const GZAPPY_URL = process.env.API_WHATSAPP_ENDPOINT;

    const message = `Olá, ${name}! Tudo bem? Você tem um novo agendamento marcado\
    para o dia ${formatDate(date)} às ${removeSeconds(hour)}.\
    Você pode cancelar até 1 dia anterior à consulta; caso contrário,\
    será cobrada uma taxa.`;

    const response = await fetch(GZAPPY_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user_token_id': process.env.USER_TOKEN_ID
        },
        body: JSON.stringify({
            instance_id: process.env.INSTANCE_ID,
            instance_token: process.env.WHATSAPP_CREDENTIALS,
            message: [ message.replace(/\s+/g, ' ') ],
            phone: "5573981241191"
        })
    })

    const data = await response.json()

    console.log(data)
    // { msg: 'Messages sent' }
    
};

module.exports = sendMessageWhatsApp;
