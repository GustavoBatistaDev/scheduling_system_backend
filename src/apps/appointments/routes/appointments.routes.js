const express = require('express');
const { createAppointmentController, getAvailableHours, getAppointmentsController, getAppointmentController } = require('../controllers/appointments.controller');

const appointmentsRoutes = express();

appointmentsRoutes.get('/appointments', getAppointmentsController);
appointmentsRoutes.get('/appointments/:id', getAppointmentController);
appointmentsRoutes.post('/appointments', createAppointmentController);
appointmentsRoutes.post('/hours', getAvailableHours);

module.exports = appointmentsRoutes;