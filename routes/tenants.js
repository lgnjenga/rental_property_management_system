const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// const Houseunit = require('../models/Houseunit');
const User = require('../models/User');
const Tenant = require('../models/Tenant');
const Houseunit = require('../models/Houseunit');


// @route      GET api/tenants
// @desc       Get all Tenants
// @access     Private
router.get('/', auth, async (req, res) => {
    // res.send('Get all Tenants');
    try {
        // const tenants = await Tenant.find({ user: req.user.id }).sort({ date: -1 });
        const tenants = await Tenant.find().sort({ date: -1 }); // Find all Tenants
        res.json(tenants);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route      GET api/tenants/:id
// @desc       Get Single Tenant
// @access     Private
router.get('/:id', auth, async (req, res) => {
    // res.send('Get Single Tenant');
    try {
        const tenant = await Tenant.findById(req.params.id);
        res.json(tenant);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
          return res.status(404).json({ message: 'Houseblock not found' });
        }
        res.status(500).send('Server error');
    }
});

// @route      POST api/tenants
// @desc       Add New Tenant
// @access     Private
router.post('/',  [auth, [
    check('name', 'Please include a Name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phoneNumber', 'Phone Number is required').not().isEmpty(),
    check('idNumber', 'National ID number is required').not().isEmpty(),
    check('month', 'Month is required').not().isEmpty(),
    check('year', 'Year is required').not().isEmpty(),
    check('housenumber', 'House number is required').not().isEmpty(),
]], async (req, res) => {
    // res.send('Add New Tenant');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phoneNumber, idNumber, month, year, housenumber  } = req.body;

    try {
        // Find the houseunit by house number
        const houseunit = await Houseunit.findOne({ houseNumber: housenumber });
        
        if (!houseunit) {
            return res.status(400).json({ message: 'House Unit not found' });
        }

        const newTenant = new Tenant({
            name,
            email,
            phoneNumber,
            idNumber,
            month,
            year,
            houseunit: houseunit._id  // Associate houseunit using its ID
        });

        const savedTenant = await newTenant.save();

        // Add the new tenant to the houseunits's array of tenants
        houseunit.tenant.push(savedTenant._id); 
        await houseunit.save();

        res.json(savedTenant);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
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