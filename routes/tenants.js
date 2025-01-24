const express = require('express');
const router = express.Router();

// @route      GET api/tenants
// @desc       Get all Tenants
// @access     Private
router.get('/', (req, res) => {
    res.send('Get all Tenants');
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