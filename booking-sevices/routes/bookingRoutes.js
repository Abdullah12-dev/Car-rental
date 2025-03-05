const express = require('express');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.post('/bookings', bookingController.createBooking);
router.get('/bookings/:userId', bookingController.getUserBookings);
router.delete('/bookings/:bookingId', bookingController.cancelBooking);

module.exports = router;