const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Route
app.get('/', (req, res) => res.json({ msg: 'Welcome to Rental Property Management System API Part 1...' }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/houseblocks', require('./routes/houseblocks'));
app.use('/api/houseunits', require('./routes/houseunits'));
app.use('/api/tenants', require('./routes/tenants'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on Port:${PORT}`));