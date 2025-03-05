const express = require('express');
const mongoose = require('mongoose');
const carRoutes = require('./routes/carRoutes');

const app = express();

app.use(express.json());
app.use('/api', carRoutes);

mongoose.connect('mongodb://localhost:27017/carsManagment');

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Car Service running on port ${PORT}`);
});