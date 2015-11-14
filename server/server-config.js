var express = require('express');
// var partials = require('express-partials');
var morgan = require('morgan');
var cors = require('cors');
var dbController = require('./services/controllers');
var path = require('path');
var passport = require('passport');

// require the routes file
var inRouter = require('./routes/in');
var outRouter = require('./routes/out');
var path = require('path');

// require isLoggedIn method so we can use it in routes to check if user is logged in
var isLoggedIn = require('./services/isLoggedIn');

inRouter = inRouter(dbController, passport, isLoggedIn);
outRouter = outRouter(dbController, passport, isLoggedIn);

var bodyParser = require('body-parser');

var app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api/in', inRouter);
app.use('/api/out', outRouter);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '/../client')));

module.exports = app;
