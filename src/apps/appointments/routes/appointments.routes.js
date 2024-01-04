const express = require('express');
const { createAppointmentController, getAvailableHours } = require('../controllers/appointments.controller');

const appointmentsRoutes = express();

appointmentsRoutes.post('/appointments', createAppointmentController);
appointmentsRoutes.post('/hours', getAvailableHours);

module.exports = appointmentsRoutes;