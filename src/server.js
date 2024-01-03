const express = require('express');
const cors = require('cors');

const authRoutes = require('./apps/authentication/routes/authentication.routes');
const { verifyLoggedUserMiddleware } = require('./apps/authentication/middlewares/auth.middleware');
const profileRoutes = require('./apps/user_profile/routes/profile.routes');


const app = express();

app.use(express.json());

app.use(cors());

app.use(authRoutes);

app.use(verifyLoggedUserMiddleware);

app.use(profileRoutes);


module.exports = {
    app
};