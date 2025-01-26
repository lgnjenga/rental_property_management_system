const mongoose = require('mongoose');

const TenantSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    idNumber: {
      type: String,
      required: true,
      unique: true,
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
    houseunit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'houseunits',
        required: true,
        unique: true, // Ensure only one tenant per house unit
    },
  });

module.exports = mongoose.model('tenants', TenantSchema);