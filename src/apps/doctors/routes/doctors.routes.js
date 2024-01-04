const express = require('express');
const { getDoctorsController, createDoctorController } = require('../controllers/doctors.controller');

const doctorsRoutes = express();

doctorsRoutes.get('/doctors', getDoctorsController);
doctorsRoutes.post('/doctors', createDoctorController);

module.exports = doctorsRoutes;