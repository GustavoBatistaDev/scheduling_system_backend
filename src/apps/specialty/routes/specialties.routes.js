const express = require('express');
const { createSpecialtyController, deleteSpecialtyController } = require('../controllers/specialty.controller');

const specialtiesRoutes = express();

specialtiesRoutes.delete('/specialty/:id', deleteSpecialtyController);
specialtiesRoutes.post('/specialty', createSpecialtyController);


module.exports = specialtiesRoutes;