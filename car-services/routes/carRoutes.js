const express = require('express');
const carController = require('../controllers/carController');

const router = express.Router();

router.post('/cars', carController.createCar);
router.get('/cars/:carId', carController.getCar);
router.put('/cars/:carId', carController.updateCar);

module.exports = router;