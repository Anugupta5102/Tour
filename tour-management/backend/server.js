const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

console.log("Hello...................");

const mdiddle=(next)=>{
  console.log("middleware ............");
  next();
}

// Routes
const tourRoutes=require('./routes/tour.routes');
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/tours', mdiddle,tourRoutes);
app.use('/api/hotels', require('./routes/hotel.routes'));
app.use('/api/bookings', require('./routes/booking.routes'));
app.use('/api/payments', require('./routes/payment.routes'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
