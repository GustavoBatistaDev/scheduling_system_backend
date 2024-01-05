const isCompleteProfile = (user) => {



    if(!user.rg || !user.date_of_birth || !user.phone){
    return {
        message: 'Configure os dados do seu perfil para agendar.'
    };
}

};

module.exports = isCompleteProfile;