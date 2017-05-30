const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true},
  latitude: { type: Number, required: true},
  longitude: { type: Number, required: true},
  created: { type: Date, default: Date.now() },
  updated: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('User', UserSchema);



