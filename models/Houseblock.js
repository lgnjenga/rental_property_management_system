const mongoose = require('mongoose');

// House Block Schema
const HouseBlockSchema = new mongoose.Schema({
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    houseunit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'houseunits',
        required: true,
    },
    /*
    houseUnits: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "houseunits",
      },
    ],
    */
  });

module.exports = mongoose.model('houseblock', HouseBlockSchema);