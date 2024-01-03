const validatorRg= (rg) => {
    const regex = /^\d+$/;
    return regex.test(rg);
};

const validatorDateOfBirth= (dateOfBirth) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateOfBirth);
};

const validatorPhone= (phone) => {
    const regex = /^\d+$/;
    return regex.test(phone);
};

module.exports = {
    validatorDateOfBirth,
    validatorPhone,
    validatorRg
};