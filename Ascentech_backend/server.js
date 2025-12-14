const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const bookingRoutes = require('./routes/bookingRoutes'); // Ensure this path is correct
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;

// Sync Database
// { alter: true } checks your Booking.js model, sees the new columns, 
// and adds them to the database automatically.
sequelize.sync({ alter: true }) 
    .then(() => {
        console.log('Database connected & Tables synced (Altered)!');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.log('Error:', err));