const express = require('express');
const { getDataProfileController, updateProfileController, updatePhotoProfileController, deletePhotoProfile } = require('../controllers/profile.controller');
const multer = require('../../../multer/multer');

const profileRoutes = express();

profileRoutes.get('/profile', getDataProfileController);
profileRoutes.patch('/profile', updateProfileController);
profileRoutes.post('/upload/photo', multer.single('file'), updatePhotoProfileController);
profileRoutes.delete('/upload/photo', multer.single('file'), deletePhotoProfile);

module.exports = profileRoutes;