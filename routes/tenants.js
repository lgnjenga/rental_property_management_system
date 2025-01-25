const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// const Houseunit = require('../models/Houseunit');
const User = require('../models/User');
const Tenant = require('../models/Tenant');


// @route      GET api/tenants
// @desc       Get all Tenants
// @access     Private
router.get('/', auth, async (req, res) => {
    // res.send('Get all Tenants');
    try {
        const tenants = await Tenant.find({ user: req.user.id }).sort({ date: -1 });
        res.json(tenants);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route      GET api/tenants/:id
// @desc       Get Single Tenant
// @access     Private
router.get('/:id', (req, res) => {
    res.send('Get Single Tenant');
});

// @route      POST api/tenants
// @desc       Add New Tenant
// @access     Private
router.post('/', (req, res) => {
    res.send('Add New Tenant');
});

// @route      PUT api/tenants/:id
// @desc       Update Tenant
// @access     Private
router.put('/:id', (req, res) => {
    res.send('Update Tenant');
});

// @route      DELETE api/tenants/:id
// @desc       Delete Tenant
// @access     Private
router.delete('/:id', (req, res) => {
    res.send('Delete Tenant');
});

module.exports = router;