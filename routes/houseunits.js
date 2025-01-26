const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// const User = require('../models/User');
// const Houseblock = require('../models/Houseblock');
const Houseunit = require('../models/Houseunit');
const Houseblock = require('../models/Houseblock');

// @route      GET api/houseunits
// @desc       Get all House Units
// @access     Private
router.get('/', auth, async (req, res) => {
    // res.send('Get all House Units');
    try {
        // const houseunits = await Houseunit.find({ user: req.user.id }).sort({ date: -1 });
        const houseunits = await Houseunit.find().populate('tenant').sort({ date: -1 }); // Find all houseblocks
        res.json(houseunits);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route      GET api/houseunits/:id
// @desc       Get Single House Unit
// @access     Private
router.get('/:id', auth, async (req, res) => {
    // res.send('Get Single House Unit');
    try {
        const houseunit = await Houseunit.findById(req.params.id).populate('tenant'); // Populate houseUnits field
        res.json(houseunit);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
          return res.status(404).json({ message: 'Houseblock not found' });
        }
        res.status(500).send('Server error');
    }
});

// @route      POST api/houseunits
// @desc       Add New House Unit
// @access     Private
router.post('/', [auth, [
    check('month', 'Month is required').not().isEmpty(),
    check('year', 'Year is required').not().isEmpty(),
    check('houseNumber', 'House number is required').not().isEmpty(),
    check('houseblockName', 'Houseblock name is required').not().isEmpty(),
]], async (req, res) => {
    // res.send('Add New House Block');
    // const houseblock = await Houseblock.findById(req.params.bootcampId);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Pull out data from JSON Request body
    const { houseNumber, rentPaid, waterBillPaid, rentDeposit, damages, rentArrears, month, year, houseblockName  } = req.body;

    try {

        // Find the houseblock by name
        const houseblock = await Houseblock.findOne({ houseBlockName: houseblockName });

        if (!houseblock) {
        return res.status(400).json({ message: 'Houseblock not found' });
        }

        const newHouseunit = new Houseunit({
            houseNumber,
            rentPaid,
            waterBillPaid,
            rentDeposit,
            damages,
            rentArrears,            
            month,
            year,
            houseblock: houseblock._id  // Associate houseblock using its ID
        });

        const savedHouseunit = await newHouseunit.save();

        // Add the new houseunit to the houseblock's array of house units
        houseblock.houseUnits.push(savedHouseunit._id); 
        await houseblock.save();

        res.json(savedHouseunit);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route      PUT api/houseunits/:id
// @desc       Update House Unit
// @access     Private
router.put('/:id', auth, async (req, res) => {
    // res.send('Update House Unit');
    const { houseNumber, rentPaid, waterBillPaid, rentDeposit, damages, rentArrears, month, year, houseblockName  } = req.body;

    // Build Houseunit Object
    const houseunitFields = {};
    if(houseNumber) houseunitFields.houseNumber = houseNumber;
    if(rentPaid) houseunitFields.rentPaid = rentPaid;
    if(waterBillPaid) houseunitFields.waterBillPaid = waterBillPaid;
    if(rentDeposit) houseunitFields.rentDeposit = rentDeposit;
    if(damages) houseunitFields.damages = damages;
    if(rentArrears) houseunitFields.rentArrears = rentArrears;
    if(month) houseunitFields.month = month;
    if(year) houseunitFields.year = year;
    if(houseblockName) houseunitFields.houseblockName = houseblockName;

    try {
        let houseunit = await Houseunit.findById(req.params.id);
        if(!houseunit) return res.status(400).json({ msg: 'House Unit Not Found' });

        houseunit = await Houseunit.findByIdAndUpdate(req.params.id, { $set: houseunitFields }, { new: true });
        
        res.json(houseunit);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// @route      DELETE api/houseunits/:id
// @desc       Delete House Unit
// @access     Private
router.delete('/:id', auth, async (req, res) => {
    // res.send('Delete House Unit');
    try {
        const houseunit = await Houseunit.findById(req.params.id);
        if(!houseunit) return res.status(400).json({ msg: 'House Unit Not Found' });

        await Houseunit.findByIdAndDelete(req.params.id);
        
        res.json({ msg: 'House Unit removed' });        

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;