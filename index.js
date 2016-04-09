'use strict';

var express = require('express');
var app = express();
var platforms = require('./lib');
var fs = require('fs');
var Handlebars = require('handlebars');

app.get('/build', function (req, res) {
  res.send(fs.readFileSync(__dirname + '/templates/builder.html', 'utf8'));
});

app.get('/', function (req, res) {
  var queryString = req.query;
  var toSend = [];
  Object.keys(queryString).forEach(function (idx) {
    const platformData = queryString[idx];
    const platform = Object.keys(platformData)[0];
    console.log(platformData);
    platforms[platform](queryString[idx][platform], function (err, data) {
      if (err) return console.log(err);
      toSend.push(data);
      if (Object.keys(toSend).length === Object.keys(queryString).length) {
        console.log(toSend);
        res.send(Handlebars.compile(fs.readFileSync(__dirname + '/templates/index.html', 'utf8'))({paneData: JSON.stringify(toSend)}));
      }
    });
  });
});

app.use(express.static('dist'));

var portNumber = 8000;
app.listen(portNumber, function () {
  console.log('listening on port ' + portNumber);
});
