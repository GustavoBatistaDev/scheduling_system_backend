const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const { getUserByIdService } = require('../services/getUserById.service');

dotenv.config();

const verifyDoctorAdmMiddleware = async (req, res, next) => {

    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            message: 'Não autorizado.'
        });
    }

    const token = authorization.split(' ')[1];

    try {
        const { id } = await jwt.verify(token, process.env.JWT_SECRETY_KEY);
        const { rows, rowCount } = await getUserByIdService(id);

        if (rowCount < 1 || !rows[0].is_admin) {
            return res.status(401).json({
                message: 'Não autorizado.'
            });
        }

        next();
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({
            message: 'Não autorizado.'
        });
    }
};

module.exports = {
    verifyDoctorAdmMiddleware
};