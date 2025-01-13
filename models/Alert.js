const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  alertservice: { type: String, required: true },
  mobilenumber: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  notified: { type: Boolean, required: true },
  responded: { type: Boolean, required: true },
  isPrank: { type: Boolean, required: true },
  remarks: {type: String, required: false},
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User ownership
});

module.exports = mongoose.model('Alert', alertSchema);
