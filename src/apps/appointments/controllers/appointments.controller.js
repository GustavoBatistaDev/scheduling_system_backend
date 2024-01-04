const createAppointmentService = require("../services/createAppointment.service");
const { getAvailableHoursService } = require("../services/getAvailableHours.service");

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

    if(newAppointment?.message){
        return res.status(400).json({
            newAppointment
        });
    }

    return res.json(newAppointment.rows[0]);
};

const getAvailableHours = async (req, res) => {
    const body = req.body;
    
    const defaultHours = [
        '07:00:00', '08:00:00', '09:00:00',
        '10:00:00', '11:00:00', '12:00:00',
        '14:00:00', '15:00:00', '16:00:00',
        '17:00:00'
    ];

    const hours = await getAvailableHoursService(body);

    for (let i = 0; i < defaultHours.length; i++) {
    const hour = defaultHours[i];

    for (let j = 0; j < hours.rows.length; j++) {
        const appointment = hours.rows[j];

        if (appointment.start_time === hour) {
            defaultHours[i] = undefined
        }
    } 
    }

    return res.json(defaultHours);
};

module.exports = {
    createAppointmentController,
    getAvailableHours
};

