const express = require('express');
const { locationController } = require('../controllers/locationController');

const locationRoutes = express.Router();


locationRoutes.post('/', locationController.add)
locationRoutes.get('/', locationController.getAll)



module.exports = {
    locationRoutes
}