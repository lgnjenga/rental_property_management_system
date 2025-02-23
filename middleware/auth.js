const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

module.exports = async function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token') || req.header('authorization');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Remove 'Bearer ' prefix if present from Bearer token
    const parsedToken = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

    try {
        const decoded = jwt.verify(parsedToken, config.get('jwtSecret'));
        const user = await User.findById(decoded.user.id); // Find user by ID from decoded token
        if (!user) {
            return res.status(401).json({ msg: 'Invalid user' }); 
        }
        req.user = user; // Attach user object to request
        // jwt.verify(token, config.get('jwtSecret'));
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}