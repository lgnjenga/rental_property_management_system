const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// const User = require('../models/User');
const Houseblock = require('../models/Houseblock');

// @route      GET api/houseblocks
// @desc       Get all House Blocks
// @access     Private
router.get('/', auth, async (req, res) => {
    // res.send('Get all House Blocks');
    try {
        const houseblocks = await Houseblock.find({ user: req.user.id }).sort({ date: -1 });
        res.json(houseblocks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route      GET api/houseblocks/:id
// @desc       Get Single House Block
// @access     Private
router.get('/:id', (req, res) => {
    res.send('Get Single House Block');
});

// @route      POST api/houseblocks
// @desc       Add New House Block
// @access     Private
router.post('/', (req, res) => {
    res.send('Add New House Block');
});

// @route      PUT api/houseblocks/:id
// @desc       Update House Block
// @access     Private
router.put('/:id', (req, res) => {
    res.send('Update House Block');
});

// @route      DELETE api/houseblocks/:id
// @desc       Delete House Block
// @access     Private
router.delete('/:id', (req, res) => {
    res.send('Delete House Block');
});

module.exports = router;