const parseDateTime = (body) => {
    const [ano, mes, dia] = body.day.split("-").map(Number);
    const [horas, minutos, segundos] = body.hour.split(":").map(Number);

    console.log(ano, mes - 1, dia, horas, minutos, segundos);

    // Retornar o objeto Date
    return new Date(ano, mes - 1, dia - 1, horas, minutos, segundos);
}

module.exports = parseDateTime;