var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const oauthserver = require('oauth2-server');

var index = require('./routes/index');
var users = require('./routes/users');

//Security middlwares.
const auths = require('./middlewares/authRequest');

var app = express();

const oauth = new oauthserver({
  model: require('./models/models'), // See below for specification
  grants: ['password'],
  debug: true
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Mongodb connection.
mongoose.connect('mongodb://localhost/CRS', function(err, res) {
  if (err) {
    console.log(`Could not be connected ${err}`);
  }
})

mongoose.connection.on('connected' , function() {
  console.log('|-----------------------------------------------|');
  console.log('|----------Connected to Mongodb Server----------|');
  console.log('|-----------------------------------------------|');
})

mongoose.connection.on('disconnected', function() {
  console.log('|-------------------------------------------------------|');
  console.log('|----------Could not connect to Mongodb Server----------|');
  console.log('|-------------------------------------------------------|');
})

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(oauth.errorHandler());  

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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

app.get('/authtest', auths.authenticate,function (req, res) {
  res.send('Secret area');
});

module.exports = app;
