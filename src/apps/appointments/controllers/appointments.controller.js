const createAppointmentService = require("../services/createAppointment.service");

const createAppointmentController = async (req, res) => {
    const body = req.body;

    const user_id = req.user.id;

    body.user_id = user_id;

    const newAppointment = await createAppointmentService(body);

    if(!newAppointment){
        return res.status(400).json({
            message: 'Verifique os campos e tente novamente.'
        });
    }

    return res.json(newAppointment.rows[0]);
};

module.exports = {
    createAppointmentController
};