'use strict';

var express = require('express');
var async = require('async');
var app = express();
var platforms = require('./lib');
var fs = require('fs');
var Handlebars = require('handlebars');

app.get('/', function (req, res) {
  var queryString = req.query;
  var toSend = {};
  Object.keys(queryString).forEach(function (platform) {
    platforms[platform](queryString[platform], function (err, data) {
      if (err) return console.log(err);
      toSend[platform] = data;
      if (Object.keys(toSend).length === Object.keys(queryString).length) {
        console.log(toSend);
        console.log(fs.readFileSync(__dirname + '/index.html'));
        res.send(Handlebars.compile(fs.readFileSync(__dirname + '/index.html', 'utf8'))({paneData: JSON.stringify(toSend)}));
      }
    });
  });
});

app.use(express.static('dist'));

var portNumber = 8000;
app.listen(portNumber, function () {
  console.log('listening on port ' + portNumber);
});
