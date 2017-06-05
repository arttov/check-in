let mongoose = require('mongoose');
// let async = require('async');

// mongodb://artur:artur@ds133221.mlab.com:33221/checkin
// mongoose.Promise = global.Promise;

let TEST_URI = 'mongodb://localhost/test';
let PRODUCTION_UR = 'mongodb://artur:artur@ds133221.mlab.com:33221/checkin';

exports.MODE_TEST = 'mode_test';
exports.MODE_PRODUCTION = 'mode_production';

exports.connect = function(env) {
  let mongooseUrl = env === exports.MODE_TEST ? TEST_URI : PRODUCTION_UR;
  mongooseUrl = mongooseUrl ? mongooseUrl : 'mongodb://localhost/checkin';

  mongoose.connect(mongooseUrl, function (err, db) {
    if (err) {
      console.log ('ERROR connecting to: ' + mongooseUrl + '. ' + err);
    } else {
      console.log ('Succeeded connected to: ' + mongooseUrl);
    }
  });
};


