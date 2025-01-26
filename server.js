const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Route
app.get('/', (req, res) => res.json({ msg: 'Welcome to Rental Property Management System API Part 1...' }));

// Define Routes
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/houseblocks', require('./routes/houseblocks'));
app.use('/api/v1/houseunits', require('./routes/houseunits'));
app.use('/api/v1/tenants', require('./routes/tenants'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on Port:${PORT}`));