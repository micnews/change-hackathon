'use strict';

var request = require('request');

module.exports = function (opts, callback) {
  var url = opts.url ? 'https://www.change.org/api-proxy/-/petitions/' + opts.url.split('/').pop()
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
    let qOpts = {};
    qOpts.q = opts.keyword;
    options.qs = qOpts;
    options.qs.limit = 1;
  }
  function finished (err, response, body) {
    if (err) { return callback(err); }
    if (body.error) { return callback(body.error); }
    const petition = (opts.url
      ? body
      : body.items[0].petition);
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
