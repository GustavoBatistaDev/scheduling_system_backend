const express = require('express');
const { createAppointmentController, getAvailableHours, getAppointmentsController, getAppointmentController, cancelAppointmentController, concludedlAppointmentController, getAllAppointmentController, rescheduleAppointmentController } = require('../controllers/appointments.controller');
const { verifyDoctorAdmMiddleware } = require('../../global/middlewares/userIsAdm.middleware');

const appointmentsRoutes = express();

appointmentsRoutes.get('/appointments/admin', verifyDoctorAdmMiddleware, getAllAppointmentController);
appointmentsRoutes.get('/appointments', getAppointmentsController);
appointmentsRoutes.get('/appointments/:id', getAppointmentController);
appointmentsRoutes.post('/appointments', createAppointmentController);
appointmentsRoutes.post('/hours', getAvailableHours);
appointmentsRoutes.delete('/appointments/:id', cancelAppointmentController);
appointmentsRoutes.patch('/appointments/:id', verifyDoctorAdmMiddleware, concludedlAppointmentController);
appointmentsRoutes.patch('/appointments/reschedule/:id', rescheduleAppointmentController);
module.exports = appointmentsRoutes;