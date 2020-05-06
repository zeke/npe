module.exports = function (string) {
  if (string.match(',')) {
    return string.split(',').map(function (s) { return s.trim() }).sort()
  } else {
    return string.split(' ').map(function (s) { return s.trim() }).sort()
  }
}
