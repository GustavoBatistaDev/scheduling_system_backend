const express = require('express');
const { createAppointmentController } = require('../controllers/appointments.controller');

const appointmentsRoutes = express();

appointmentsRoutes.post('/appointments', createAppointmentController);

module.exports = appointmentsRoutes;