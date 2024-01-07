const sendMessageWhatsApp = async (automaticMessage, phone) => {
    const GZAPPY_URL = process.env.API_WHATSAPP_ENDPOINT;

    const response = await fetch(GZAPPY_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user_token_id': process.env.USER_TOKEN_ID
        },
        body: JSON.stringify({
            instance_id: process.env.INSTANCE_ID,
            instance_token: process.env.WHATSAPP_CREDENTIALS,
            message: [ automaticMessage.replace(/\s+/g, ' ') ],
            phone: "5573981241191" // todo : trocar pelo phone do parêmetro
        })
    })

    const data = await response.json()

    console.log(data)
    // { msg: 'Messages sent' }
    
};

module.exports = sendMessageWhatsApp;
