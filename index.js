'use strict';

var express = require('express');
var app = express();
var platforms = require('./lib');
var fs = require('fs');
var Handlebars = require('handlebars');
var body = require('body');

app.get('/build', function (req, res) {
  res.send(fs.readFileSync(__dirname + '/templates/builder.html', 'utf8'));
});

app.get('/', function (req, res) {
  var queryString = req.query;
  if (!queryString) return res.sendStatus(403);
  res.send(Handlebars.compile(fs.readFileSync(__dirname + '/templates/index.html', 'utf8'))({paneData: JSON.stringify(queryString)}));
});

app.post('/client-data', function (req, res) {
  body(req, res, function (err, data) {
    if (err) return console.log(err);
    var body = JSON.parse(data);
    var location = body.location;
    var queryString = body.paneData;
    var toSend = [];
    Object.keys(queryString).forEach(function (idx) {
      const platformData = queryString[idx];
      const platform = Object.keys(platformData)[0];
      platformData[platform].location = location;
      platforms[platform](platformData[platform], function (err2, data) {
        if (err2) return console.log(err2);
        toSend.push(data);
        if (Object.keys(toSend).length === Object.keys(queryString).length) {
          res.json(toSend);
        }
      });
    });
  });
});

app.use(express.static('dist'));

var portNumber = 8000;
app.listen(process.env.PORT || portNumber, function () {
  console.log('listening on port ' + (process.env.PORT || portNumber));
});
