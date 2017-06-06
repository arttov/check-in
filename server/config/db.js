let mongoose = require('mongoose');
let config = require('../config/config.json');

exports.MODE_TEST = 'mode_test';
exports.MODE_PRODUCTION = 'mode_production';

exports.connect = function(env) {
  let mongooseUrl = env === exports.MODE_PRODUCTION ? config.db.prod: config.db.test;
  mongooseUrl = mongooseUrl ? mongooseUrl : 'mongodb://localhost/checkin';

  mongoose.connect(mongooseUrl, function (err, db) {
    if (err) {
      console.log ('ERROR connecting to: ' + mongooseUrl + '. ' + err);
    } else {
      console.log ('Succeeded connected to: ' + mongooseUrl);
    }
  });
};


