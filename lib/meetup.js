'use strict';

var request = require('request');
var token = require('../config.json').meetup;

module.exports = function (opts, callback) {
  console.log(opts.location);
  var url = opts.url
    ? 'https://www.eventbriteapi.com/v3/events/' + opts.url.split('-').pop().split('?')[0]
    : 'https://api.meetup.com/2/open_events';
  var options = {
    method: 'GET',
    url: url + '?token=' + token,
    json: true
  };
  if (!opts.url) {
    options.qs = {
      text: opts.keyword,
      order: opts.location ? 'distance' : 'time',
      lat: opts.location ? opts.location.latitude : undefined,
      lon: opts.location ? opts.location.longitude : undefined,
      page: 1
    };
  }
  function finished (err, response, body) {
    if (err) return callback(err);
    if (body.error) return callback(body.error);
    if (!body.events || !body.events.length) return callback('Nothing found');
    const event = (opts.url
      ? body
      : body.events[0]);
    const eventData = {
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
