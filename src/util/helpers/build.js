// A node script that runs the build process.
// Useful for attaching debuggers to when developing plugins.
const webpack = require('webpack')

require('babel-register')
const config = require('./webpack.config.babel.js').default

webpack(config, (err, stats) => {
  if (err) {
    console.error(err)
  } else if (stats.hasErrors()) {
    stats.compilation.errors.forEach(console.error)
  } else {
    console.log('built')
  }
})
