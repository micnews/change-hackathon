'use strict';

var request = require('request');
var token = require('../config.json').eventbrite;

module.exports = function (opts, callback) {
  var url = opts.url
    ? 'https://www.eventbriteapi.com/v3/events/' + opts.url.split('-').pop().split('?')[0]
    : 'https://www.eventbriteapi.com/v3/events/search/';
  var options = {
    method: 'GET',
    url: url + '?token=' + token,
    json: true
  };
  if (!opts.url) {
    options.qs = {
      q: opts.keyword,
      'start_date.keyword': 'this_week',
      include_unavailable_events: false,
      price: opts.price || 'free',
      sort_by: opts.sort_by || 'date',
      popular: opts.popular || true,
      'location.latitude': opts.location ? opts.location.latitude : undefined,
      'location.longitude': opts.location ? opts.location.longitude : undefined,
      'location.within': opts.location ? '30mi' : undefined
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
