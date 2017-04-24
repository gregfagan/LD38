import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash].js',
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
      },
      {
        test: /.hbs$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'raw-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'LDJAM 38',
      template: 'template.ejs',
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module) {
           return module.context && module.context.indexOf('node_modules') !== -1;
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' })
  ],
  resolve: {
    extensions: ['.js'],
    alias: {
      '@util': `${__dirname}/src/util`,
      '@items': `${__dirname}/src/items`,
      '@actions': `${__dirname}/src/actions`,
      '@sectors': `${__dirname}/src/sectors`,
      '@describe': `${__dirname}/src/describe`,
      '@useables': `${__dirname}/src/useables`
    }
  }
}

if (process.env.NODE_ENV !== 'production') {
  config.devtool = 'source-map'
}

export default config
