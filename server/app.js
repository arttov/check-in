let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let cors = require('cors');
let mongoose = require('mongoose');

let index = require('./routes/index');
let users = require('./routes/users');

process.env.TZ = 'Asia/Yerevan';

let app = express();

let corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

// // Add headers
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

// mongodb://artur:artur@ds133221.mlab.com:33221/checkin
// mongoose.Promise = global.Promise;

//set mongo url
let mongooseUrl =
   process.env.MONGO_URL  ||
  'mongodb://localhost/checkin';

mongoose.connect(mongooseUrl, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + mongooseUrl + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + mongooseUrl);
  }
}
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.static(__dirname + '../dist'));

app.use('/', index);
app.use('/api/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
