const Handlebars = require('handlebars')

const flatten = str => str[0].replace(/\n/gm, '').replace(/\s{2,}/gm, ' ')

module.exports = function (source) {
  return Handlebars.compile(flatten(source))
}
