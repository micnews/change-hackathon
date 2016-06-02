'use strict';

var request = require('request');

module.exports = function (opts, callback) {
  var url = opts.url
    ? 'https://www.kickstarter.com/discover/advanced?format=json&term=' + opts.url.split('/').pop().split('?')[0]
    : 'https://www.kickstarter.com/discover/advanced';
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
    qOpts.term = opts.keyword;
    options.qs = qOpts;
    options.qs.format = 'json';
    options.qs.sort = 'popularity';
    options.qs.state = 'live';
  }
  function finished (err, response, body) {
    if (err) return callback(err);
    if (body.error) return callback(body.error);
    if (!body.projects || !body.items.projects) return callback('Nothing found');
    const fund = body.projects[0];
    const fundData = {
      platform: 'kickstarter',
      type: 'fund',
      name: fund.name,
      pledged: fund.pledged,
      url: 'https://www.kickstarter.com/projects/' + fund.id + '/' + fund.slug,
      image: fund.photo.full
    };
    callback(null, fundData);
  }
  request(options, finished);
};
