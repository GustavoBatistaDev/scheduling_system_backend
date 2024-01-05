const createAppointmentService = require("../services/createAppointment.service");
const getAppointmentService = require("../services/getAppointment.service");
const getAppointmentsService = require("../services/getAppointments.service");
const { getAvailableHoursService } = require("../services/getAvailableHours.service");
const sendMessageWhatsApp = require("../services/sendMessageWhatsApp.service");
const isCompleteProfile = require("../utils/isCompleteProfile.utils");
const validateId = require("../utils/validateId.utils");

const createAppointmentController = async (req, res) => {

    const profileIsComplete = isCompleteProfile(req.user);

    if(profileIsComplete?.message){
        return res.status(400).json(profileIsComplete);
    }

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

const getAppointmentsController = async (req, res) => {

    const appointments = await getAppointmentsService(req.user.id);

    return res.json(appointments.rows);
};

const getAppointmentController = async (req, res) => {

    const { id } = req.params;

    const idISvalid = validateId(id);

    if(!idISvalid){
        return res.status(400).json({
            message: 'Id precisa ser um número.'
        });
    }

    const appointment = await getAppointmentService(id);

    if(appointment.rowCount < 1){
        return res.status(404).json({
            message: 'Agendamento não existe.'
        });
    }

    return res.json(appointment.rows[0]);
};



module.exports = {
    createAppointmentController,
    getAvailableHours,
    getAppointmentsController,
    getAppointmentController
};

