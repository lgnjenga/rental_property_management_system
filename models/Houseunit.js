const mongoose = require('mongoose');
const Tenant = require('./Tenant');

// House Unit Schema
const HouseUnitSchema = new mongoose.Schema({
    houseNumber: {
      type: String,
      required: true,
    },
    rentPaid: {
      type: Number,
      default: 0,
    },
    waterBillPaid: {
      type: Number,
      default: 0,
    },
    rentDeposit: {
      type: Number,
      required: true,
    },
    damages: {
      type: Number,
      default: 0,
    },
    rentArrears: {
      type: Number,
      default: 0,
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    /*
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    */
    houseblock: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'houseblocks'
    },
    tenant: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "tenants"
            // unique: true // Ensure only one tenant per house unit
        }
    ],
  });

  module.exports = mongoose.model('houseunits', HouseUnitSchema);