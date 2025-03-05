const express = require('express');
const mongoose = require('mongoose');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

app.use(express.json());
app.use('/api', bookingRoutes);

mongoose.connect('mongodb://localhost:27017/carsManagment');


const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Booking Service running on port ${PORT}`);
});