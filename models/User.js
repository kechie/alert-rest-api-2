const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  mobilenum: {
    type: String,
    required: true,
    match: /^[0-9]{10,15}$/, // Accepts numbers with 10 to 15 digits
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Validates basic email format
  },
});

module.exports = mongoose.model('User', userSchema);
