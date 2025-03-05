const axios = require('axios');
const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    
    const { userId, carId, startDate, endDate } = req.body;

    const userResponse = await axios.get(`http://localhost:3001/api/users/${userId}`);
    
    if (userResponse.data.activeBookings >= userResponse.data.maxBookings) {
      return res.status(400).json({ error: 'user has alread booked max cars' });
    }

    const carResponse = await axios.get(`http://localhost:3002/api/cars/${carId}`);
    if (!carResponse.data.isAvailable) {
      return res.status(400).json({ error: 'car is not available' });
    }

    const booking = new Booking({ userId, carId, startDate, endDate });
    await booking.save();

    await axios.put(`http://localhost:3001/api/users/${userId}`, {
      activeBookings: userResponse.data.activeBookings + 1,
    });

    await axios.put(`http://localhost:3002/api/cars/${carId}`, { isAvailable: false });

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.bookingId,
      { status: 'canceled' },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const userResponse = await axios.get(`http://localhost:3001/api/users/${booking.userId}`);

    await axios.put(`http://localhost:3001/api/users/${booking.userId}`, 
    {  activeBookings: userResponse.data.activeBookings - 1, }
  
    );

    await axios.put(`http://localhost:3002/api/cars/${booking.carId}`, { isAvailable: true });

    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
