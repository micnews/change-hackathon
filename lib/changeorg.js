'use strict';

var request = require('request');

function unfinished (petitions) {
  for (var i = 0; i < petitions.length; i++) {
    if (!petitions[i].petition.is_victory) {
      return petitions[i].petition;
    }
  }
  return petitions[0].petition;
}

module.exports = function (opts, callback) {
  var url = opts.url
    ? 'https://www.change.org/api-proxy/-/petitions/' + opts.url.split('/').pop().split('?')[0]
    : 'https://www.change.org/api-proxy/-/petitions/search';
  var options = {
    method: 'GET',
    url: url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36'
    },
    json: true
  };
  if (!opts.url) {
    options.qs = {
      q: opts.keyword,
      is_victory: false
    };
  }
  function finished (err, response, body) {
    if (err) return callback(err);
    if (body.error) return callback(body.error);
    if (!body.items || !body.items.length) return callback('Nothing found');
    const petition = (opts.url
      ? body
      : unfinished(body.items));
    const petitionData = {
      platform: 'changeorg',
      type: 'petition',
      name: petition.title || petition.ask || petition.display_title || petition.petition_title,
      supporters: petition.displayed_signature_count,
      url: 'https://change.org/p/' + petition.id,
      image: petition.media.sizes.small.url || petition.photo.sizes.small.url
    };
    callback(null, petitionData);
  }
  request(options, finished);
};
