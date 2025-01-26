const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Houseblock = require('../models/Houseblock');

// @route      GET api/houseblocks
// @desc       Get all House Blocks
// @access     Private
router.get('/', auth, async (req, res) => {
    // res.send('Get all House Blocks');
    try {
        // const houseblocks = await Houseblock.find({ user: req.user.id }).populate('houseUnits').sort({ date: -1 });
        const houseblocks = await Houseblock.find().populate('houseUnits').sort({ date: -1 }); // Find all houseblocks
        res.json(houseblocks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route      GET api/houseblocks/:id
// @desc       Get Single House Block
// @access     Private
router.get('/:id', auth, async (req, res) => {
    // res.send('Get Single House Block');
    try {
        const houseblock = await Houseblock.findById(req.params.id).populate('houseUnits'); // Populate houseUnits field
        res.json(houseblock);
      } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
          return res.status(404).json({ message: 'Houseblock not found' });
        }
        res.status(500).send('Server error');
    }
});

// @route      POST api/houseblocks
// @desc       Add New House Block
// @access     Private
router.post('/', [auth, [
    check('month', 'Month is required').not().isEmpty(),
    check('year', 'Year is required').not().isEmpty()
]], async (req, res) => {
    // res.send('Add New House Block');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { houseBlockName, salaryToCaretaker, electricityBill, waterBill, landTax, propertyManagementAgencyFee, rentDepositRefunds, miscellaneousExpenses, month, year } = req.body;

    try {
        const newHouseblock = new Houseblock({
            houseBlockName,
            salaryToCaretaker,
            electricityBill,
            waterBill,
            landTax,
            propertyManagementAgencyFee,
            rentDepositRefunds,
            miscellaneousExpenses,
            month,
            year,
        });

        const houseblock = await newHouseblock.save();
        
        res.json(houseblock);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
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