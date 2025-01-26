const mongoose = require('mongoose');
const HouseUnit = require('./Houseunit');

// House Block Schema
const HouseBlockSchema = new mongoose.Schema({
    houseBlockName: {
        type: String,
        required: true,
    },
    salaryToCaretaker: {
      type: Number,
      default: 0,
    },
    electricityBill: {
      type: Number,
      default: 0,
    },
    waterBill: {
      type: Number,
      default: 0,
    },
    landTax: {
      type: Number,
      default: 0,
    },
    propertyManagementAgencyFee: {
      type: Number,
      default: 0,
    },
    rentDepositRefunds: {
      type: Number,
      default: 0,
    },
    miscellaneousExpenses: {
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
        ref: 'users',
        required: true,
    },
    */
    /*
    houseunit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'houseunits',
        required: true,
    },
    */
    houseUnits: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "houseunits",
      },
    ],
  });

module.exports = mongoose.model('houseblocks', HouseBlockSchema);