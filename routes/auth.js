const express = require('express');
const router = express.Router();

// @route      POST api/auth
// @desc       Get logged in User
// @access     Private
router.get('/', (req, res) => {
    res.send('Get Logged in User');
});

// @route      POST api/auth
// @desc       Auth User and get Token
// @access     Public
router.post('/', (req, res) => {
    res.send('Log in User');
});

module.exports = router;