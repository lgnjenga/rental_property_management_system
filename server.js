const express = require('express');

const app = express();

// Route
app.get('/', (req, res) => res.json({ msg: 'Welcome to Rental Property Management System API Part 1...' }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on Port:${PORT}`));