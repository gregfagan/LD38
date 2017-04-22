import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/LD38',
  },
  module: {
    rules: [
      {
        test: /.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react'],
          plugins: ['transform-object-rest-spread']
        },
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'LDJAM 38',
      template: 'template.ejs',
    })
  ],
}

if (process.env.NODE_ENV !== 'production') {
  config.devtool = 'source-map'
}

export default config;
