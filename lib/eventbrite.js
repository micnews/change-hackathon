'use strict';

var request = require('request');
var token = require('../config.json').eventbrite;

module.exports = function (opts, callback) {
  var url = opts.id ? 'https://www.eventbriteapi.com/v3/events/' + opts.id
   : 'https://www.eventbriteapi.com/v3/events/search/';
  var options = {
    method: 'GET',
    url: url + '?token=' + token,
    json: true
  };
  if (!opts.id) {
    opts.price = opts.price || 'free';
    opts.sort_by = opts.sort_by || 'date';
    opts.popular = opts.popular || true;
    options.qs = opts;
  }
  function finished (err, response, body) {
    if (err) { return callback(err); }
    if (body.error) { return callback(body.error); }
    var toSend = [];
    for (var i = 0; i < 3; i++) {
      var event = body.events[i];
      var eventData = {
        name: event.name.text,
        capacity: event.capacity,
        url: event.url,
        image: event.logo ? event.logo.url : ''
      };
      console.log(eventData);
      toSend.push(eventData);
    }
    callback(null, toSend);
  }
  request(options, finished);
};
