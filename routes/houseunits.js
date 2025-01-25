const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// const User = require('../models/User');
// const Houseblock = require('../models/Houseblock');
const Houseunit = require('../models/Houseunit');

// @route      GET api/houseunits
// @desc       Get all House Units
// @access     Private
router.get('/', auth, async (req, res) => {
    // res.send('Get all House Units');
    try {
        const houseunits = await Houseunit.find({ user: req.user.id }).sort({ date: -1 });
        res.json(houseunits);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route      GET api/houseunits/:id
// @desc       Get Single House Unit
// @access     Private
router.get('/:id', (req, res) => {
    res.send('Get Single House Unit');
});

// @route      POST api/houseunits
// @desc       Add New House Unit
// @access     Private
router.post('/', (req, res) => {
    res.send('Add New House Unit');
});

// @route      PUT api/houseunits/:id
// @desc       Update House Unit
// @access     Private
router.put('/:id', (req, res) => {
    res.send('Update House Unit');
});

// @route      DELETE api/houseunits/:id
// @desc       Delete House Unit
// @access     Private
router.delete('/:id', (req, res) => {
    res.send('Delete House Unit');
});

module.exports = router;