const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false  // Make it optional since signup only sends email/password
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  hobbies: [{
    type: String
  }],
  dateCreated: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

// Remove the third parameter - let MongoDB use default collection name
module.exports = mongoose.model('User', userSchema, 'e-food-hub-database');
