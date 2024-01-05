const validateId = (id) => {
    const regex = /^[-+]?\d*\.?\d+$/;

    return regex.test(id);
};

module.exports = validateId;