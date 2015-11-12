var express = require('express');
// var partials = require('express-partials');
var morgan = require('morgan');
var cors = require('cors');
// var db = require('./services/db/index');
// var apiRouter = require('./routes');
var bodyParser = require('body-parser');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
// app.use('/api', apiRouter);
app.get('/', function(req, res) {
  res.send("Hello, world!");
})


module.exports = app;