module.exports = (list, elem, options) =>
    (list.indexOf(elem) > -1 ? options.fn(this) : options.inverse(this))
