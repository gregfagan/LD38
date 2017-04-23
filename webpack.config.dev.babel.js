import config from './webpack.config.babel.js'
import path from 'path'

const nodeConfig = Object.assign(
  {},
  config,
  {
    entry: './src/node-runner.js',
    target: 'node',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'test.js'
    }
  })

export default nodeConfig
