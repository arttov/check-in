let mongoose = require('mongoose');
let AutoIncrement = require('mongoose-sequence');

let UserSchema = new mongoose.Schema({
  name: { type: String, required: true},
  latitude: { type: Number, required: true},
  longitude: { type: Number, required: true},
  created: { type: Date, default: Date.now() },
  updated: { type: Date, default: Date.now() },
}).plugin(AutoIncrement, {inc_field: 'id'});


module.exports = mongoose.model('User', UserSchema);



