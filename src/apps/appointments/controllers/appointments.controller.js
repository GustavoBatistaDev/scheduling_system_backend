const nodeSchedule = require('node-schedule');
const cancelAppointmentService = require("../services/cancelAppointment.service");
const createAppointmentService = require("../services/createAppointment.service");
const getAllAppointmentsService = require("../services/getAllAppointments.service");
const getAppointmentService = require("../services/getAppointment.service");
const getAppointmentByDateService = require("../services/getAppointmentByDate.service");
const getAppointmentsService = require("../services/getAppointments.service");
const { getAvailableHoursService } = require("../services/getAvailableHours.service");
const rescheduleUpdateService = require("../services/rescheduleUpdate.service");
const sendMessageWhatsApp = require("../services/sendMessageWhatsApp.service");
const updateStatusAppointmentService = require("../services/updateStatusAppointment.service");
const updateStatueAppointmentService = require("../services/updateStatusAppointment.service");
const isCompleteProfile = require("../utils/isCompleteProfile.utils");
const validateId = require("../utils/validateId.utils");
const formatDate = require('../utils/formatDate.utils');
const removeSeconds = require('../utils/removeSeconds.utils');

const cron = require('node-cron');
const parseDateTime = require('../utils/createDate.utils');



const createAppointmentController = async (req, res) => {
    const profileIsComplete = isCompleteProfile(req.user);

    if (profileIsComplete?.message) {
        return res.status(400).json(profileIsComplete);
    }

    const body = req.body;
    const user_id = req.user.id;
    body.user_id = user_id;

    const newAppointment = await createAppointmentService(body);

    if (!newAppointment) {
        return res.status(400).json({
            message: 'Verifique os campos e tente novamente.'
        });
    }

    if (newAppointment?.message) {
        return res.status(400).json({
            message: newAppointment.message
        });
    }

    const message = `Olá, ${req.user.first_name}! Tudo bem? Você tem um novo agendamento marcado\
    para o dia ${formatDate(body.day)} às ${removeSeconds(body.hour)}hrs.\
    Você pode cancelar até 1 dia anterior à consulta; caso contrário,\
    será cobrada uma taxa.`;

    // await sendMessageWhatsApp(message)

    const DateAppointment = parseDateTime({ day: body.day, hour: body.hour});

    //nodeSchedule.scheduleJob(DateAppointment, () => {
     //   console.log('mensagem enviada')
    //    sendMessageWhatsApp(`Olá, ${req.user.first_name}! Estou aqui para lembrar da sua consulta amanhã às ${removeSeconds(body.hour)}hrs.`);
    //}); 

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

    const appointments = await getAppointmentsService(req.user.id, false);

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
            message: 'Agendamento não existe ou foi cancelado.'
        });
    }


    if(appointment?.rows[0]?.user_id != req.user.id){
        return res.status(401).json({
            message: 'Você não tem permissão para realizar esta ação.'
        });
    }

    return res.json(appointment.rows[0]);
};

const getAllAppointmentController = async (req, res) => {

    const appointment = await getAllAppointmentsService();

    if(appointment.rowCount < 1){
        return res.status(404).json({
            message: 'Agendamento não existe ou foi cancelado.'
        });
    }

    return res.json(appointment.rows);
};

const cancelAppointmentController = async (req, res) => {

    const { id } = req.params;

    const idISvalid = validateId(id);

    if(!idISvalid){
        return res.status(400).json({
            message: 'Id precisa ser um número.'
        }); 
    }

    const appointment = await getAppointmentService(id);

    console.log(appointment);

    if(appointment.rowCount < 1){
        return res.status(404).json({
            message: 'Agendamento não existe ou foi cancelado.'
        });
    }

    if(appointment.rows[0].user_id != req.user.id){
        return res.status(401).json({
            message: 'Você não tem permissão para realizar esta ação.'
        });
    }
    
    const cancelAppointment = await cancelAppointmentService(id, req.user.id);

    // const updatedStatusTextAppointment = updateStatusAppointmentService(cancelAppointment.rows[0].id, 'cancelado')

    return res.status(200).json(cancelAppointment.rows[0]);
};


const concludedlAppointmentController = async (req, res) => {

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
            message: 'Agendamento não existe ou foi cancelado.'
        });
    }
    
    const updatedStatusTextAppointment = await updateStatusAppointmentService(appointment.rows[0].id, 'concluído')

    return res.status(200).json(updatedStatusTextAppointment.rows[0]);
};



const rescheduleAppointmentController = async (req, res) => {

    const { id } = req.params;

    const body = req.body;

    const appointment = await getAppointmentService(id);

    if(appointment.rowCount < 1){
        return res.status(404).json({
            message: 'O agendamento não existe ou foi cancelado.'
        });
    }

    const appointmentWithTheSameDate = await getAppointmentByDateService(
        body.day,
        body.hour
    );

    if(appointmentWithTheSameDate.rowCount > 0){ 
        return res.status(400).json({
            message: 'Data e hora indisponível.'
        });
    }

    const updatedAppointmentObject = {
        day: body.day ? body.day : appointment.rows[0].day,
        hour: body.hour ? body.hour : appointment.rows[0].hour,
        reason_for_consultation: body.reason_for_consultation ? body.reason_for_consultation : appointment.rows[0].reason_for_consultation,
        special_need: body.special_need ? body.special_need : appointment.rows[0].special_need,
        specialties_id: body.specialties_id ? body.specialties_id : appointment.rows[0].specialties_id,
        pcd: body.pcd ? body.pcd : appointment.rows[0].pcd,
        chronic_disease: body.chronic_disease ? body.chronic_disease : appointment.rows[0].chronic_disease,
    };

    const reschedule = await rescheduleUpdateService(updatedAppointmentObject, appointment.rows[0].id);

    if(!reschedule){
        return res.status(400).json({
            message: 'Confira os dados e tente novamente.'
        });
    }

    const DateAppointment = parseDateTime({
        day: updatedAppointmentObject.day,
        hour: updatedAppointmentObject.hour,
    });

    await sendMessageWhatsApp(`Olá, ${req.user.first_name}! Você reagendou a sua consulta para o dia ${formatDate(body.day)} às ${removeSeconds(body.hour)}hrs.`);
    
    nodeSchedule.scheduleJob(DateAppointment, () => {
        console.log('mensagem enviada')
        sendMessageWhatsApp(`Olá, ${req.user.first_name}! Estou aqui para lembrar da sua consulta amanhã às ${removeSeconds(body.hour)}hrs.`);
    }); 

    return res.json(reschedule?.rows[0]);
};

module.exports = {
    createAppointmentController,
    getAvailableHours,
    getAppointmentsController,
    getAppointmentController,
    cancelAppointmentController,
    concludedlAppointmentController,
    getAllAppointmentController,
    rescheduleAppointmentController
};

