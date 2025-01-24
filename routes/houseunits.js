const express = require('express');
const router = express.Router();

// @route      GET api/houseunits
// @desc       Get all House Units
// @access     Private
router.get('/', (req, res) => {
    res.send('Get all House Units');
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