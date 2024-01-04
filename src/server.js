const express = require('express');
const cors = require('cors');

const authRoutes = require('./apps/authentication/routes/authentication.routes');
const { verifyLoggedUserMiddleware } = require('./apps/authentication/middlewares/auth.middleware');
const profileRoutes = require('./apps/user_profile/routes/profile.routes');
const specialtiesRoutes = require('./apps/specialty/routes/specialties.routes');
const doctorsRoutes = require('./apps/doctors/routes/doctors.routes');
const appointmentsRoutes = require('./apps/appointments/routes/appointments.routes');


const app = express();

app.use(express.json());

app.use(cors());

app.use(authRoutes);

app.use(verifyLoggedUserMiddleware);

app.use(profileRoutes);

app.use(specialtiesRoutes);

app.use(doctorsRoutes);

app.use(appointmentsRoutes);

module.exports = {
    app
};