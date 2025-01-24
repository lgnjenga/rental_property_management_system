const express = require('express');
const router = express.Router();

// @route      GET api/houseblocks
// @desc       Get all House Blocks
// @access     Private
router.get('/', (req, res) => {
    res.send('Get all House Blocks');
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