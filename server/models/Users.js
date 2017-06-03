let mongoose = require('mongoose');
let AutoIncrement = require('mongoose-sequence');

//create my custom validation
let onlyLettersAllow = function(string) {
  let myRegxp = /^([a-zA-Z ]){1,50}$/i;
  return myRegxp.test(string);
};

let customValidators = [
  { validator: onlyLettersAllow, msg: 'Name must be Only Letters and not long then 50 symbols' }
];

let UserSchema = new mongoose.Schema({
  name: { type: String, required: true, validate: customValidators},
  coordinate: { type: [Number], required: true, index: '2dsphere' },
  created: { type: Date, default: Date.now() },
  updated: { type: Date, default: Date.now() },
}).plugin(AutoIncrement, {inc_field: 'id'}, {unique: true});

module.exports = mongoose.model('User', UserSchema);



