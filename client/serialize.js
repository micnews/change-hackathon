const serialize = (obj, prefix) => {
  var str = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      const k = prefix ? prefix + '[' + p + ']' : p;
      const v = obj[p];
      str.push(typeof v === 'object'
        ? serialize(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
    }
  }
  return str.join('&');
};

module.exports = serialize;
