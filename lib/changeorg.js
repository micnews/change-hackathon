'use strict';

var request = require('request');
var config = require('../config.json');

module.exports = function (opts, callback) {
  var url = opts.id ? 'https://www.change.org/api-proxy/-/petitions/ + opts.id'
   : 'https://www.change.org/api-proxy/-/petitions/search';
  var options = {
    method: 'GET',
    url: url,
    json: true
  };
  if (!opts.id) {
    options.qs = opts;
  }
  function finished (err, response, body) {
    if (err) { return callback(err); }
    if (body.error) { return callback(body.error); }
    console.log(body);
    callback(null, {
      // url: 'https://www.change.org/p/' + id,
    });
  }
  request(options, finished);
};
