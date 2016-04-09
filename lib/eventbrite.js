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
    let qOpts = {};
    qOpts.price = opts.price || 'free';
    qOpts.sort_by = opts.sort_by || 'date';
    qOpts.popular = opts.popular || true;
    qOpts.q = opts.keyword;
    options.qs = qOpts;
  }
  function finished (err, response, body) {
    if (err) { return callback(err); }
    if (body.error) { return callback(body.error); }
    var event = body.events[0];
    var eventData = {
      platform: 'eventbrite',
      type: 'event',
      name: event.name.text,
      capacity: event.capacity,
      url: event.url,
      image: event.logo ? event.logo.url : ''
    };
    callback(null, eventData);
  }
  request(options, finished);
};
